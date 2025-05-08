import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch } from './redux/store'
import { selectAssets, selectLoading, selectError } from './redux/selectors'
import { fetchAssets } from './redux/cryptoSlice'
import { startWebSocketSimulation } from './services/websocketService'
import CryptoTable from './components/CryptoTable'

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const assets = useSelector(selectAssets)
  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)
  const [wsInterval, setWsInterval] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Initial data fetch
    dispatch(fetchAssets())

    // Start WebSocket simulation
    const interval = startWebSocketSimulation(assets, dispatch)
    setWsInterval(interval)

    // Refresh real data every 60 seconds
    const refreshInterval = setInterval(() => {
      dispatch(fetchAssets())
    }, 60000)

    // Cleanup intervals on unmount
    return () => {
      if (wsInterval) clearInterval(wsInterval)
      clearInterval(refreshInterval)
    }
  }, [dispatch])

  // Update WebSocket simulation when assets change
  useEffect(() => {
    if (wsInterval) {
      clearInterval(wsInterval)
    }
    const newInterval = startWebSocketSimulation(assets, dispatch)
    setWsInterval(newInterval)

    return () => {
      if (newInterval) clearInterval(newInterval)
    }
  }, [assets, dispatch])

  if (loading && assets.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-2xl font-semibold text-gray-700">Loading...</div>
      </div>
    )
  }

  if (error && assets.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-2xl font-semibold text-red-600">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Real-Time Crypto Price Tracker</h1>
      <CryptoTable />
      </div>
    </div>
  )
}

export default App

