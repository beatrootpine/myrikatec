import { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useAppStore } from '../lib/store'
import { Trash2, Edit2, Plus } from 'lucide-react'

export default function AdminEmployeesPage() {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useAppStore()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', department: '', phone: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingId) {
      updateEmployee(editingId, form)
      setEditingId(null)
    } else {
      addEmployee(form)
    }
    setForm({ name: '', email: '', department: '', phone: '' })
    setShowForm(false)
  }

  const handleEdit = (emp) => {
    setForm(emp)
    setEditingId(emp.id)
    setShowForm(true)
  }

  const handleCancel = () => {
    setEditingId(null)
    setForm({ name: '', email: '', department: '', phone: '' })
    setShowForm(false)
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar title="Employees" />
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Employees ({employees.length})</h1>
            <button 
              onClick={() => setShowForm(true)}
              className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-all"
            >
              <Plus size={20} />
              <span>Add Employee</span>
            </button>
          </div>

          {/* Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-md w-full">
                <h2 className="text-2xl font-bold text-white mb-4">{editingId ? 'Edit Employee' : 'Add Employee'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Name *</label>
                    <input 
                      required
                      type="text"
                      value={form.name}
                      onChange={e => setForm({...form, name: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-orange-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Email *</label>
                    <input 
                      required
                      type="email"
                      value={form.email}
                      onChange={e => setForm({...form, email: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-orange-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Department *</label>
                    <input 
                      required
                      type="text"
                      value={form.department}
                      onChange={e => setForm({...form, department: e.target.value})}
                      placeholder="e.g., Sales, Finance, HR"
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-orange-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Phone</label>
                    <input 
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm({...form, phone: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-orange-600 focus:outline-none"
                    />
                  </div>
                  <div className="flex space-x-3 pt-4">
                    <button type="submit" className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg font-semibold transition-all">
                      {editingId ? 'Update' : 'Add'}
                    </button>
                    <button type="button" onClick={handleCancel} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg font-semibold transition-all">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Employees Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800 border-b border-slate-700">
                  <tr>
                    <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-slate-300">Name</th>
                    <th className="hidden md:table-cell px-6 py-4 text-left text-sm font-semibold text-slate-300">Email</th>
                    <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-slate-300">Dept</th>
                    <th className="hidden md:table-cell px-6 py-4 text-left text-sm font-semibold text-slate-300">Phone</th>
                    <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-slate-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {employees.map(emp => (
                    <tr key={emp.id} className="hover:bg-slate-800/50 transition">
                      <td className="px-4 md:px-6 py-4 text-white font-medium text-sm">{emp.name}</td>
                      <td className="hidden md:table-cell px-6 py-4 text-slate-400 text-sm">{emp.email}</td>
                      <td className="px-4 md:px-6 py-4 text-slate-400 text-sm">{emp.department}</td>
                      <td className="hidden md:table-cell px-6 py-4 text-slate-400 text-sm">{emp.phone}</td>
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleEdit(emp)}
                            className="text-blue-400 hover:text-blue-300 transition"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button 
                            onClick={() => deleteEmployee(emp.id)}
                            className="text-red-400 hover:text-red-300 transition"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
