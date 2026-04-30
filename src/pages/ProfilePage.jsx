import { useState } from 'react'
import { useAuthStore } from '../lib/auth'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

export default function ProfilePage() {
  const { profile } = useAuthStore()
  const [form, setForm] = useState({
    full_name: profile?.full_name || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    department: profile?.department || '',
  })
  const [saved, setSaved] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar title="My Profile" />
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-2xl">
            {saved && (
              <div className="mb-6 bg-green-900/20 border border-green-700 rounded-lg p-4 text-green-300">
                ✓ Profile updated successfully!
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-xl p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">Full Name</label>
                <input 
                  type="text"
                  value={form.full_name}
                  onChange={e => setForm({...form, full_name: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-orange-600 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">Email</label>
                <input 
                  type="email"
                  value={form.email}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-400 cursor-not-allowed"
                  disabled
                />
                <p className="text-xs text-slate-500 mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">Phone</label>
                <input 
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm({...form, phone: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-orange-600 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">Department</label>
                <input 
                  type="text"
                  value={form.department}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-400 cursor-not-allowed"
                  disabled
                />
                <p className="text-xs text-slate-500 mt-1">Contact HR to change department</p>
              </div>

              <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition-all">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
