import {
  Activity,
  HeartPulse,
  Thermometer,
  Navigation,
  ShieldAlert,
  Users,
  ShieldCheck,
  Zap,
  CheckCircle2,
  LineChart,
  MapPin,
  Beef,
  Bird,
  Dog,
  Shield,
  Stethoscope,
  TrendingUp,
  AlertTriangle,
  Eye,
  Map,
  Scale
} from 'lucide-react';
import React from 'react';

export default function LivestockContent() {
  const problems = [
    { title: 'Traffic Accidents', icon: AlertTriangle, description: 'Collisions caused by stray animals on major roads.' },
    { title: 'Loss & Theft', icon: ShieldAlert, description: 'Increased risk of animal theft and uncontrolled wandering.' },
    { title: 'Tracking Difficulty', icon: Map, description: 'Challenges in monitoring movement and behavior in open range.' },
    { title: 'Remote response', icon: Zap, description: 'Slow response times and weak intervention in far-off regions.' },
    { title: 'Lack of data', icon: Eye, description: 'Absence of accurate historical and real-time medical data.' },
  ];

  const capabilities = [
    { title: 'Real-time Tracking', icon: MapPin, description: 'Precise location monitoring for individual animals or herds.' },
    { title: 'Behavior Analysis', icon: Activity, description: 'Detailed insights into movement patterns and activity levels.' },
    { title: 'Vital Indicators', icon: HeartPulse, description: 'Monitoring pulse, temperature, respiration, and ECG.' },
    { title: 'Abnormal Alerts', icon: ShieldCheck, description: 'Immediate notifications for health issues or odd behavior.' },
    { title: 'Harsh Resistance', icon: Shield, description: 'Devices designed to withstand extreme weather and terrain.' },
    { title: 'Remote Coverage', icon: Zap, description: 'Wide-range connectivity solutions for deep rural areas.' },
  ];

  const socialCommercialValue = [
    { label: 'Reduce accidents', value: 'Saved Lives' },
    { label: 'Asset Protection', value: 'Secure Investment' },
    { label: 'Herd Management', value: 'Optimized Tracking' },
    { label: 'Remote Veterinary', value: 'Better Care' },
    { label: 'Decision Making', value: 'Data-Driven' },
    { label: 'Treatment Cost', value: 'Lower Expenses' },
  ];

  const sectors = [
    { name: 'Security Authorities', icon: Shield },
    { name: 'Livestock Departments', icon: Beef },
    { name: 'Environmental Authorities', icon: Bird },
    { name: 'Herd Owners', icon: Users },
    { name: 'Racing Clubs', icon: TrendingUp },
    { name: 'Wildlife Protection', icon: Dog },
  ];

  return (
    <div id="details" className="bg-gray-50 py-24 dark:bg-gray-800/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Efficiency Formula */}
        <div className="rounded-3xl bg-morpho p-8 text-center text-white shadow-xl sm:p-12 opacity-100 transition-all duration-700 ease-in-out starting:translate-y-4 starting:opacity-0">
          <h2 className="text-2xl font-bold sm:text-3xl">
            IoT + Smart Analytics + Real-time Tracking =
          </h2>
          <p className="mt-4 text-xl font-medium opacity-90 sm:text-2xl">
            Smarter Management and Safer Environments for Livestock
          </p>
        </div>

        {/* Overview Section */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Livestock Management Redefined
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Transforming traditional livestock management with high-tech sensors and cloud intelligence for maximum security and health.
          </p>
        </div>

        {/* The Problem Section */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">The Challenges</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {problems.map((prob, index) => (
              <div
                key={prob.title}
                className="relative rounded-2xl bg-white p-8 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 opacity-100 transition-all duration-700 ease-in-out starting:translate-y-4 starting:opacity-0"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100/50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                  <prob.icon className="h-6 w-6 text-morpho" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">{prob.title}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{prob.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* The Solution Section */}
        <div className="mt-24 rounded-3xl bg-white p-8 shadow-lg dark:bg-gray-900 sm:p-16 border border-gray-100 dark:border-gray-800">
          <div className="lg:flex lg:items-center lg:gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">The Morpho Solution</h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                A non-intrusive monitoring ecosystem using smart collars and vests combined with a powerful analytics platform.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  'Smart tracking collars & vests',
                  'Long-range battery life',
                  'Behavioral & health analysis platform',
                  'Real-time data sharing with vets'
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
                  src="/images/Livestock-1.png"
                  alt="Solution Devices"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-900/40 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Capabilities */}
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

        {/* Value Section */}
        <div className="mt-32 bg-gray-900 rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold sm:text-4xl text-center mb-16">Community & Commercial Value</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {socialCommercialValue.map((item) => (
                <div key={item.label} className="border-l-4 border-morpho bg-white/5 p-6 backdrop-blur-sm">
                  <p className="text-sm font-bold uppercase tracking-wider text-gray-400">{item.label}</p>
                  <p className="mt-1 text-2xl font-extrabold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute top-0 left-0 h-64 w-64 bg-orange-500/10 blur-[100px] rounded-full"></div>
        </div>

        {/* Application Sectors */}
        <div className="mt-32 pb-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">Target Sectors</h2>
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
