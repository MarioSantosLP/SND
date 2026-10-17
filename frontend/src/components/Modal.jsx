import { useEffect, useId, useRef } from 'react'
import Icon from './Icon.jsx'
import './Modal.css'

function Modal({ title, onClose, size = 'md', children }) {
  const dialogRef = useRef(null)
  const titleId = useId()

  useEffect(() => {
    dialogRef.current.showModal()
  }, [])

  function handleBackdropClick(e) {
    if (e.target === dialogRef.current) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      className={`modal modal--${size}`}
      onClose={onClose}
      onClick={handleBackdropClick}
      aria-labelledby={titleId}
    >
      <div className="modal-card">
        <header className="modal-header">
          <h2 id={titleId}>{title}</h2>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
            <Icon name="close" size={20} />
          </button>
        </header>
        {children}
      </div>
    </dialog>
  )
}

export function ConfirmDialog({ title, message, confirmLabel, onConfirm, onCancel }) {
  return (
    <Modal title={title} onClose={onCancel} size="sm">
      <p className="modal-subtitle">{message}</p>
      <footer className="modal-footer">
        <button type="button" className="btn-secondary" onClick={onCancel} autoFocus>
          Cancel
        </button>
        <button type="button" className="modal-submit modal-submit--danger" onClick={onConfirm}>
          {confirmLabel}
        </button>
      </footer>
    </Modal>
  )
}

export default Modal
