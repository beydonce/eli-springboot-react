import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './Login.jsx'
import ProtectedData from './ProtectedData.jsx'

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/protected" element={<ProtectedData />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  )
}

export default App
