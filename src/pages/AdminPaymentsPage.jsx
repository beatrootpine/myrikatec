import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useAppStore } from '../lib/store'
import { CheckCircle, XCircle, Clock } from 'lucide-react'

export default function AdminPaymentsPage() {
  const { payments, approvePayment, rejectPayment, getEmployeeName, employees, getDaysUntilDeadline, getUrgencyColor } = useAppStore()

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar title="Payments" />
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8">Payment Requests ({payments.length})</h1>
          
          <div className="space-y-4 md:space-y-6">
            {payments.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
                <p className="text-slate-400">No payment requests yet</p>
              </div>
            ) : (
              payments.map(payment => {
                const daysLeft = getDaysUntilDeadline(payment.deadline)
                const isUrgent = daysLeft < 1
                const isOverdue = daysLeft < 0
                
                return (
                  <div key={payment.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
                    {/* Header with Urgency */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <div>
                            <p className="text-xl font-bold text-white">{payment.supplier}</p>
                            <p className="text-slate-400 text-sm">From: {getEmployeeName(payment.employeeId)}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          payment.status === 'pending' ? 'bg-yellow-900 text-yellow-300' :
                          payment.status === 'approved' ? 'bg-green-900 text-green-300' :
                          'bg-red-900 text-red-300'
                        }`}>
                          {payment.status}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getUrgencyColor(daysLeft)}`}>
                          <Clock size={14} />
                          <span>{isOverdue ? 'OVERDUE' : `${daysLeft}d`}</span>
                        </span>
                      </div>
                    </div>

                    {/* Amount & Details */}
                    <div className="mb-4 p-4 bg-slate-800/50 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="text-4xl font-bold text-orange-500">R{payment.amount.toFixed(2)}</p>
                          <p className="text-slate-400 text-sm mt-1">Due: {new Date(payment.deadline).toLocaleDateString()}</p>
                        </div>
                        {payment.invoice && (
                          <div className="text-right">
                            <p className="text-slate-400 text-xs">Invoice</p>
                            <p className="text-white font-medium text-sm">{payment.invoice.name}</p>
                          </div>
                        )}
                      </div>
                      <p className="text-slate-300 text-sm">{payment.reason}</p>
                    </div>

                    {/* Approval Timeline */}
                    <div className="mb-4 p-4 bg-slate-800/30 rounded-lg">
                      <p className="text-slate-200 text-sm font-semibold mb-3">Approval Timeline</p>
                      <div className="space-y-2">
                        {payment.approvers.map((approverId, idx) => {
                          const approver = employees.find(e => e.id === approverId)
                          const approval = payment.approvalHistory?.find(a => a.approverId === approverId)
                          
                          return (
                            <div key={approverId} className="flex items-center space-x-3">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                approval ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-400'
                              }`}>
                                {approval ? '✓' : idx + 1}
                              </div>
                              <div className="flex-1">
                                <p className="text-white text-sm">{approver?.name}</p>
                                {approval && (
                                  <p className="text-slate-400 text-xs">Approved {new Date(approval.approvedAt).toLocaleDateString()}</p>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {payment.status === 'pending' && (
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                        <button 
                          onClick={() => approvePayment(payment.id, 1)}
                          className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all"
                        >
                          <CheckCircle size={18} />
                          <span>Approve</span>
                        </button>
                        <button 
                          onClick={() => rejectPayment(payment.id)}
                          className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all"
                        >
                          <XCircle size={18} />
                          <span>Reject</span>
                        </button>
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
