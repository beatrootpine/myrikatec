import { LogOut } from 'lucide-react'
import { useAuthStore } from '../lib/auth'

export default function Navbar({ title }) {
  const { signOut } = useAuthStore()

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3 md:space-x-4">
            <img src="/rikatec-logo.png" alt="Rikatec" className="h-8 md:h-10" />
            <h1 className="text-lg md:text-xl font-bold text-white truncate">{title}</h1>
          </div>
          <button onClick={signOut} className="text-slate-400 hover:text-white flex items-center space-x-2">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  )
}
