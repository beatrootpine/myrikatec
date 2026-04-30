export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-900 rounded-lg p-8 border border-slate-800 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">My Rikatec</h1>
          <p className="text-slate-400 mb-8">HR Management System</p>
          <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-medium transition-colors">
            Sign in with Microsoft
          </button>
        </div>
      </div>
    </div>
  )
}
