import { useEffect, useRef } from 'react'
import Icon from '../Icon.jsx'
import { useForm } from '../../utils/useForm.js'
import { validateNetwork } from '../../utils/validation.js'

function SaveNetworkModal({ network, onSave, onClose }) {
  const dialogRef = useRef(null)
  const { fieldProps, handleSubmit } = useForm(
    { name: '', description: network.description },
    validateNetwork,
  )
  const { error: nameError, ...nameProps } = fieldProps('name')
  const { error: descriptionError, ...descriptionProps } = fieldProps('description')

  useEffect(() => {
    dialogRef.current.showModal()
  }, [])

  function handleBackdropClick(e) {
    if (e.target === dialogRef.current) dialogRef.current.close()
  }

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      onClose={onClose}
      onClick={handleBackdropClick}
      aria-labelledby="save-network-title"
    >
      <form className="modal-card" onSubmit={handleSubmit(onSave)} noValidate>
        <header className="modal-header">
          <h2 id="save-network-title">Save Network Configuration</h2>
          <button
            type="button"
            className="modal-close"
            onClick={() => dialogRef.current.close()}
            aria-label="Close"
          >
            <Icon name="close" size={20} />
          </button>
        </header>
        <p className="modal-subtitle">Give your configuration a name so it's easy to find later.</p>

        <div className="modal-field">
          <label htmlFor="name">
            Network name <span className="required">*</span>
          </label>
          <input
            {...nameProps}
            className="modal-input"
            placeholder="5G Laboratory Network"
            autoComplete="off"
            autoFocus
            aria-required="true"
            aria-invalid={Boolean(nameError)}
            aria-describedby={nameError ? 'name-error' : undefined}
          />
          {nameError && (
            <p id="name-error" className="modal-error">
              {nameError}
            </p>
          )}
        </div>

        <div className="modal-field">
          <div className="modal-label-row">
            <label htmlFor="description">Description</label>
            <span className="muted-small">Optional</span>
          </div>
          <textarea
            {...descriptionProps}
            className="modal-input"
            rows={3}
            aria-invalid={Boolean(descriptionError)}
            aria-describedby={descriptionError ? 'description-error' : undefined}
          />
          {descriptionError && (
            <p id="description-error" className="modal-error">
              {descriptionError}
            </p>
          )}
        </div>

        <p className="network-summary">
          <Icon name="layers" size={16} />
          {network.summary.join(' · ')}
        </p>

        <footer className="modal-footer">
          <button type="button" className="btn-secondary" onClick={() => dialogRef.current.close()}>
            Cancel
          </button>
          <button type="submit" className="btn-save btn-save--sm">
            Save Network
          </button>
        </footer>
      </form>
    </dialog>
  )
}

export default SaveNetworkModal
