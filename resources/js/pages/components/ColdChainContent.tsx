import {
  Thermometer,
  Droplets,
  AlertTriangle,
  Clock,
  Eye,
  MapPin,
  Search,
  ShieldCheck,
  Zap,
  CheckCircle2,
  TrendingDown,
  LineChart,
  UserCheck,
  ShieldAlert,
  Ship,
  Truck,
  Building2,
  HardHat,
  Stethoscope,
  Factory
} from 'lucide-react';
import React from 'react';

export default function ColdChainContent() {
  const challenges = [
    { title: 'Product spoilage', icon: ShieldAlert, description: 'Loss of quality and safety during transport.' },
    { title: 'Temperature fluctuations', icon: Thermometer, description: 'Changes affecting high-value shipment integrity.' },
    { title: 'No early warning', icon: AlertTriangle, description: 'Reliance on post-incident inspection instead of prevention.' },
    { title: 'Compliance difficulty', icon: ShieldCheck, description: 'Hard to prove regulatory and safety standards.' },
    { title: 'Low transparency', icon: Eye, description: 'Limited visibility into real-time operational status.' },
    { title: 'Lack of tracking', icon: MapPin, description: 'Inability to determine exact causes of spoilage in transit.' },
  ];

  const coreCapabilities = [
    { title: 'Temperature & Humidity', icon: Thermometer, description: 'High-precision environmental monitoring.' },
    { title: 'Pressure & Sensors', icon: Droplets, description: 'Humidity and pressure tracking for sensitive cargo.' },
    { title: 'Asset Security', icon: Zap, description: 'Shock, vibration, and door opening detection.' },
    { title: 'Global Positioning', icon: MapPin, description: 'Real-time GPS tracking across the supply chain.' },
    { title: 'Instant Alerts', icon: ShieldAlert, description: 'Immediate notifications for any threshold violations.' },
    { title: 'Digital Reports', icon: LineChart, description: 'Legally compliant automated regulatory reporting.' },
  ];

  const businessValues = [
    { label: 'Reduce waste', value: 'Less Spoilage' },
    { label: 'Operational cost', value: 'Lower Expenses' },
    { label: 'Compliance', value: 'Full Accountability' },
    { label: 'Insurance claims', value: 'Significant Reduction' },
    { label: 'Customer Trust', value: 'Improved Loyalty' },
    { label: 'Reputation', value: 'Brand Protection' },
  ];

  const sectors = [
    { name: 'Food & Seafood', icon: Ship },
    { name: 'Pharmaceuticals', icon: Stethoscope },
    { name: 'Cold Chain Logistics', icon: Truck },
    { name: 'Insurance Companies', icon: Building2 },
    { name: 'Oil & Gas (Sensitive)', icon: Factory },
    { name: 'Government Entities', icon: HardHat },
  ];

  return (
    <div id="details" className="bg-gray-50 py-24 dark:bg-gray-800/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Efficiency Formula */}
        <div className="rounded-3xl bg-morpho p-8 text-center text-white shadow-xl sm:p-12 opacity-100 transition-all duration-700 ease-in-out starting:translate-y-4 starting:opacity-0">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Real-time Visibility + IoT + Satellites =
          </h2>
          <p className="mt-4 text-xl font-medium opacity-90 sm:text-2xl">
            Protecting High-Value Shipments from Dispatch to Delivery
          </p>
        </div>

        {/* Overview Section */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            The Challenge in Transit
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            One of the biggest supply chain challenges is the lack of real-time data during transit and reliance on post-incident inspection.
          </p>
        </div>

        {/* Challenges Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {challenges.map((challenge, index) => (
            <div
              key={challenge.title}
              className="relative rounded-2xl bg-white p-8 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 opacity-100 transition-all duration-700 ease-in-out starting:translate-y-4 starting:opacity-0"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100/50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <challenge.icon className="h-6 w-6 text-morpho" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">{challenge.title}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">{challenge.description}</p>
            </div>
          ))}
        </div>

        {/* The Solution Section */}
        <div className="mt-24 rounded-3xl bg-white p-8 shadow-lg dark:bg-gray-900 sm:p-16 border border-gray-100 dark:border-gray-800">
          <div className="lg:flex lg:items-center lg:gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">The Morpho Solution</h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                A smart satellite-connected IoT device that collects environmental data in real time,
                sends it to the Morpho cloud platform, and enables immediate intervention.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  'Immediate intervention during transit',
                  'Cloud-based real-time analysis',
                  'Threshold violation prevention',
                  'End-to-end full visibility'
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-morpho" />
                    <span className="text-lg font-medium text-gray-900 dark:text-gray-100">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-12 lg:mt-0 lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/products.png"
                  alt="Solution in Action"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Capabilities */}
        <div className="mt-32">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">Core Capabilities</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Advanced IoT sensors designed for the most demanding environments.</p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {coreCapabilities.map((cap) => (
              <div key={cap.title} className="group p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-sm hover:shadow-md transition-shadow dark:border dark:border-gray-800">
                <cap.icon className="h-10 w-10 text-morpho mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold dark:text-white mb-2">{cap.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Value Section */}
        <div className="mt-32 bg-gray-900 rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold sm:text-4xl text-center mb-16">Business Value</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {businessValues.map((item) => (
                <div key={item.label} className="border-l-4 border-morpho bg-white/5 p-6 backdrop-blur-sm">
                  <p className="text-sm font-bold uppercase tracking-wider text-gray-400">{item.label}</p>
                  <p className="mt-1 text-2xl font-extrabold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute top-0 right-0 h-64 w-64 bg-morpho blur-[100px] rounded-full"></div>
        </div>

        {/* Application Sectors */}
        <div className="mt-32 pb-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">Application Sectors</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {sectors.map((sector) => (
              <div key={sector.name} className="flex items-center gap-3 px-6 py-4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 font-bold text-gray-700 dark:text-gray-300">
                <sector.icon className="h-5 w-5 text-morpho" />
                {sector.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
