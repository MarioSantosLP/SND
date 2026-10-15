import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo.png'
import './auth.css'

const iconProps = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

// Card shell shared by the login and signup pages: logo, title, tab switcher and footnote.
function AuthLayout({ heading, subheading, children }) {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <header className="auth-header">
          <img className="auth-logo" src={logo} alt="SND logo" width="72" height="72" />
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
          <svg {...iconProps} width={12} height={12}>
            <rect x="4" y="11" width="16" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
          Frontend prototype. No real networks are deployed.
        </p>
      </section>
    </main>
  )
}

// Labelled input with an inline error. type="password" adds a show/hide toggle
// unless showToggle is false.
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
            <svg {...iconProps}>
              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
              <circle cx="12" cy="12" r="3" />
              {visible && <path d="m3 3 18 18" />}
            </svg>
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
      <svg {...iconProps}>
        <path d="m9 18 6-6-6-6" />
      </svg>
    </button>
  )
}

export default AuthLayout
