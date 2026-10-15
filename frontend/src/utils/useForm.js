import { useState } from 'react'

// Errors are derived from the current values on every render, but a field only
// shows its error once it has been blurred or the form has been submitted.
export function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues)
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const errors = validate(values)
  const isValid = Object.values(errors).every((e) => !e)

  function fieldProps(name) {
    const error = submitted || touched[name] ? errors[name] : ''
    return {
      id: name,
      name,
      value: values[name],
      onChange: (e) => setValues((v) => ({ ...v, [name]: e.target.value })),
      onBlur: () => setTouched((t) => ({ ...t, [name]: true })),
      error,
    }
  }

  function handleSubmit(onValid) {
    return (e) => {
      e.preventDefault()
      setSubmitted(true)
      if (!isValid) {
        const firstInvalid = Object.keys(errors).find((k) => errors[k])
        document.getElementById(firstInvalid)?.focus()
        return
      }
      onValid(values)
    }
  }

  return { values, fieldProps, handleSubmit }
}
