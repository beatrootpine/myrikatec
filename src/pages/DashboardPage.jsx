import { Link } from 'react-router-dom'
import { useAuthStore } from '../lib/auth'
import { LogOut } from 'lucide-react'

export default function DashboardPage() {
  const { profile, signOut } = useAuthStore()

  return (
    <div className="min-h-screen bg-slate-950">
      <nav className="bg-slate-900 border-b border-slate-800 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <img src="/rikatec-logo.png" alt="Rikatec" className="h-10" />
          <button onClick={signOut} className="flex items-center space-x-2 text-slate-400 hover:text-white">
            <LogOut size={20} /><span>Sign out</span>
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-2">Welcome, {profile?.full_name || 'User'}</h2>
          <p className="text-slate-400">{profile?.department || 'Employee'}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[{ label: 'Annual Leave', val: '15 days' }, { label: 'Sick Leave', val: '10 days' }, { label: 'Pending Claims', val: '0' }, { label: 'Pending Requests', val: '0' }].map(s => (
            <div key={s.label} className="bg-slate-900 border border-slate-800 rounded-lg p-6">
              <p className="text-slate-400 text-sm mb-2">{s.label}</p>
              <p className="text-3xl font-bold text-orange-600">{s.val}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[{ label: 'Request Leave', to: '/leave' }, { label: 'Submit Claim', to: '/claims' }, { label: 'IT Support', to: '/it-support' }, { label: 'Payment Request', to: '/payments' }, { label: 'My Approvals', to: '/approvals' }, { label: 'Finance', to: '/finance' }].map(btn => (
            <Link key={btn.label} to={btn.to} className="bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-lg text-center font-semibold transition-all">
              {btn.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
