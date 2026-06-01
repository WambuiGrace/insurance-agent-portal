import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Shield, ArrowLeft, Loader2, CheckCircle2, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ROUTES } from '@/constants'
import { cn } from '@/lib/utils'

const forgotSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
})

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(forgotSchema) })

  const onSubmit = async ({ email }) => {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setSubmittedEmail(email)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md animate-fade-in">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          {/* Logo */}
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-950">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 leading-none">AgentHub</p>
              <p className="text-xs text-gray-400 leading-none mt-0.5">Agent Portal</p>
            </div>
          </div>

          {!submitted ? (
            <>
              {/* Heading */}
              <div className="mb-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                  <Mail className="h-6 w-6 text-blue-700" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Forgot your password?</h2>
                <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">
                  No worries. Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-gray-700">
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@zimasa.co.ke"
                    {...register('email')}
                    className={cn(
                      'h-11',
                      errors.email && 'border-red-400 focus-visible:ring-red-300'
                    )}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="h-11 w-full bg-blue-950 hover:bg-blue-900"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending reset link…
                    </>
                  ) : (
                    'Send reset link'
                  )}
                </Button>
              </form>
            </>
          ) : (
            /* Success state */
            <div className="py-4 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Check your inbox</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                We've sent a password reset link to{' '}
                <span className="font-medium text-gray-800">{submittedEmail}</span>.
                The link expires in 30 minutes.
              </p>
              <p className="mt-4 text-xs text-gray-400">
                Didn't receive it?{' '}
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-blue-700 underline-offset-2 hover:underline"
                >
                  Try again
                </button>
              </p>
            </div>
          )}

          {/* Back link */}
          <div className="mt-6 border-t border-gray-100 pt-6">
            <Link
              to={ROUTES.LOGIN}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
