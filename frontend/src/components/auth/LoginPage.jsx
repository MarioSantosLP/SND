import AuthLayout, { FormField, SubmitButton } from './AuthLayout.jsx'
import { useForm } from '../../utils/useForm.js'
import { validateLogin } from '../../utils/validation.js'

function LoginPage() {
  const { fieldProps, handleSubmit } = useForm({ email: '', password: '' }, validateLogin)

  function onValid() {
    // TODO: call FastAPI auth endpoint once the backend exists
  }

  return (
    <AuthLayout>
      <form className="auth-form" onSubmit={handleSubmit(onValid)} noValidate>
        <FormField
          label="Email address"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          {...fieldProps('email')}
        />
        <FormField
          label="Password"
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          {...fieldProps('password')}
        />
        <SubmitButton>Log In</SubmitButton>
      </form>
    </AuthLayout>
  )
}

export default LoginPage
