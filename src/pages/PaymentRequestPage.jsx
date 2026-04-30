import { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useAppStore } from '../lib/store'
import { Upload, X } from 'lucide-react'

export default function PaymentRequestPage() {
  const [form, setForm] = useState({ supplier: '', amount: '', reason: '', deadline: '', invoice: null })
  const [selectedApprovers, setSelectedApprovers] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const { addPayment } = useAppStore()
  const { employees } = useAppStore()

  const managers = employees.filter(e => e.department !== 'Sales')

  const toggleApprover = (id) => {
    setSelectedApprovers(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id])
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) setForm({ ...form, invoice: file })
  }

  const removeFile = () => {
    setForm({ ...form, invoice: null })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedApprovers.length) { alert('Select approvers'); return }
    
    addPayment({
      employeeId: 1,
      supplier: form.supplier,
      amount: parseFloat(form.amount),
      reason: form.reason,
      approvers: selectedApprovers,
      status: 'pending'
    })

    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setForm({ supplier: '', amount: '', reason: '', deadline: '', invoice: null })
      setSelectedApprovers([])
    }, 2000)
  }

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar title="Payment Request" />
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-3xl">
            {submitted && (
              <div className="mb-6 bg-green-900/20 border border-green-700 rounded-lg p-4 text-green-300">
                ✓ Payment request submitted to {selectedApprovers.length} approver(s)!
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-xl p-8 space-y-8">
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Supplier Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Supplier Name *</label>
                    <input required type="text" value={form.supplier} onChange={e => setForm({...form, supplier: e.target.value})} placeholder="e.g., ABC Supplies" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-orange-600 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Amount (R) *</label>
                    <input required type="number" step="0.01" min="0" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} placeholder="0.00" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-orange-600 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Reason *</label>
                    <textarea required value={form.reason} onChange={e => setForm({...form, reason: e.target.value})} placeholder="What is this payment for?" rows="3" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-orange-600 focus:outline-none"></textarea>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-4">Invoice</h3>
                <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 text-center hover:border-orange-600 transition">
                  {form.invoice ? (
                    <div className="flex items-center justify-between bg-slate-800 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-600/20 rounded-lg flex items-center justify-center">📄</div>
                        <div className="text-left">
                          <p className="text-white font-medium text-sm">{form.invoice.name}</p>
                          <p className="text-slate-400 text-xs">{(form.invoice.size / 1024).toFixed(2)} KB</p>
                        </div>
                      </div>
                      <button type="button" onClick={removeFile} className="text-slate-400 hover:text-red-400">
                        <X size={20} />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <div className="flex flex-col items-center">
                        <Upload size={32} className="text-slate-500 mb-2" />
                        <p className="text-white font-medium">Upload Invoice</p>
                      </div>
                      <input type="file" onChange={handleFileChange} accept=".pdf,.jpg,.png" className="hidden" />
                    </label>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-4">Select Approvers *</h3>
                <div className="space-y-2">
                  {managers.map(manager => (
                    <label key={manager.id} className="flex items-center p-3 bg-slate-800 border border-slate-700 rounded-lg hover:border-orange-600 cursor-pointer">
                      <input type="checkbox" checked={selectedApprovers.includes(manager.id)} onChange={() => toggleApprover(manager.id)} className="w-4 h-4 rounded accent-orange-600" />
                      <div className="ml-3 flex-1">
                        <p className="text-white font-medium">{manager.name}</p>
                        <p className="text-slate-400 text-sm">{manager.department}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {form.amount && (
                <div className="bg-gradient-to-r from-orange-900/30 to-orange-900/10 border border-orange-800 rounded-xl p-6">
                  <div className="flex justify-between items-center">
                    <p className="text-slate-300">To: {form.supplier || 'Supplier'}</p>
                    <p className="text-4xl font-bold text-orange-500">R{parseFloat(form.amount || 0).toFixed(2)}</p>
                  </div>
                </div>
              )}

              <button type="submit" disabled={!form.supplier || !form.amount || !selectedApprovers.length} className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-slate-700 text-white py-3 rounded-lg font-semibold transition-all">
                Submit Payment Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
