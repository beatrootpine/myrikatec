import { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useAppStore } from '../lib/store'
import { Upload, X } from 'lucide-react'

export default function ITSupportPage() {
  const [form, setForm] = useState({ 
    issueType: 'software', 
    priority: 'medium',
    description: '',
    attachment: null
  })
  const [submitted, setSubmitted] = useState(false)
  const { addITRequest } = useAppStore()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) setForm({ ...form, attachment: file })
  }

  const removeFile = () => {
    setForm({ ...form, attachment: null })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    addITRequest({
      employeeId: 1,
      issueType: form.issueType,
      priority: form.priority,
      description: form.description,
      status: 'pending'
    })

    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setForm({ issueType: 'software', priority: 'medium', description: '', attachment: null })
    }, 2000)
  }

  const priorityColors = {
    low: 'bg-blue-900 text-blue-300',
    medium: 'bg-yellow-900 text-yellow-300',
    high: 'bg-orange-900 text-orange-300',
    urgent: 'bg-red-900 text-red-300'
  }

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar title="IT Support Request" />
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-2xl">
            {submitted && (
              <div className="mb-6 bg-green-900/20 border border-green-700 rounded-lg p-4 text-green-300">
                ✓ IT support ticket submitted! Our team will get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-xl p-8 space-y-6">
              {/* ISSUE TYPE */}
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">Issue Type *</label>
                <select 
                  required
                  value={form.issueType} 
                  onChange={e => setForm({...form, issueType: e.target.value})} 
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-orange-600 focus:outline-none"
                >
                  <option value="hardware">🖥️ Hardware (Computer, Printer, etc)</option>
                  <option value="software">💻 Software (Application, Installation)</option>
                  <option value="network">🌐 Network (Internet, WiFi, VPN)</option>
                  <option value="account">👤 Account (Password, Access, Email)</option>
                  <option value="other">❓ Other</option>
                </select>
              </div>

              {/* PRIORITY */}
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-3">Priority *</label>
                <div className="grid grid-cols-4 gap-3">
                  {['low', 'medium', 'high', 'urgent'].map(level => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setForm({...form, priority: level})}
                      className={`py-2 px-3 rounded-lg font-medium transition-all ${
                        form.priority === level 
                          ? `${priorityColors[level]} border-2 border-current`
                          : 'bg-slate-800 text-slate-400 border-2 border-slate-700 hover:border-orange-600'
                      }`}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">Problem Description *</label>
                <textarea 
                  required
                  value={form.description}
                  onChange={e => setForm({...form, description: e.target.value})}
                  placeholder="Describe the issue in detail. What were you doing when the problem occurred?"
                  rows="6"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-orange-600 focus:outline-none transition"
                ></textarea>
              </div>

              {/* ATTACHMENT */}
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">Attachment (Screenshot, Log File)</label>
                <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 text-center hover:border-orange-600 transition">
                  {form.attachment ? (
                    <div className="flex items-center justify-between bg-slate-800 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-600/20 rounded-lg flex items-center justify-center">📎</div>
                        <div className="text-left">
                          <p className="text-white font-medium text-sm">{form.attachment.name}</p>
                          <p className="text-slate-400 text-xs">{(form.attachment.size / 1024).toFixed(2)} KB</p>
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
                        <p className="text-white font-medium">Upload File</p>
                        <p className="text-slate-400 text-sm">Click or drag to upload</p>
                      </div>
                      <input 
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.jpg,.png,.txt,.log,.zip"
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-2">Supported: PDF, JPG, PNG, TXT, LOG, ZIP (max 10MB)</p>
              </div>

              {/* PRIORITY INDICATOR */}
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <p className="text-slate-300 text-sm">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-semibold mr-2 ${priorityColors[form.priority]}`}>
                    {form.priority.toUpperCase()}
                  </span>
                  {form.priority === 'urgent' && "We'll prioritize this immediately"}
                  {form.priority === 'high' && "We'll address this soon"}
                  {form.priority === 'medium' && "We'll look into this"}
                  {form.priority === 'low' && "We'll handle this when we can"}
                </p>
              </div>

              <button 
                type="submit"
                disabled={!form.description}
                className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-slate-700 text-white py-3 rounded-lg font-semibold transition-all"
              >
                Submit Support Ticket
              </button>

              <p className="text-xs text-slate-500 text-center">
                Response time: Low = 2-3 days | Medium = 1-2 days | High = 4-6 hours | Urgent = 1-2 hours
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
