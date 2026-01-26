import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Mail, Shield, AlertCircle, CheckCircle } from 'lucide-react'

export default function Login() {
  const { loginWithGoogle, currentUser, error } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const from = location.state?.from?.pathname || '/'

  useEffect(() => {
    if (currentUser) {
      navigate(from, { replace: true })
    }
  }, [currentUser, navigate, from])

  const handleGoogleLogin = async () => {
    setLoading(true)
    setMessage('')
    const result = await loginWithGoogle()
    
    if (result.success) {
      setMessage('Login successful! Redirecting...')
      setTimeout(() => {
        navigate(from, { replace: true })
      }, 1000)
    } else {
      setMessage(result.error)
    }
    setLoading(false)
  }

  return (
    <div className="container py-8">
      <div className="max-w-md mx-auto">
        <div className="card">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-primary-600" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Welcome to TV Show Merch</h1>
            <p className="text-gray-600">
              Sign in with your Gmail account to continue shopping
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Success Message */}
          {message && !error && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <p className="text-green-700">{message}</p>
              </div>
            </div>
          )}

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
            ) : (
              <>
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="font-medium">Continue with Google</span>
              </>
            )}
          </button>

          {/* Requirements */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2 flex items-center">
              <Mail className="h-4 w-4 mr-2 text-gray-600" />
              Requirements
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Must be a Gmail account (@gmail.com)</li>
              <li>• Account must be verified by Google</li>
              <li>• Required for placing orders and checkout</li>
              <li>• Your data is securely stored and encrypted</li>
            </ul>
          </div>

          {/* Terms and Conditions */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              By continuing, you agree to our{' '}
              <Link to="/terms" className="text-primary-600 hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-primary-600 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>

          {/* Continue Shopping Link */}
          <div className="mt-6 pt-6 border-t text-center">
            <Link to="/" className="text-primary-600 hover:text-primary-700 font-medium">
              Continue shopping without login
            </Link>
            <p className="text-sm text-gray-600 mt-1">
              (You'll need to login for checkout)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}