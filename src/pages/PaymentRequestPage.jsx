import { Link } from 'react-router-dom'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

export default function PaymentRequestPage() {
  const [form, setForm] = useState({ supplier: '', amount: '', reason: '', deadline: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setForm({ supplier: '', amount: '', reason: '', deadline: '' })
  }

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar title="Payment Request" />
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-2xl">
            {submitted && (
              <div className="mb-6 bg-green-900/20 border border-green-700 rounded-lg p-4 text-green-300">
                ✓ Payment request submitted successfully!
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-xl p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">Supplier Name</label>
                <input 
                  required 
                  type="text"
                  value={form.supplier}
                  onChange={e => setForm({...form, supplier: e.target.value})}
                  placeholder="e.g., ABC Supplies Ltd"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-orange-600 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">Amount (R)</label>
                <input 
                  required 
                  type="number"
                  step="0.01"
                  value={form.amount}
                  onChange={e => setForm({...form, amount: e.target.value})}
                  placeholder="0.00"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-orange-600 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">Reason</label>
                <textarea 
                  required 
                  value={form.reason}
                  onChange={e => setForm({...form, reason: e.target.value})}
                  placeholder="What is this payment for?"
                  rows="4"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-orange-600 focus:outline-none transition"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">Deadline Date</label>
                <input 
                  required 
                  type="date"
                  value={form.deadline}
                  onChange={e => setForm({...form, deadline: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-orange-600 focus:outline-none transition"
                />
              </div>

              <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition-all">
                Submit Payment Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
