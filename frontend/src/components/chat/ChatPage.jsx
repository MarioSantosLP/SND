import { useEffect, useRef, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import Icon from '../Icon.jsx'
import logo from '../../assets/logo.png'
import './chat.css'

const steps = ['Describe', 'Review & confirm', 'Save your plan']

function ChatPage() {
  const { messages, replying, send } = useOutletContext()
  const bottomRef = useRef(null)
  const isNew = messages.length === 0

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, replying])

  return (
    <div className="chat-page">
      <div className="chat-subheader">
        <span>
          SND: Self Network Deployer <span className="preview-tag">Preview</span>
        </span>
        <span className="chat-privacy">
          <Icon name="lock" size={12} />
          Your ideas, your workspace
        </span>
      </div>

      {isNew ? (
        <section className="chat-hero">
          <img className="logo-badge" src={logo} alt="" width="56" height="56" />
          <p className="eyebrow">From an idea to a network plan</p>
          <h1>What kind of 5G network would you like to create?</h1>
          <p className="hero-text">
            Describe your network requirements in natural language, and I'll help you prepare a
            configuration plan.
          </p>
          <ol className="steps">
            {steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
          <Composer onSend={send} disabled={replying} />
          <Footnote />
        </section>
      ) : (
        <>
          <div className="chat-scroll">
            <div className="messages">
              {messages.map((m) => (
                <Message key={m.id} role={m.role}>
                  {m.text}
                </Message>
              ))}
              {replying && (
                <Message role="assistant">
                  <span className="typing" aria-label="Assistant is typing">
                    <span />
                    <span />
                    <span />
                  </span>
                </Message>
              )}
              <div ref={bottomRef} />
            </div>
          </div>
          <div className="chat-dock">
            <Composer onSend={send} disabled={replying} />
            <Footnote />
          </div>
        </>
      )}
    </div>
  )
}

function Message({ role, children }) {
  return (
    <div className={`message message--${role}`}>
      {role === 'assistant' && (
        <img className="logo-badge" src={logo} alt="SND" width="30" height="30" />
      )}
      <div className="message-body">{children}</div>
    </div>
  )
}

function Composer({ onSend, disabled }) {
  const [text, setText] = useState('')
  const textareaRef = useRef(null)
  const canSend = text.trim() && !disabled

  function submit(e) {
    e.preventDefault()
    if (!canSend) return
    onSend(text.trim())
    setText('')
    textareaRef.current.style.height = ''
  }

  function handleChange(e) {
    setText(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = `${e.target.scrollHeight}px`
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) submit(e)
  }

  return (
    <form className="composer" onSubmit={submit}>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Describe your 5G network..."
        aria-label="Message"
        rows={1}
        autoFocus
      />
      <div className="composer-footer">
        <span className="composer-hint">
          <Icon name="sparkle" size={14} />
          5G configuration assistant
        </span>
        <button type="submit" className="send-btn" disabled={!canSend} aria-label="Send message">
          <Icon name="arrowUp" size={18} />
        </button>
      </div>
    </form>
  )
}

function Footnote() {
  return (
    <p className="chat-footnote">
      A little conversation. A clearer configuration. All responses and network plans are
      simulated.
    </p>
  )
}

export default ChatPage
