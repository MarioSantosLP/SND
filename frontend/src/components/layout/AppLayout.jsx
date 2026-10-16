import { useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import Icon from '../Icon.jsx'
import logo from '../../assets/logo.png'
import { currentUser } from '../../data/mock.js'
import { useConversations } from '../../utils/useConversations.js'
import { useNetworks } from '../../utils/useNetworks.js'
import './layout.css'

function AppLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const chat = useConversations()
  const networks = useNetworks()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const pageTitle = pathname.startsWith('/implementations') ? 'Implementations' : 'Chat'

  function newChat() {
    setMobileOpen(false)
    navigate('/chat')
  }

  return (
    <div className={`app${collapsed ? ' app--collapsed' : ''}`}>
      <aside className={`sidebar${mobileOpen ? ' sidebar--open' : ''}`}>
        <div className="sidebar-header">
          <img className="logo-badge" src={logo} alt="" width="32" height="32" />
          <div className="sidebar-brand label">
            <strong>SND</strong>
            <span>Self Network Deployer</span>
          </div>
          <button
            type="button"
            className="icon-btn sidebar-toggle"
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Icon name="sidebar" />
          </button>
        </div>

        <button type="button" className="new-chat-btn" onClick={newChat}>
          <Icon name="plus" />
          <span className="label">New Chat</span>
        </button>

        <nav className="sidebar-nav">
          <NavLink to="/chat" className="nav-item" onClick={() => setMobileOpen(false)}>
            <Icon name="message" />
            <span className="label">Chat</span>
          </NavLink>
          <NavLink to="/implementations" className="nav-item" onClick={() => setMobileOpen(false)}>
            <Icon name="layers" />
            <span className="label">Implementations</span>
            {networks.networks.length > 0 && (
              <span className="nav-count label">{networks.networks.length}</span>
            )}
          </NavLink>
        </nav>

        {chat.conversations.length > 0 && (
          <section className="sidebar-history label">
            <h2>Recent conversations</h2>
            <ul>
              {chat.conversations.map((c) => (
                <li key={c.id}>
                  <NavLink
                    to={`/chat/${c.id}`}
                    className="history-item"
                    title={c.title}
                    onClick={() => setMobileOpen(false)}
                  >
                    <Icon name="message" size={15} />
                    <span>{c.title}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="sidebar-footer">
          <div className="workspace-status label">
            <span>
              <span className="status-dot" />
              Demo workspace
            </span>
            <span className="muted">Simulation only</span>
          </div>

          <div className="user-menu">
            {menuOpen && (
              <div className="user-dropdown" role="menu">
                <button type="button" role="menuitem" onClick={() => navigate('/login')}>
                  <Icon name="logout" size={16} />
                  Log out
                </button>
              </div>
            )}
            <button
              type="button"
              className="user-card"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-haspopup="menu"
            >
              <span className="avatar">{currentUser.initials}</span>
              <span className="user-info label">
                <strong>{currentUser.name}</strong>
                <span>{currentUser.role}</span>
              </span>
              <span className="label">
                <Icon name="chevronDown" size={16} />
              </span>
            </button>
          </div>
        </div>
      </aside>

      {mobileOpen && <div className="sidebar-backdrop" onClick={() => setMobileOpen(false)} />}

      <div className="main">
        <header className="topbar">
          <button
            type="button"
            className="icon-btn mobile-menu-btn"
            onClick={() => setMobileOpen(true)}
            aria-label="Open sidebar"
          >
            <Icon name="menu" />
          </button>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <span>Workspace</span>
            <Icon name="chevronRight" size={14} />
            <span className="breadcrumb-current">{pageTitle}</span>
          </nav>
          <span className="env-badge">
            <span className="status-dot" />
            Prototype environment
          </span>
        </header>

        <div className="content">
          <Outlet context={{ ...chat, networks }} />
        </div>
      </div>
    </div>
  )
}

export default AppLayout
