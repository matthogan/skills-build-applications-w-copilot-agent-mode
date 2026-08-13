import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const fallbackEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function normalizeItems(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  return []
}

function Activities({ apiBaseUrl }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false
    const endpoint = apiBaseUrl ? `${apiBaseUrl}/activities/` : fallbackEndpoint

    async function fetchActivities() {
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
          setError(err instanceof Error ? err.message : 'Failed to load activities')
          setItems([])
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    fetchActivities()

    return () => {
      ignore = true
    }
  }, [apiBaseUrl])

  return (
    <section>
      <h2 className="h4 mb-3">Activities</h2>
      {loading && <p>Loading activities...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && items.length === 0 && (
        <div className="alert alert-secondary">No activities found.</div>
      )}
      {!loading && !error && items.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>Type</th>
                <th>User</th>
                <th className="text-end">Duration (min)</th>
                <th className="text-end">Points</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id ?? `${item.type ?? 'activity'}-${index}`}>
                  <td>{item.type ?? 'N/A'}</td>
                  <td>{item.user?.fullName ?? item.user?.username ?? item.user ?? 'N/A'}</td>
                  <td className="text-end">{item.durationMinutes ?? item.duration ?? 0}</td>
                  <td className="text-end">{item.pointsEarned ?? item.points ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Activities
