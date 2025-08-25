#!/bin/bash

# Database Setup Script for Allyti Platform
# This script sets up PostgreSQL and MongoDB databases with seed data

set -e

echo "🚀 Starting Allyti Database Setup..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required environment variables are set
check_env_vars() {
    print_status "Checking environment variables..."
    
    required_vars=(
        "POSTGRES_HOST"
        "POSTGRES_PORT" 
        "POSTGRES_DB"
        "POSTGRES_USER"
        "POSTGRES_PASSWORD"
        "MONGODB_URI"
        "MONGODB_DB_PROFESSIONAL"
        "MONGODB_DB_ANONYMOUS"
    )
    
    missing_vars=()
    
    for var in "${required_vars[@]}"; do
        if [[ -z "${!var}" ]]; then
            missing_vars+=("$var")
        fi
    done
    
    if [[ ${#missing_vars[@]} -gt 0 ]]; then
        print_error "Missing required environment variables:"
        for var in "${missing_vars[@]}"; do
            echo "  - $var"
        done
        echo ""
        echo "Please set these variables in your .env file or environment"
        exit 1
    fi
    
    print_success "All required environment variables are set"
}

# Wait for PostgreSQL to be ready
wait_for_postgres() {
    print_status "Waiting for PostgreSQL to be ready..."
    
    max_attempts=30
    attempt=1
    
    while [[ $attempt -le $max_attempts ]]; do
        if pg_isready -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -U "$POSTGRES_USER" > /dev/null 2>&1; then
            print_success "PostgreSQL is ready"
            return 0
        fi
        
        print_status "Attempt $attempt/$max_attempts: PostgreSQL not ready, waiting 2 seconds..."
        sleep 2
        ((attempt++))
    done
    
    print_error "PostgreSQL failed to become ready after $max_attempts attempts"
    exit 1
}

# Wait for MongoDB to be ready
wait_for_mongodb() {
    print_status "Waiting for MongoDB to be ready..."
    
    max_attempts=30
    attempt=1
    
    while [[ $attempt -le $max_attempts ]]; do
        if mongosh "$MONGODB_URI" --eval "db.adminCommand('ping')" > /dev/null 2>&1; then
            print_success "MongoDB is ready"
            return 0
        fi
        
        print_status "Attempt $attempt/$max_attempts: MongoDB not ready, waiting 2 seconds..."
        sleep 2
        ((attempt++))
    done
    
    print_error "MongoDB failed to become ready after $max_attempts attempts"
    exit 1
}

# Create PostgreSQL database if it doesn't exist
create_postgres_db() {
    print_status "Creating PostgreSQL database if it doesn't exist..."
    
    # Check if database exists
    DB_EXISTS=$(PGPASSWORD="$POSTGRES_PASSWORD" psql -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -U "$POSTGRES_USER" -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname='$POSTGRES_DB'")
    
    if [[ "$DB_EXISTS" != "1" ]]; then
        print_status "Creating database '$POSTGRES_DB'..."
        PGPASSWORD="$POSTGRES_PASSWORD" psql -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -U "$POSTGRES_USER" -d postgres -c "CREATE DATABASE \"$POSTGRES_DB\";"
        print_success "Database '$POSTGRES_DB' created"
    else
        print_success "Database '$POSTGRES_DB' already exists"
    fi
}

# Run PostgreSQL migrations
run_postgres_migrations() {
    print_status "Running PostgreSQL migrations..."
    
    migrations_dir="$(dirname "$0")/migrations"
    
    if [[ ! -d "$migrations_dir" ]]; then
        print_error "Migrations directory not found: $migrations_dir"
        exit 1
    fi
    
    # Create migrations table if it doesn't exist
    PGPASSWORD="$POSTGRES_PASSWORD" psql -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "
        CREATE TABLE IF NOT EXISTS schema_migrations (
            version VARCHAR(255) PRIMARY KEY,
            applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    "
    
    # Run each migration file in order
    for migration_file in "$migrations_dir"/*.sql; do
        if [[ -f "$migration_file" ]]; then
            migration_name=$(basename "$migration_file" .sql)
            
            # Check if migration has already been applied
            APPLIED=$(PGPASSWORD="$POSTGRES_PASSWORD" psql -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -tAc "SELECT 1 FROM schema_migrations WHERE version='$migration_name'")
            
            if [[ "$APPLIED" != "1" ]]; then
                print_status "Applying migration: $migration_name"
                
                if PGPASSWORD="$POSTGRES_PASSWORD" psql -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -f "$migration_file"; then
                    # Mark migration as applied
                    PGPASSWORD="$POSTGRES_PASSWORD" psql -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "INSERT INTO schema_migrations (version) VALUES ('$migration_name');"
                    print_success "Migration '$migration_name' applied successfully"
                else
                    print_error "Migration '$migration_name' failed"
                    exit 1
                fi
            else
                print_status "Migration '$migration_name' already applied, skipping"
            fi
        fi
    done
    
    print_success "All PostgreSQL migrations completed"
}

# Setup MongoDB collections and indexes
setup_mongodb() {
    print_status "Setting up MongoDB collections and indexes..."
    
    schema_file="$(dirname "$0")/mongodb/schema.js"
    
    if [[ ! -f "$schema_file" ]]; then
        print_error "MongoDB schema file not found: $schema_file"
        exit 1
    fi
    
    print_status "Applying MongoDB schema..."
    if mongosh "$MONGODB_URI" "$schema_file"; then
        print_success "MongoDB schema applied successfully"
    else
        print_error "Failed to apply MongoDB schema"
        exit 1
    fi
}

# Load seed data
load_seed_data() {
    if [[ "${SKIP_SEED_DATA:-false}" == "true" ]]; then
        print_warning "Skipping seed data (SKIP_SEED_DATA=true)"
        return 0
    fi
    
    print_status "Loading seed data..."
    
    # Load PostgreSQL seed data
    postgres_seed_file="$(dirname "$0")/seeds/001_development_data.sql"
    if [[ -f "$postgres_seed_file" ]]; then
        print_status "Loading PostgreSQL seed data..."
        if PGPASSWORD="$POSTGRES_PASSWORD" psql -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -f "$postgres_seed_file"; then
            print_success "PostgreSQL seed data loaded successfully"
        else
            print_warning "Failed to load PostgreSQL seed data (this is non-critical)"
        fi
    else
        print_warning "PostgreSQL seed data file not found: $postgres_seed_file"
    fi
    
    # Load MongoDB seed data
    mongodb_seed_file="$(dirname "$0")/seeds/mongodb_seed.js"
    if [[ -f "$mongodb_seed_file" ]]; then
        print_status "Loading MongoDB seed data..."
        if mongosh "$MONGODB_URI" "$mongodb_seed_file"; then
            print_success "MongoDB seed data loaded successfully"
        else
            print_warning "Failed to load MongoDB seed data (this is non-critical)"
        fi
    else
        print_warning "MongoDB seed data file not found: $mongodb_seed_file"
    fi
}

# Verify database setup
verify_setup() {
    print_status "Verifying database setup..."
    
    # Verify PostgreSQL
    TABLE_COUNT=$(PGPASSWORD="$POSTGRES_PASSWORD" psql -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -tAc "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';")
    print_status "PostgreSQL: Found $TABLE_COUNT tables"
    
    # Verify MongoDB
    print_status "Verifying MongoDB collections..."
    mongosh "$MONGODB_URI" --eval "
        db = db.getSiblingDB('$MONGODB_DB_ANONYMOUS');
        const collections = db.getCollectionNames();
        print('MongoDB Anonymous DB: Found ' + collections.length + ' collections');
        collections.forEach(col => print('  - ' + col));
    "
    
    print_success "Database setup verification completed"
}

# Main execution
main() {
    echo "🗄️  Allyti Database Setup"
    echo "========================="
    echo ""
    
    check_env_vars
    echo ""
    
    wait_for_postgres
    wait_for_mongodb
    echo ""
    
    create_postgres_db
    echo ""
    
    run_postgres_migrations
    echo ""
    
    setup_mongodb
    echo ""
    
    load_seed_data
    echo ""
    
    verify_setup
    echo ""
    
    print_success "🎉 Database setup completed successfully!"
    echo ""
    echo "Next steps:"
    echo "1. Start the API server: npm run dev:api"
    echo "2. Start the web application: npm run dev:web"
    echo "3. Access the application at http://localhost:3000"
}

# Run main function
main "$@"
