import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useAppStore } from '../lib/store'
import { CheckCircle, XCircle } from 'lucide-react'

export default function AdminPaymentsPage() {
  const { payments, approvePayment, rejectPayment, getEmployeeName, employees } = useAppStore()

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar title="Payments" />
        <div className="flex-1 overflow-auto p-8">
          <h1 className="text-4xl font-bold text-white mb-8">Payment Requests ({payments.length})</h1>
          
          <div className="space-y-4">
            {payments.map(payment => (
              <div key={payment.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xl font-bold text-white">{payment.supplier}</p>
                    <p className="text-slate-400 text-sm">From: {getEmployeeName(payment.employeeId)}</p>
                    <p className="text-slate-400 text-sm">Submitted: {new Date(payment.submittedAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    payment.status === 'pending' ? 'bg-yellow-900 text-yellow-300' :
                    payment.status === 'approved' ? 'bg-green-900 text-green-300' :
                    'bg-red-900 text-red-300'
                  }`}>
                    {payment.status}
                  </span>
                </div>
                
                <div className="mb-4 p-4 bg-slate-800/50 rounded-lg">
                  <p className="text-4xl font-bold text-orange-500">R{payment.amount.toFixed(2)}</p>
                  <p className="text-slate-400 text-sm mt-2">Approvers: {payment.approvers.map(id => {
                    const emp = employees.find(e => e.id === id)
                    return emp?.name
                  }).join(', ')}</p>
                </div>

                {payment.status === 'pending' && (
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => approvePayment(payment.id)}
                      className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      <CheckCircle size={18} />
                      <span>Approve</span>
                    </button>
                    <button 
                      onClick={() => rejectPayment(payment.id)}
                      className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      <XCircle size={18} />
                      <span>Reject</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
