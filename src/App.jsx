import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Signup from './pages/Signup'
import PropertyList from './pages/PropertyList'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/properties"
        element={
          <ProtectedRoute>
            <PropertyList />
          </ProtectedRoute>
        }
      />
      {/* ルート直下は物件一覧へ寄せる（未ログインならProtectedRouteがログイン画面へ誘導する） */}
      <Route path="/" element={<Navigate to="/properties" replace />} />
      <Route path="*" element={<Navigate to="/properties" replace />} />
    </Routes>
  )
}

export default App
