import { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useAppStore } from '../lib/store'

export default function AdminSettingsPage() {
  const { settings, updateSettings } = useAppStore()
  const [form, setForm] = useState(settings)
  const [saved, setSaved] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    updateSettings(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar title="Settings" />
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-white mb-8">System Settings</h1>

            {saved && (
              <div className="mb-6 bg-green-900/20 border border-green-700 rounded-lg p-4 text-green-300">
                ✓ Settings updated successfully!
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-xl p-8 space-y-8">
              <div>
                <h3 className="text-lg font-bold text-white mb-6">Expense Limits</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Max Meals per Day (R)</label>
                    <input 
                      type="number"
                      value={form.maxMealsDay}
                      onChange={e => setForm({...form, maxMealsDay: parseFloat(e.target.value)})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-orange-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Travel Rate (R per km)</label>
                    <input 
                      type="number"
                      step="0.01"
                      value={form.travelRate}
                      onChange={e => setForm({...form, travelRate: parseFloat(e.target.value)})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-orange-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Max Accommodation per Night (R)</label>
                    <input 
                      type="number"
                      value={form.maxAccommodationNight}
                      onChange={e => setForm({...form, maxAccommodationNight: parseFloat(e.target.value)})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-orange-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-6">Leave Types</h3>
                <div className="space-y-2">
                  {form.leaveTypes.map((type, idx) => (
                    <div key={idx} className="bg-slate-800 rounded-lg px-4 py-2 text-slate-300">
                      • {type}
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition-all">
                Save Settings
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
