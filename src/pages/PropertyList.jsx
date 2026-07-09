import { useAuth } from '../context/AuthContext'
import { dummyProperties } from '../data/dummyProperties'
import './PropertyList.css'

export default function PropertyList() {
  const { user, signOut } = useAuth()

  const handleLogout = () => {
    signOut()
  }

  return (
    <div className="property-page">
      <header className="property-header">
        <div>
          <h1>物件一覧</h1>
          {user && <p className="property-user">{user.email} でログイン中</p>}
        </div>
        <button className="logout-button" onClick={handleLogout}>
          ログアウト
        </button>
      </header>

      <div className="property-grid">
        {dummyProperties.map((property) => (
          <div className="property-card" key={property.id}>
            <h2>{property.name}</h2>
            <p className="property-rent">家賃 {property.rent.toLocaleString()} 円/月</p>
            <p className="property-area">{property.area}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
