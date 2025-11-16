import { useState, useEffect } from 'react'
import TokenWrapper from './TokenWrapper.jsx'

const DataFetcher = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = sessionStorage.getItem('accessToken')
        const response = await fetch('/users', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }

        const result = await response.json()
        setData(result)
      } catch (err) {
        setError('Failed to fetch data')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h1>Fetched Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

const ProtectedData = () => {
  return (
    <TokenWrapper>
      <DataFetcher />
    </TokenWrapper>
  )
}

export default ProtectedData

