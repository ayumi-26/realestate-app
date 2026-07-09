import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './AuthForm.css'

export default function Signup() {
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [infoMessage, setInfoMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setInfoMessage('')
    setIsSubmitting(true)

    const { data, error } = await signUp(email, password)

    setIsSubmitting(false)

    if (error) {
      setErrorMessage(error.message)
      return
    }

    // メール確認が有効な場合はセッションが発行されないため、その旨を案内する
    if (data.session) {
      navigate('/properties', { replace: true })
    } else {
      setInfoMessage('確認メールを送信しました。メール内のリンクから登録を完了してください。')
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>会員登録</h1>

        <label className="auth-field">
          <span>メールアドレス</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="email"
          />
        </label>

        <label className="auth-field">
          <span>パスワード</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={6}
            autoComplete="new-password"
          />
        </label>

        {errorMessage && <p className="auth-error">{errorMessage}</p>}
        {infoMessage && <p className="auth-info">{infoMessage}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '登録中...' : '会員登録'}
        </button>

        <p className="auth-switch">
          すでにアカウントをお持ちの方は <Link to="/login">ログイン</Link>
        </p>
      </form>
    </div>
  )
}
