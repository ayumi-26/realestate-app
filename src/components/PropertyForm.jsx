import { useState } from 'react'

// 物件の新規登録・編集で共通利用するフォーム
export default function PropertyForm({ initialValues, submitLabel, onSubmit, onCancel }) {
  const [name, setName] = useState(initialValues?.name ?? '')
  const [rent, setRent] = useState(initialValues?.rent ?? '')
  const [area, setArea] = useState(initialValues?.area ?? '')
  const [layout, setLayout] = useState(initialValues?.layout ?? '')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    try {
      await onSubmit({ name, rent: Number(rent), area, layout })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="property-form" onSubmit={handleSubmit}>
      <label className="property-form-field">
        <span>物件名</span>
        <input value={name} onChange={(event) => setName(event.target.value)} required />
      </label>

      <label className="property-form-field">
        <span>家賃（円）</span>
        <input
          type="number"
          min="0"
          value={rent}
          onChange={(event) => setRent(event.target.value)}
          required
        />
      </label>

      <label className="property-form-field">
        <span>エリア</span>
        <input value={area} onChange={(event) => setArea(event.target.value)} required />
      </label>

      <label className="property-form-field">
        <span>間取り</span>
        <input
          value={layout}
          onChange={(event) => setLayout(event.target.value)}
          placeholder="例: 1LDK"
          required
        />
      </label>

      <div className="property-form-actions">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '保存中...' : submitLabel}
        </button>
        {onCancel && (
          <button type="button" className="secondary-button" onClick={onCancel}>
            キャンセル
          </button>
        )}
      </div>
    </form>
  )
}
