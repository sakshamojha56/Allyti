const stats = [
  { id: 1, name: 'IIT/IIM Students & Alumni', value: '50,000+' },
  { id: 2, name: 'Professional Connections Made', value: '120,000+' },
  { id: 3, name: 'Anonymous Posts Shared', value: '800,000+' },
  { id: 4, name: 'Career Opportunities Posted', value: '15,000+' },
];

export function StatsSection() {
  return (
    <div className="bg-white pt-12 sm:pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Trusted by the IIT/IIM community
          </h2>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            Building the largest verified network of India's premier institute graduates.
          </p>
        </div>
      </div>
      <div className="mt-10 pb-12 bg-white sm:pb-16">
        <div className="relative">
          <div className="absolute inset-0 h-1/2 bg-gray-50"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.id} className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                      {stat.name}
                    </dt>
                    <dd className="order-1 text-5xl font-extrabold text-blue-600">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
