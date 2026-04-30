import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../lib/auth'

export default function Sidebar() {
  const { role } = useAuthStore()
  const location = useLocation()

  const isActive = (path) => location.pathname === path ? 'bg-orange-600 text-white' : 'text-slate-400 hover:text-white'

  const employeeLinks = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'My Profile', path: '/profile' },
    { label: 'Request Leave', path: '/leave' },
    { label: 'Submit Claim', path: '/claims' },
    { label: 'Payment Request', path: '/payments' },
    { label: 'IT Support', path: '/it-support' },
  ]

  const adminLinks = [
    { label: 'Dashboard', path: '/admin' },
    { label: 'Employees', path: '/admin/employees' },
    { label: 'Leave Requests', path: '/admin/leave' },
    { label: 'Claims', path: '/admin/claims' },
    { label: 'Payments', path: '/admin/payments' },
    { label: 'IT Support', path: '/admin/it' },
    { label: 'Settings', path: '/admin/settings' },
  ]

  const links = role === 'admin' ? adminLinks : employeeLinks

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 p-6 space-y-2">
      {links.map(link => (
        <Link key={link.path} to={link.path} className={`block px-4 py-2 rounded-lg transition-all ${isActive(link.path)}`}>
          {link.label}
        </Link>
      ))}
    </div>
  )
}
