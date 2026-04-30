import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../lib/auth'

export default function LoginPage() {
  const navigate = useNavigate()
  const { demoSignIn } = useAuthStore()

  const handleDemoSignIn = () => {
    demoSignIn()
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-white mb-2">Rikatec</h1>
            <p className="text-slate-400 text-lg">HR Management Portal</p>
          </div>
          <button onClick={handleDemoSignIn} className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition-all">
            Demo Sign In
          </button>
          <p className="text-center text-slate-500 text-sm mt-6">Click to enter demo mode</p>
        </div>
      </div>
    </div>
  )
}
