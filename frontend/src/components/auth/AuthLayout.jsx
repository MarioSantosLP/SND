import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Icon from '../Icon.jsx'
import logo from '../../assets/logo.png'
import './auth.css'

function AuthLayout({ heading, subheading, children }) {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <header className="auth-header">
          <img className="logo-badge" src={logo} alt="SND logo" width="72" height="72" />
          <h1 className="auth-brand">SND: Self Network Deployer</h1>
          {heading && <h2 className="auth-heading">{heading}</h2>}
          {subheading && <p className="auth-subheading">{subheading}</p>}
        </header>

        <nav className="auth-tabs" aria-label="Authentication">
          <NavLink to="/login" className="auth-tab">
            Log In
          </NavLink>
          <NavLink to="/signup" className="auth-tab">
            Create Account
          </NavLink>
        </nav>

        {children}

        <p className="auth-footnote">
          <Icon name="lock" size={12} />
          Frontend prototype. No real networks are deployed.
        </p>
      </section>
    </main>
  )
}

export function FormField({ label, error, type = 'text', showToggle = true, ...inputProps }) {
  const [visible, setVisible] = useState(false)
  const hasToggle = type === 'password' && showToggle
  const errorId = `${inputProps.id}-error`

  return (
    <div className="field">
      <label htmlFor={inputProps.id}>{label}</label>
      <div className="input-wrap">
        <input
          {...inputProps}
          type={hasToggle && visible ? 'text' : type}
          className={`input${hasToggle ? ' input--with-toggle' : ''}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
        />
        {hasToggle && (
          <button
            type="button"
            className="password-toggle"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Hide password' : 'Show password'}
          >
            <Icon name={visible ? 'eyeOff' : 'eye'} />
          </button>
        )}
      </div>
      {error && (
        <p id={errorId} className="field-error">
          {error}
        </p>
      )}
    </div>
  )
}

export function SubmitButton({ children }) {
  return (
    <button type="submit" className="btn-primary">
      {children}
      <Icon name="chevronRight" />
    </button>
  )
}

export default AuthLayout
