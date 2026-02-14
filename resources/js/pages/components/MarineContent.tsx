import {
  Waves,
  Navigation,
  ShieldAlert,
  Zap,
  CheckCircle2,
  MapPin,
  Anchor,
  Activity,
  Shield,
  Search,
  Users,
  Eye,
  Microscope,
  Cpu,
  Globe,
  Battery,
  CloudLightning,
  Ship,
  Droplets,
  HardDrive
} from 'lucide-react';
import React from 'react';

export default function MarineContent() {
  const capabilities = [
    { title: 'Location Tracking', icon: MapPin, description: 'Continuous real-time GPS positioning via dedicated satellites.' },
    { title: 'Tilt & Movement', icon: Activity, description: 'Monitoring boat stability and directional movement triggers.' },
    { title: 'Emergency Alerts', icon: ShieldAlert, description: 'Instant distress signals for mechanical failure or accidents.' },
    { title: 'Tamper Resistance', icon: Shield, description: 'Smart license plates that cannot be removed or altered without detection.' },
    { title: 'Load Sensors', icon: HardDrive, description: 'Monitoring capacity and cargo shifts during maritime transit.' },
    { title: 'IP68+ Design', icon: Droplets, description: 'Fully waterproof and salt-resistant for the harshest marine environments.' },
  ];

  const strategicValues = [
    { label: 'Security', value: 'National Defense' },
    { label: 'Prevention', value: 'Illegal Activities' },
    { label: 'Search & Rescue', value: 'Fast Response' },
    { label: 'Protection', value: 'Fisherman Safety' },
    { label: 'Economy', value: 'Blue Growth' },
    { label: 'Sustainability', value: 'Marine Life' },
  ];

  const decisionSupport = [
    { title: 'Behavioral Charts', description: 'Detailed maritime charts based on historical movement patterns.' },
    { title: 'Fishing Regulation', description: 'Automated monitoring of restricted zones and season compliance.' },
    { title: 'Density Analysis', description: 'Real-time boat density identification for better harbor management.' },
    { title: 'Stock Preservation', description: 'Data-driven insights to protect fish stocks from overfishing.' },
  ];

  const sectors = [
    { name: 'Fisheries Dept', icon: Ship },
    { name: 'Security Authorities', icon: Shield },
    { name: 'Environmental Agencies', icon: Waves },
    { name: 'Coast Guard', icon: Anchor },
    { name: 'Research Centers', icon: Microscope },
    { name: 'Government Monitoring', icon: Eye },
  ];

  return (
    <div id="details" className="bg-gray-50 py-24 dark:bg-gray-800/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Efficiency Formula */}
        <div className="rounded-3xl bg-blue-900 p-8 text-center text-white shadow-xl sm:p-12 opacity-100 transition-all duration-700 ease-in-out starting:translate-y-4 starting:opacity-0">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Integrated IoT + Satellite + Smart Plate =
          </h2>
          <p className="mt-4 text-xl font-medium opacity-90 sm:text-2xl">
            A New Standard for National Maritime Sovereignty
          </p>
        </div>

        {/* Overview Section */}
        <div className="mt-32">
          <div className="lg:flex lg:items-center lg:gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">The Future of Marine Security</h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Self-operational, tamper-resistant, and satellite-connected. Our smart maritime license plates are a national pioneer in the region.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { label: 'Battery Life', value: '5-10 Years', icon: Battery },
                  { label: 'Connectivity', value: 'Sat-Connected', icon: Globe },
                  { label: 'Durability', value: 'IP68 Military', icon: Shield },
                  { label: 'Automation', value: 'Self-Operational', icon: Zap },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
                    <stat.icon className="h-5 w-5 text-morpho" />
                    <div>
                      <p className="text-xs text-gray-500">{stat.label}</p>
                      <p className="font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-blue-900/20 p-4">
                <img
                  src="/images/Marine-2.png"
                  alt="Marine Device Technology"
                  className="rounded-xl w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">System Capabilities</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap) => (
              <div key={cap.title} className="group p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-sm hover:shadow-md transition-shadow dark:border dark:border-gray-800">
                <cap.icon className="h-10 w-10 text-morpho mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold dark:text-white mb-2">{cap.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Decision Support */}
        <div className="mt-32 relative">
          <div className="absolute inset-0 bg-blue-600/5 -skew-y-3 rounded-[3rem]"></div>
          <div className="relative p-12 lg:p-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white italic">"Empowering Authorities through Real-time Insights"</h2>
            </div>
            <div className="grid gap-12 lg:grid-cols-2">
              {decisionSupport.map((item) => (
                <div key={item.title} className="flex gap-6">
                  <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-morpho text-white font-bold">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Strategic Value Section */}
        <div className="mt-32 bg-blue-950 rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold sm:text-4xl text-center mb-16">Strategic National Value</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {strategicValues.map((item) => (
                <div key={item.label} className="border-l-4 border-morpho bg-white/5 p-6 backdrop-blur-sm">
                  <p className="text-sm font-bold uppercase tracking-wider text-blue-400">{item.label}</p>
                  <p className="mt-1 text-2xl font-extrabold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute top-0 right-0 h-96 w-96 bg-blue-500/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 h-64 w-64 bg-morpho/5 blur-[100px] rounded-full"></div>
        </div>

        {/* Application Sectors */}
        <div className="mt-32 pb-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">Target Sectors</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {sectors.map((sector) => (
              <div key={sector.name} className="flex items-center gap-3 px-6 py-4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 font-bold text-gray-700 dark:text-gray-300 transition-all hover:border-morpho">
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
