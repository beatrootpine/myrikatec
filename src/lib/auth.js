import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: null,
  profile: null,
  role: 'employee',
  loading: false,

  initAuth: () => {
    set({ loading: false })
  },

  signOut: () => {
    set({ user: null, profile: null, role: 'employee' })
    window.location.href = '/login'
  },

  demoSignInEmployee: () => {
    set({ 
      user: { id: 'emp-123', email: 'Mosotho.Moshoane@rikatec.co.za' },
      profile: { 
        id: 'emp-123',
        full_name: 'Mosotho Moshoane', 
        email: 'Mosotho.Moshoane@rikatec.co.za',
        department: 'Management',
        phone: '+27 11 555 1234',
        role: { name: 'employee' }
      },
      role: 'employee'
    })
  },

  demoSignInAdmin: () => {
    set({ 
      user: { id: 'admin-123', email: 'admin@rikatec.com' },
      profile: { 
        id: 'admin-123',
        full_name: 'Admin User', 
        email: 'admin@rikatec.com',
        department: 'IT',
        phone: '+27 11 999 8888',
        role: { name: 'admin' }
      },
      role: 'admin'
    })
  }
}))
