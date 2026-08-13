import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const fallbackEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function normalizeItems(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  return []
}

function formatMembers(members) {
  if (!Array.isArray(members)) return 'N/A'
  if (members.length === 0) return 'No members'

  return members
    .map((member) => member?.fullName ?? member?.username ?? member?.name ?? member)
    .join(', ')
}

function Teams({ apiBaseUrl }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false
    const endpoint = apiBaseUrl ? `${apiBaseUrl}/teams/` : fallbackEndpoint

    async function fetchTeams() {
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
          setError(err instanceof Error ? err.message : 'Failed to load teams')
          setItems([])
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    fetchTeams()

    return () => {
      ignore = true
    }
  }, [apiBaseUrl])

  return (
    <section>
      <h2 className="h4 mb-3">Teams</h2>
      {loading && <p>Loading teams...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && items.length === 0 && (
        <div className="alert alert-secondary">No teams found.</div>
      )}
      {!loading && !error && items.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>Team</th>
                <th>Members</th>
                <th className="text-end">Total Points</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id ?? `${item.name ?? 'team'}-${index}`}>
                  <td>{item.name ?? 'N/A'}</td>
                  <td>{formatMembers(item.members)}</td>
                  <td className="text-end">{item.totalPoints ?? item.points ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Teams
