import { Link } from 'react-router-dom'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[{ title: 'Annual Leave', value: '15 days' }, { title: 'Sick Leave', value: '10 days' }, { title: 'Pending Claims', value: '2' }, { title: 'Pending Requests', value: '1' }].map((stat) => (
            <div key={stat.title} className="bg-slate-900 border border-slate-800 rounded-lg p-6">
              <p className="text-slate-400 text-sm mb-2">{stat.title}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
