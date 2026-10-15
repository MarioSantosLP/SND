import AuthLayout, { FormField, SubmitButton } from './AuthLayout.jsx'
import { useForm } from '../../utils/useForm.js'
import { MIN_PASSWORD_LENGTH, validateSignup } from '../../utils/validation.js'

function SignupPage() {
  const { fieldProps, handleSubmit } = useForm(
    { name: '', email: '', password: '', confirm: '' },
    validateSignup,
  )

  function onValid() {
    // TODO: call FastAPI signup endpoint once the backend exists
  }

  return (
    <AuthLayout
      heading="Create your account"
      subheading="A simpler way to explore and plan 5G networks."
    >
      <form className="auth-form" onSubmit={handleSubmit(onValid)} noValidate>
        <FormField
          label="Full name"
          placeholder="Alex Morgan"
          autoComplete="name"
          {...fieldProps('name')}
        />
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
          placeholder={`At least ${MIN_PASSWORD_LENGTH} characters`}
          autoComplete="new-password"
          {...fieldProps('password')}
        />
        <FormField
          label="Confirm password"
          type="password"
          placeholder="Re-enter your password"
          autoComplete="new-password"
          showToggle={false}
          {...fieldProps('confirm')}
        />
        <SubmitButton>Create Account</SubmitButton>
      </form>
    </AuthLayout>
  )
}

export default SignupPage
