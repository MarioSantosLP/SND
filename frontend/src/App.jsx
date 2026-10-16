import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './components/auth/LoginPage.jsx'
import SignupPage from './components/auth/SignupPage.jsx'
import AppLayout from './components/layout/AppLayout.jsx'
import ChatPage from './components/chat/ChatPage.jsx'
import ImplementationsPage from './components/implementations/ImplementationsPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route element={<AppLayout />}>
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/implementations" element={<ImplementationsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
