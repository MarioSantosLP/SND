import { useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate, useOutletContext, useParams } from 'react-router-dom'
import Icon from '../Icon.jsx'
import logo from '../../assets/logo.png'
import { currentUser } from '../../data/mock.js'
import './chat.css'

const steps = ['Describe', 'Review & confirm', 'Save your plan']

const actions = [
  { decision: 'deploy', label: 'Deploy', variant: 'deploy' },
  { decision: 'configs', label: 'Configs only', variant: 'soft' },
  { decision: 'refine', label: 'Refine', variant: 'soft' },
  { decision: 'cancel', label: 'Cancel', variant: 'outline' },
]

const decisionMessages = {
  deploy: 'Deployment requested. In the full system, SND would now book resources and deploy this network.',
  configs: 'Configuration files requested. In the full system, SND would generate them without deploying.',
  refine: "Sure. Tell me below what you'd like to change.",
  cancel: 'Proposal cancelled.',
}

function ChatPage() {
  const { id } = useParams()
  const { conversations, pending, send, decide } = useOutletContext()
  const navigate = useNavigate()
  const bottomRef = useRef(null)

  const conversation = conversations.find((c) => c.id === id)
  const messages = conversation?.messages ?? []
  const replying = pending.includes(id)
  const lastProposalId = messages.findLast((m) => m.proposal)?.id

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length, replying])

  if (id && !conversation) return <Navigate to="/chat" replace />

  function handleSend(text) {
    const conversationId = send(id ?? null, text)
    if (!id) navigate(`/chat/${conversationId}`)
  }

  return (
    <div className="chat-page" key={id ?? 'new'}>
      <div className="chat-subheader">
        <span>
          SND: Self Network Deployer <span className="tag">Preview</span>
        </span>
        <span className="chat-privacy">
          <Icon name="lock" size={12} />
          Your ideas, your workspace
        </span>
      </div>

      {!conversation ? (
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
          <Composer onSend={handleSend} disabled={false} />
          <Footnote />
        </section>
      ) : (
        <>
          <div className="chat-scroll">
            <div className="messages">
              {messages.map((m) =>
                m.role === 'user' ? (
                  <div key={m.id} className="message message--user">
                    <div className="user-bubble">{m.text}</div>
                    <span className="avatar avatar--sm">{currentUser.initials}</span>
                  </div>
                ) : (
                  <AssistantMessage key={m.id}>
                    <Proposal
                      proposal={m.proposal}
                      current={m.id === lastProposalId}
                      decision={m.decision}
                      onDecide={(decision) => decide(id, m.id, decision)}
                    />
                  </AssistantMessage>
                ),
              )}
              {replying && (
                <AssistantMessage>
                  <span className="typing" aria-label="Assistant is typing">
                    <span />
                    <span />
                    <span />
                  </span>
                </AssistantMessage>
              )}
              <div ref={bottomRef} />
            </div>
          </div>
          <div className="chat-dock">
            <Composer onSend={handleSend} disabled={replying} />
            <Footnote />
          </div>
        </>
      )}
    </div>
  )
}

function AssistantMessage({ children }) {
  return (
    <div className="message message--assistant">
      <div className="assistant-header">
        <img className="logo-badge" src={logo} alt="" width="22" height="22" />
        <strong>SND: Self Network Deployer</strong>
        <span className="muted-small">Simulated response</span>
      </div>
      <div className="assistant-body">{children}</div>
    </div>
  )
}

function Proposal({ proposal, current, decision, onDecide }) {
  return (
    <article className="proposal">
      <span className="tag tag--pill">{current ? 'Current proposal' : 'Previous proposal'}</span>
      <h3>{proposal.title}</h3>
      <p>{proposal.summary}</p>

      {proposal.sections.map((section) => (
        <section key={section.title}>
          <h4>{section.title}</h4>
          <dl className="kv-table">
            {section.rows.map(([key, value]) => (
              <div key={key}>
                <dt>{key}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}

      <hr />

      {decision ? (
        <p className="decision">{decisionMessages[decision]}</p>
      ) : (
        current && (
          <div className="proposal-actions">
            {actions.map((a) => (
              <button
                key={a.decision}
                type="button"
                className={`pill-btn pill-btn--${a.variant}`}
                onClick={() => onDecide(a.decision)}
              >
                {a.label}
              </button>
            ))}
          </div>
        )
      )}

      <p className="muted-small">
        Demonstration only. No infrastructure or real configurations are created.
      </p>
    </article>
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
