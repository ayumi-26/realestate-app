import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { createProperty, deleteProperty, fetchProperties, updateProperty } from '../lib/properties'
import PropertyForm from '../components/PropertyForm'
import './PropertyList.css'

export default function PropertyList() {
  const { user, signOut } = useAuth()

  const [properties, setProperties] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    loadProperties()
  }, [])

  const loadProperties = async () => {
    setIsLoading(true)
    setErrorMessage('')
    try {
      const data = await fetchProperties()
      setProperties(data)
    } catch (error) {
      setErrorMessage('物件一覧の取得に失敗しました。')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    signOut()
  }

  const handleCreate = async (values) => {
    try {
      const created = await createProperty({ ...values, userId: user.id })
      setProperties((prev) => [created, ...prev])
      setIsCreating(false)
    } catch (error) {
      setErrorMessage('物件の登録に失敗しました。')
    }
  }

  const handleUpdate = async (id, values) => {
    try {
      const updated = await updateProperty(id, values)
      setProperties((prev) => prev.map((property) => (property.id === id ? updated : property)))
      setEditingId(null)
    } catch (error) {
      setErrorMessage('物件の更新に失敗しました。')
    }
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm('この物件を削除しますか？')
    if (!confirmed) return

    try {
      await deleteProperty(id)
      setProperties((prev) => prev.filter((property) => property.id !== id))
    } catch (error) {
      setErrorMessage('物件の削除に失敗しました。')
    }
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

      {errorMessage && <p className="auth-error">{errorMessage}</p>}

      <div className="property-toolbar">
        {!isCreating && (
          <button className="primary-button" onClick={() => setIsCreating(true)}>
            + 新規物件を登録
          </button>
        )}
      </div>

      {isCreating && (
        <div className="property-card property-card-form">
          <PropertyForm
            submitLabel="登録する"
            onSubmit={handleCreate}
            onCancel={() => setIsCreating(false)}
          />
        </div>
      )}

      {isLoading ? (
        <p>読み込み中...</p>
      ) : properties.length === 0 && !isCreating ? (
        <p>登録されている物件はまだありません。</p>
      ) : (
        <div className="property-grid">
          {properties.map((property) =>
            editingId === property.id ? (
              <div className="property-card property-card-form" key={property.id}>
                <PropertyForm
                  initialValues={property}
                  submitLabel="更新する"
                  onSubmit={(values) => handleUpdate(property.id, values)}
                  onCancel={() => setEditingId(null)}
                />
              </div>
            ) : (
              <div className="property-card" key={property.id}>
                <h2>{property.name}</h2>
                <p className="property-rent">家賃 {property.rent.toLocaleString()} 円/月</p>
                <p className="property-area">{property.area}</p>
                <p className="property-layout">{property.layout}</p>
                <div className="property-card-actions">
                  <button className="secondary-button" onClick={() => setEditingId(property.id)}>
                    編集
                  </button>
                  <button className="danger-button" onClick={() => handleDelete(property.id)}>
                    削除
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  )
}
