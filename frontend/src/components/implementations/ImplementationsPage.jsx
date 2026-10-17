import { useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import Icon from '../Icon.jsx'
import Modal, { ConfirmDialog } from '../Modal.jsx'
import NetworkModal from '../NetworkModal.jsx'
import ProposalView from '../ProposalView.jsx'
import { mockProposal } from '../../data/mock.js'
import './implementations.css'

const statusLabels = {
  deployed: 'Deployed (Simulated)',
  deploying: 'Deploying…',
  saved: 'Saved',
}

function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function ImplementationsPage() {
  const { networks } = useOutletContext()
  const navigate = useNavigate()
  const [dialog, setDialog] = useState(null)
  const count = networks.networks.length

  function createNetwork() {
    navigate('/chat')
  }

  return (
    <div className="implementations">
      <header className="impl-header">
        <div>
          <p className="impl-eyebrow">Your network library</p>
          <h1>Implementations</h1>
          <p className="impl-subtitle">View and manage your saved 5G network configurations.</p>
        </div>
        <button type="button" className="impl-create" onClick={createNetwork}>
          <Icon name="plus" />
          Create Network
        </button>
      </header>

      <div className="impl-toolbar">
        <h2>
          Saved configurations <span className="impl-count">{count}</span>
        </h2>
        <span className="impl-storage">Stored in this demo session</span>
      </div>

      {count === 0 ? (
        <section className="impl-empty">
          <span className="impl-icon impl-icon--lg">
            <Icon name="layers" size={26} />
          </span>
          <h3>No saved implementations yet.</h3>
          <p>
            Start a conversation with the AI assistant to create your first 5G network
            configuration.
          </p>
          <button type="button" className="impl-create" onClick={createNetwork}>
            <Icon name="plus" />
            Create Network
          </button>
        </section>
      ) : (
        <ul className="impl-grid">
          {networks.networks.map((n) => (
            <li key={n.id} className="impl-card">
              <div className="impl-card-top">
                <span className="impl-icon">
                  <Icon name="network" />
                </span>
                <span className={`impl-status impl-status--${n.status}`}>
                  {n.status === 'deployed' && <Icon name="check" size={12} />}
                  {statusLabels[n.status]}
                </span>
                <button
                  type="button"
                  className="impl-delete"
                  onClick={() => setDialog({ type: 'delete', network: n })}
                  aria-label={`Delete ${n.name}`}
                >
                  <Icon name="trash" size={16} />
                </button>
              </div>

              <h3>{n.name}</h3>
              <p className="impl-description">{n.description || 'No description.'}</p>

              <dl className="impl-specs">
                {n.specs.map(([key, value]) => (
                  <div key={key}>
                    <dt>{key}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="impl-actions">
                <button
                  type="button"
                  className="impl-btn impl-btn--deploy"
                  onClick={() => networks.deploy(n.id)}
                  disabled={n.status === 'deploying'}
                >
                  {n.status === 'deploying' ? 'Deploying…' : 'Deploy'}
                </button>
                <button type="button" className="impl-btn" onClick={() => setDialog({ type: 'edit', network: n })}>
                  Edit
                </button>
                <button type="button" className="impl-btn" onClick={() => networks.duplicate(n.id)}>
                  Duplicate
                </button>
              </div>

              <div className="impl-card-footer">
                <span>Created {formatDate(n.createdAt)}</span>
                <button
                  type="button"
                  className="impl-details"
                  onClick={() => setDialog({ type: 'details', network: n })}
                >
                  View Details
                  <Icon name="chevronRight" size={14} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <p className="impl-footnote">
        <Icon name="lock" size={12} />
        Saved plans are for reference only. No infrastructure has been deployed.
      </p>

      {dialog?.type === 'edit' && (
        <NetworkModal
          title="Edit Network Configuration"
          submitLabel="Save Changes"
          initialValues={{ name: dialog.network.name, description: dialog.network.description }}
          summary={dialog.network.summary}
          onSubmit={({ name, description }) => {
            networks.update(dialog.network.id, { name: name.trim(), description: description.trim() })
            setDialog(null)
          }}
          onClose={() => setDialog(null)}
        />
      )}

      {dialog?.type === 'delete' && (
        <ConfirmDialog
          title="Delete network?"
          message={`“${dialog.network.name}” will be removed from your library. This can't be undone.`}
          confirmLabel="Delete"
          onConfirm={() => {
            networks.remove(dialog.network.id)
            setDialog(null)
          }}
          onCancel={() => setDialog(null)}
        />
      )}

      {dialog?.type === 'details' && (
        <NetworkDetails network={dialog.network} onClose={() => setDialog(null)} />
      )}
    </div>
  )
}

function NetworkDetails({ network, onClose }) {
  return (
    <Modal title={network.name} onClose={onClose} size="lg">
      {network.description && <p className="modal-subtitle">{network.description}</p>}
      <span className={`impl-status impl-status--${network.status}`}>
        {network.status === 'deployed' && <Icon name="check" size={12} />}
        {statusLabels[network.status]} · Saved {formatDate(network.createdAt)}
      </span>
      <ProposalView proposal={network.proposal ?? mockProposal} accent />
      {network.conversationId && (
        <Link to={`/chat/${network.conversationId}`} className="impl-details impl-details--modal">
          Open the original conversation
          <Icon name="chevronRight" size={14} />
        </Link>
      )}
    </Modal>
  )
}

export default ImplementationsPage
