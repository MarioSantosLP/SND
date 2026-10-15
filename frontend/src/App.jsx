import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './components/auth/LoginPage.jsx'
import SignupPage from './components/auth/SignupPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
