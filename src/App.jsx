import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './lib/auth'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ProfilePage from './pages/ProfilePage'
import LeaveRequestPage from './pages/LeaveRequestPage'
import ClaimsPage from './pages/ClaimsPage'
import PaymentRequestPage from './pages/PaymentRequestPage'
import ITSupportPage from './pages/ITSupportPage'
import AdminDashboard from './pages/AdminDashboard'
import AdminEmployeesPage from './pages/AdminEmployeesPage'
import AdminLeavePage from './pages/AdminLeavePage'
import AdminClaimsPage from './pages/AdminClaimsPage'
import AdminPaymentsPage from './pages/AdminPaymentsPage'
import AdminSettingsPage from './pages/AdminSettingsPage'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuthStore()
  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center"><div className="animate-spin w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full"></div></div>
  return user ? children : <Navigate to="/login" />
}

export default function App() {
  const { initAuth } = useAuthStore()
  useEffect(() => { initAuth() }, [])

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/leave" element={<ProtectedRoute><LeaveRequestPage /></ProtectedRoute>} />
        <Route path="/claims" element={<ProtectedRoute><ClaimsPage /></ProtectedRoute>} />
        <Route path="/payments" element={<ProtectedRoute><PaymentRequestPage /></ProtectedRoute>} />
        <Route path="/it-support" element={<ProtectedRoute><ITSupportPage /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/employees" element={<ProtectedRoute><AdminEmployeesPage /></ProtectedRoute>} />
        <Route path="/admin/leave" element={<ProtectedRoute><AdminLeavePage /></ProtectedRoute>} />
        <Route path="/admin/claims" element={<ProtectedRoute><AdminClaimsPage /></ProtectedRoute>} />
        <Route path="/admin/payments" element={<ProtectedRoute><AdminPaymentsPage /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute><AdminSettingsPage /></ProtectedRoute>} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}
