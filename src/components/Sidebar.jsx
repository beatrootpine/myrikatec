import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../lib/auth'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Sidebar() {
  const { role } = useAuthStore()
  const location = useLocation()
  const [open, setOpen] = useState(false)

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
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 bg-slate-900 border-r border-slate-800 p-6 space-y-2 flex-col">
        {links.map(link => (
          <Link key={link.path} to={link.path} className={`block px-4 py-2 rounded-lg transition-all ${isActive(link.path)}`}>
            {link.label}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button 
        onClick={() => setOpen(!open)}
        className="md:hidden fixed bottom-6 right-6 z-50 bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-full shadow-lg"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Sidebar Overlay */}
      {open && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setOpen(false)} />
      )}

      {/* Mobile Sidebar */}
      <div className={`md:hidden fixed left-0 top-0 h-full w-64 bg-slate-900 border-r border-slate-800 p-6 space-y-2 flex flex-col z-40 transform transition-transform ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-6">
          <img src="/rikatec-logo.png" alt="Rikatec" className="h-8" />
        </div>
        {links.map(link => (
          <Link 
            key={link.path} 
            to={link.path} 
            onClick={() => setOpen(false)}
            className={`block px-4 py-2 rounded-lg transition-all ${isActive(link.path)}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  )
}
