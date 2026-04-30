import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useAppStore } from '../lib/store'
import { CheckCircle, Clock } from 'lucide-react'

export default function AdminITPage() {
  const { itRequests, resolveITRequest, closeITRequest, getEmployeeName } = useAppStore()

  const priorityColors = {
    low: 'bg-blue-900 text-blue-300',
    medium: 'bg-yellow-900 text-yellow-300',
    high: 'bg-orange-900 text-orange-300',
    urgent: 'bg-red-900 text-red-300'
  }

  const issueIcons = {
    hardware: '🖥️',
    software: '💻',
    network: '🌐',
    account: '👤',
    other: '❓'
  }

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar title="IT Support Tickets" />
        <div className="flex-1 overflow-auto p-8">
          <h1 className="text-4xl font-bold text-white mb-8">Support Tickets ({itRequests.length})</h1>
          
          <div className="space-y-4">
            {itRequests.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center">
                <p className="text-slate-400">No support tickets yet</p>
              </div>
            ) : (
              itRequests.map(ticket => (
                <div key={ticket.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl">{issueIcons[ticket.issueType]}</span>
                        <div>
                          <p className="text-xl font-bold text-white">{getEmployeeName(ticket.employeeId)}</p>
                          <p className="text-slate-400 text-sm">{ticket.issueType} • {new Date(ticket.submittedAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${priorityColors[ticket.priority]}`}>
                        {ticket.priority.toUpperCase()}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium text-center ${
                        ticket.status === 'pending' ? 'bg-yellow-900 text-yellow-300' :
                        ticket.status === 'resolved' ? 'bg-blue-900 text-blue-300' :
                        'bg-green-900 text-green-300'
                      }`}>
                        {ticket.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-4 p-4 bg-slate-800/50 rounded-lg">
                    <p className="text-slate-300 whitespace-pre-wrap">{ticket.description}</p>
                  </div>

                  {ticket.status === 'pending' && (
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => resolveITRequest(ticket.id)}
                        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                      >
                        <Clock size={18} />
                        <span>In Progress</span>
                      </button>
                      <button 
                        onClick={() => closeITRequest(ticket.id)}
                        className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                      >
                        <CheckCircle size={18} />
                        <span>Resolved</span>
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
