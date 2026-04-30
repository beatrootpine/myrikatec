import { Link } from 'react-router-dom'
import { useAuthStore } from '../lib/auth'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

export default function DashboardPage() {
  const { profile, role } = useAuthStore()

  if (role === 'admin') {
    return <div>Admin Dashboard - See /admin</div>
  }

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar title="My Rikatec" />
        <div className="flex-1 overflow-auto p-8">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-white mb-2">Welcome, {profile?.full_name}</h1>
            <p className="text-slate-400">{profile?.department} • {profile?.email}</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[
              { label: 'Annual Leave', value: '15 days', color: 'blue' },
              { label: 'Sick Leave', value: '10 days', color: 'green' },
              { label: 'Pending Requests', value: '0', color: 'orange' },
              { label: 'Approved This Year', value: '3', color: 'purple' }
            ].map(stat => (
              <div key={stat.label} className="bg-slate-900 border border-slate-800 rounded-lg p-6">
                <p className="text-slate-400 text-sm mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Request Leave', to: '/leave', icon: '📅' },
                { label: 'Submit Claim', to: '/claims', icon: '💰' },
                { label: 'Payment Request', to: '/payments', icon: '💳' },
                { label: 'IT Support', to: '/it-support', icon: '🔧' },
                { label: 'Edit Profile', to: '/profile', icon: '👤' },
              ].map(action => (
                <Link key={action.label} to={action.to} className="bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg p-6 text-center transition-all">
                  <div className="text-4xl mb-3">{action.icon}</div>
                  <p className="text-white font-semibold">{action.label}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
