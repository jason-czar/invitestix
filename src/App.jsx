import './App.css'
import Pages from "@/pages/index.jsx"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/contexts/AuthContext"
import ProtectedRoute from "@/components/auth/ProtectedRoute"

function App() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <Pages />
        <Toaster />
      </ProtectedRoute>
    </AuthProvider>
  )
}

export default App