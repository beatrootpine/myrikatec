import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../lib/auth'

export default function LoginPage() {
  const navigate = useNavigate()
  const { demoSignInEmployee, demoSignInAdmin } = useAuthStore()

  const handleEmployeeSignIn = () => {
    demoSignInEmployee()
    navigate('/dashboard')
  }

  const handleAdminSignIn = () => {
    demoSignInAdmin()
    navigate('/admin')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <img src="/rikatec-logo.png" alt="Rikatec" className="h-24 mx-auto mb-6" />
            <p className="text-slate-400 text-lg">HR Management Portal</p>
          </div>

          <div className="space-y-3">
            <button onClick={handleEmployeeSignIn} className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition-all">
              Demo: Employee Login
            </button>
            <button onClick={handleAdminSignIn} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all">
              Demo: Admin Login
            </button>
          </div>
          <p className="text-center text-slate-500 text-sm mt-6">Select a role to continue</p>
        </div>
      </div>
    </div>
  )
}
