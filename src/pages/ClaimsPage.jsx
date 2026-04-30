import { Link } from 'react-router-dom'
import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../lib/auth'

export default function ClaimsPage() {
  const { user } = useAuthStore()
  const [form, setForm] = useState({ type: 'meals', amount: '', description: '', date: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('claims').insert([{
      employee_id: user.id,
      claim_type: form.type,
      amount: parseFloat(form.amount),
      description: form.description,
      date_incurred: form.date,
      status: 'pending'
    }])
    setLoading(false)
    if (error) alert('Error: ' + error.message)
    else { alert('Claim submitted!'); setForm({ type: 'meals', amount: '', description: '', date: '' }) }
  }

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-2xl mx-auto">
        <Link to="/dashboard" className="text-orange-600 hover:text-orange-500 mb-6 inline-block font-semibold">← Dashboard</Link>
        <h1 className="text-4xl font-bold text-white mb-8">Submit Expense Claim</h1>
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-lg p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Claim Type</label>
            <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white">
              <option value="meals">Meals (R350/day)</option>
              <option value="travel">Travel (R4.84/km)</option>
              <option value="accommodation">Accommodation (R1200/night)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Amount (R)</label>
            <input required type="number" step="0.01" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Date</label>
            <input required type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Description</label>
            <textarea required value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white" rows="4"></textarea>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-slate-700 text-white py-3 rounded-lg font-semibold transition-all">
            {loading ? 'Submitting...' : 'Submit Claim'}
          </button>
        </form>
      </div>
    </div>
  )
}
