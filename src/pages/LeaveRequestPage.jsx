import { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useAuthStore } from '../lib/auth'
import { useAppStore } from '../lib/store'

export default function LeaveRequestPage() {
  const { profile } = useAuthStore()
  const { addLeaveRequest, settings } = useAppStore()
  const [form, setForm] = useState({ type: 'annual', start: '', end: '', reason: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const days = Math.ceil((new Date(form.end) - new Date(form.start)) / (1000*60*60*24)) + 1
    
    addLeaveRequest({
      employeeId: 1, // Demo user
      type: form.type,
      days: days,
      startDate: form.start,
      endDate: form.end,
      reason: form.reason,
      status: 'pending'
    })

    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setForm({ type: 'annual', start: '', end: '', reason: '' })
    }, 2000)
  }

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar title="Request Leave" />
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-2xl">
            {submitted && (
              <div className="mb-6 bg-green-900/20 border border-green-700 rounded-lg p-4 text-green-300">
                ✓ Leave request submitted! Pending approval.
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-xl p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">Leave Type</label>
                <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-orange-600 focus:outline-none">
                  {settings.leaveTypes.map(type => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">Start Date</label>
                  <input required type="date" value={form.start} onChange={e => setForm({...form, start: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-orange-600 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">End Date</label>
                  <input required type="date" value={form.end} onChange={e => setForm({...form, end: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-orange-600 focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">Reason</label>
                <textarea required value={form.reason} onChange={e => setForm({...form, reason: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-orange-600 focus:outline-none" rows="4"></textarea>
              </div>

              <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition-all">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
