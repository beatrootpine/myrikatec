import { Link } from 'react-router-dom'
import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../lib/auth'

export default function LeaveRequestPage() {
  const { user } = useAuthStore()
  const [form, setForm] = useState({ type: 'annual', start: '', end: '', reason: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const days = Math.ceil((new Date(form.end) - new Date(form.start)) / (1000*60*60*24)) + 1
    const { error } = await supabase.from('leave_requests').insert([{
      employee_id: user.id,
      leave_type: form.type,
      start_date: form.start,
      end_date: form.end,
      days_requested: days,
      reason: form.reason,
      status: 'pending'
    }])
    setLoading(false)
    if (error) alert('Error: ' + error.message)
    else { alert('Leave request submitted!'); setForm({ type: 'annual', start: '', end: '', reason: '' }) }
  }

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-2xl mx-auto">
        <Link to="/dashboard" className="text-orange-600 hover:text-orange-500 mb-6 inline-block font-semibold">← Dashboard</Link>
        <h1 className="text-4xl font-bold text-white mb-8">Request Leave</h1>
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-lg p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Leave Type</label>
            <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white">
              <option value="annual">Annual Leave</option>
              <option value="sick">Sick Leave</option>
              <option value="compassionate">Compassionate</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Start Date</label>
              <input required type="date" value={form.start} onChange={e => setForm({...form, start: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">End Date</label>
              <input required type="date" value={form.end} onChange={e => setForm({...form, end: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Reason</label>
            <textarea required value={form.reason} onChange={e => setForm({...form, reason: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white" rows="4"></textarea>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-slate-700 text-white py-3 rounded-lg font-semibold transition-all">
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </div>
  )
}
