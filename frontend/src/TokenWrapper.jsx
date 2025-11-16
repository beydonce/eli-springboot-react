import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

const TokenWrapper = ({ children }) => {
  const navigate = useNavigate()

  useEffect(() => {
    const checkTokens = async () => {
      const accessToken = sessionStorage.getItem('accessToken')
      const refreshToken = sessionStorage.getItem('refreshToken')

      const isAccessTokenValid = token => {
        if (!token) return false
        try {
          const decodedToken = jwtDecode(token)
          const expiryTime = decodedToken.exp * 1000
          return new Date().getTime() < expiryTime
        } catch (error) {
          return false
        }
      }

      if (!isAccessTokenValid(accessToken)) {
        if (refreshToken) {
          try {
            const response = await fetch('/refresh', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ refreshToken })
            })

            if (response.ok) {
              const data = await response.json()
              sessionStorage.setItem('accessToken', data.accessToken)
              sessionStorage.setItem('refreshToken', data.refreshToken)
            } else {
              throw new Error('Token refresh failed')
            }
          } catch (error) {
            sessionStorage.clear()
            navigate('/login', { replace: true })
          }
        } else {
          sessionStorage.clear()
          navigate('/login', { replace: true })
        }
      }
    }

    checkTokens()
  }, [navigate])

  return <>{children}</>
}

export default TokenWrapper

