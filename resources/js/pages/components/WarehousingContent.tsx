import {
  Warehouse,
  Truck,
  Thermometer,
  Bell,
  Eye,
  BarChart3,
  CheckCircle2,
  ShieldCheck,
  Expand,
  Zap,
  Cpu,
  LineChart,
  ClipboardCheck,
  Users,
  Building2,
  Package,
  Clock,
  Settings2,
  BarChart,
  ShieldAlert
} from 'lucide-react';
import React from 'react';

export default function WarehousingContent() {
  const whyMorpho = [
    { title: 'Reduce waste', icon: Zap, description: 'Minimizing product damage and expiration through precise environment control.' },
    { title: 'Early Detection', icon: ShieldAlert, description: 'Spotting storage issues and equipment failures before they become critical.' },
    { title: 'Operational Efficiency', icon: Settings2, description: 'Streamlining flows and reducing manual data entry for faster dispatch.' },
    { title: 'Quality Compliance', icon: ClipboardCheck, description: 'Automated logging to meet strict national and international standards.' },
    { title: 'Scalable Design', icon: Expand, description: 'Easily extendable monitoring from single rooms to national networks.' },
  ];

  const offerings = [
    { title: 'Temp & Humidity', icon: Thermometer, description: 'High-precision monitoring for sensitive goods and cold storage.' },
    { title: 'Instant Alerts', icon: Bell, description: 'Immediate notifications via SMS, email, or app for any violations.' },
    { title: 'Inventory Visibility', icon: Package, description: 'Real-time tracking of stock levels and storage conditions.' },
    { title: 'Decision Support', icon: BarChart, description: 'In-depth reports that transform raw data into actionable insights.' },
    { title: 'Seamless Integration', icon: Cpu, description: 'Plug-and-play compatibility with your existing WMS or ERP systems.' },
  ];

  const workflow = [
    { step: '1', title: 'Deploy Sensors', description: 'Smart IoT sensors are placed throughout the facility.' },
    { step: '2', title: 'Data Transmission', description: 'Real-time data is sent securely to the Morpho platform.' },
    { step: '3', title: 'Smart Analysis', description: 'AI algorithms analyze environment and stock status.' },
    { step: '4', title: '24/7 Monitoring', description: 'Autonomous operation with no manual intervention needed.' },
  ];

  const sectors = [
    { name: 'Cold Warehousing', icon: Warehouse },
    { name: 'Logistics Providers', icon: Truck },
    { name: 'Food Supply Chain', icon: Package },
    { name: 'Pharmaceutical Depts', icon: ClipboardCheck },
    { name: 'Large Enterprise', icon: Building2 },
    { name: 'Government Stores', icon: ShieldCheck },
  ];

  return (
    <div id="details" className="bg-gray-50 py-24 dark:bg-gray-800/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Why Morpho Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">Why Choose Morpho?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Optimizing storage environments and supply chain resilience with data-driven expertise.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {whyMorpho.map((item, index) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white p-6 shadow-md transition-all hover:shadow-lg dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <item.icon className="h-5 w-5 text-morpho" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white leading-tight">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Offerings Grid */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">What We Offer</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {offerings.map((off) => (
              <div key={off.title} className="group p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-sm hover:shadow-md transition-shadow dark:border dark:border-gray-800 flex gap-6">
                <div className="flex-shrink-0">
                  <off.icon className="h-10 w-10 text-morpho group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h3 className="text-xl font-bold dark:text-white mb-2">{off.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{off.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy & Security Section */}
        <div className="mt-32 rounded-3xl bg-white p-8 shadow-lg dark:bg-gray-900 sm:p-16 border border-gray-100 dark:border-gray-800">
          <div className="lg:flex lg:items-center lg:gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Privacy & Security as a Core</h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Designed for government entities and large corporations that demand total data sovereignty and regulatory compliance.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  'Full control and ownership of your data',
                  'Strict adherence to national regulatory standards',
                  'On-premise deployment options for high security',
                  'Suitable for critical national supply chains'
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-morpho" />
                    <span className="text-lg font-medium text-gray-900 dark:text-gray-100">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-12 lg:mt-0 lg:w-1/2">
              <div className="relative rounded-2xl p-8 bg-blue-50 dark:bg-blue-900/10 border-2 border-dashed border-blue-200 dark:border-blue-800">
                <ShieldCheck className="h-32 w-32 text-blue-500/20 absolute -right-4 -bottom-4" />
                <div className="relative z-10 text-center py-12">
                  <LockIcon className="h-16 w-16 text-morpho mx-auto mb-6" />
                  <h4 className="text-2xl font-bold dark:text-white">Sovereign Architecture</h4>
                  <p className="mt-2 text-gray-500">Built for National Scale</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">How It Works</h2>
          </div>
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-800 hidden lg:block -translate-y-1/2"></div>

            <div className="grid gap-12 lg:grid-cols-4 relative">
              {workflow.map((item) => (
                <div key={item.step} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm text-center relative">
                  <div className="h-10 w-10 bg-morpho text-white rounded-full flex items-center justify-center font-bold mx-auto mb-6 ring-8 ring-gray-50 dark:ring-gray-800/50">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Target Sectors */}
        <div className="mt-32 pb-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">Target Sectors</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {sectors.map((sector) => (
              <div key={sector.name} className="flex flex-col items-center gap-4 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-all hover:border-morpho">
                <sector.icon className="h-8 w-8 text-morpho" />
                <span className="text-center font-bold text-sm text-gray-700 dark:text-gray-300">{sector.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}
