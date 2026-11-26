import { useEffect, useState } from 'react'
import { listWatches } from '../services/watchesApi'

export default function useWatches({ page, size, favorite } = {}) {
  const key = JSON.stringify([page, size, favorite])
  const [result, setResult] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    listWatches({ page, size, favorite, signal: controller.signal })
      .then((data) => {
        if (!controller.signal.aborted) setResult({ key, data })
      })
      .catch(() => {
        if (!controller.signal.aborted) setResult({ key, error: true })
      })
    return () => controller.abort()
  }, [page, size, favorite, key])

  return result?.key === key ? result : null
}
