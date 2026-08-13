import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const fallbackEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function normalizeItems(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  return []
}

function Workouts({ apiBaseUrl }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false
    const endpoint = apiBaseUrl ? `${apiBaseUrl}/workouts/` : fallbackEndpoint

    async function fetchWorkouts() {
      try {
        setLoading(true)
        setError('')
        const response = await fetch(endpoint)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        if (!ignore) {
          setItems(normalizeItems(payload))
        }
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : 'Failed to load workouts')
          setItems([])
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    fetchWorkouts()

    return () => {
      ignore = true
    }
  }, [apiBaseUrl])

  return (
    <section>
      <h2 className="h4 mb-3">Workouts</h2>
      {loading && <p>Loading workouts...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && items.length === 0 && (
        <div className="alert alert-secondary">No workouts found.</div>
      )}
      {!loading && !error && items.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>Title</th>
                <th>Focus Area</th>
                <th>Difficulty</th>
                <th className="text-end">Minutes</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id ?? `${item.title ?? 'workout'}-${index}`}>
                  <td>{item.title ?? item.name ?? 'N/A'}</td>
                  <td>{item.focusArea ?? 'N/A'}</td>
                  <td>{item.difficulty ?? 'N/A'}</td>
                  <td className="text-end">{item.suggestedMinutes ?? item.minutes ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Workouts
