import {
  CloudIcon,
  Droplets,
  Lightbulb,
  LineChart,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  Zap
} from 'lucide-react';
import React from 'react';

export default function AgricultureContent() {
  const challenges = [
    { title: 'Water waste', icon: Droplets, description: 'Inefficient irrigation leading to significant water loss.' },
    { title: 'Undetected disease spread', icon: ShieldCheck, description: 'Slow response to crop diseases due to lack of early detection.' },
    { title: 'Low productivity', icon: TrendingUp, description: 'Suboptimal yields caused by traditional farming methods.' },
    { title: 'Inaccurate decisions', icon: Lightbulb, description: 'Agricultural choices made without real-time data support.' },
    { title: 'Lack of soil & climate data', icon: CloudIcon, description: 'Missing critical info on soil health and local weather patterns.' },
  ];

  const values = [
    { label: 'Reduce water waste', value: 'up to 30%' },
    { label: 'Early warning', value: 'Cost Reduction' },
    { label: 'Food safety', value: 'Full Compliance' },
    { label: 'Quality data', value: 'Farmer & Govt' },
    { label: 'Monitoring', value: '24/7 Access' },
    { label: 'Productivity', value: 'Data-Driven' },
  ];

  return (
    <div id="details" className="bg-gray-50 py-24 dark:bg-gray-800/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Efficiency Formula */}
        <div className="rounded-3xl bg-morpho p-8 text-center text-white shadow-xl sm:p-12">
          <h2 className="text-2xl font-bold sm:text-3xl">
            IoT + Satellites + Advanced Analytics =
          </h2>
          <p className="mt-4 text-xl font-medium opacity-90 sm:text-2xl">
            More accurate – Smarter – More productive – Lower cost farming
          </p>
        </div>

        {/* Challenges Section */}
        <div className="mt-24">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              The Challenges We Solve
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              Traditional farming faces mounting pressures. Our technology bridge the gap.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {challenges.map((challenge) => (
              <div key={challenge.title} className="relative rounded-2xl bg-white p-8 shadow-md transition-transform hover:-translate-y-1 dark:bg-gray-900">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                  <challenge.icon className="h-6 f-6" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">{challenge.title}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{challenge.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Solution Section */}
        <div className="mt-24 rounded-3xl bg-white p-8 shadow-lg dark:bg-gray-900 sm:p-16">
          <div className="lg:flex lg:items-center lg:gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Our Solution</h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                A sensor network and analytics platform providing full visibility into your farm's ecosystem:
              </p>
              <ul className="mt-8 space-y-4">
                {['Soil health', 'Crop conditions', 'Agricultural environment'].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-morpho"></div>
                    <span className="text-lg font-medium text-gray-900 dark:text-gray-100">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-12 lg:mt-0 lg:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-gray-50 p-6 dark:bg-gray-800">
                  <Smartphone className="h-8 w-8 text-morpho" />
                  <p className="mt-2 font-semibold dark:text-gray-200">Mobile Apps</p>
                </div>
                <div className="rounded-2xl bg-gray-50 p-6 dark:bg-gray-800">
                  <LineChart className="h-8 w-8 text-morpho" />
                  <p className="mt-2 font-semibold dark:text-gray-200">Real-time Analytics</p>
                </div>
                <div className="col-span-2 rounded-2xl bg-gray-50 p-6 dark:bg-gray-800">
                  <Zap className="h-8 w-8 text-morpho" />
                  <p className="mt-2 font-semibold dark:text-gray-200">Automated Insights</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Value Section */}
        <div className="mt-24">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">The Value we Deliver</h2>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((item) => (
              <div key={item.label} className="border-l-4 border-morpho bg-white p-6 shadow-sm dark:bg-gray-900">
                <p className="text-sm font-bold uppercase tracking-wider text-gray-500">{item.label}</p>
                <p className="mt-1 text-2xl font-extrabold text-morpho">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
