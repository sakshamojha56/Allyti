const features = [
  {
    title: 'Professional Networking',
    description: 'Connect with verified IIT/IIM alumni for career opportunities, mentorship, and professional growth.',
    icon: '🤝',
  },
  {
    title: 'Anonymous Community',
    description: 'Engage in honest discussions about career, life, and experiences without revealing your identity.',
    icon: '🎭',
  },
  {
    title: 'Zero-Knowledge Privacy',
    description: 'Your professional and anonymous identities are completely separate with end-to-end encryption.',
    icon: '🔒',
  },
  {
    title: 'Verified Members Only',
    description: 'All members are verified IIT/IIM students and alumni through institutional email verification.',
    icon: '✅',
  },
  {
    title: 'Career Opportunities',
    description: 'Access exclusive job postings, internships, and opportunities shared by the community.',
    icon: '💼',
  },
  {
    title: 'Real-time Messaging',
    description: 'Connect instantly with peers through secure messaging and group conversations.',
    icon: '💬',
  },
];

export function FeaturesSection() {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A better way to connect
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Combining the best of professional networking and anonymous community engagement 
            for IIT/IIM students and alumni.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white text-2xl">
                    {feature.icon}
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.title}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
