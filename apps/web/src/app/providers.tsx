'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from '@/lib/auth/AuthProvider';
import { ThemeProvider } from '@/lib/theme/ThemeProvider';
import { apolloClient } from '@/lib/apollo/client';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            retry: (failureCount, error) => {
              // Don't retry on 4xx errors
              if (error && typeof error === 'object' && 'status' in error) {
                const status = error.status as number;
                if (status >= 400 && status < 500) return false;
              }
              return failureCount < 3;
            },
          },
          mutations: {
            retry: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </ApolloProvider>
    </QueryClientProvider>
  );
}
