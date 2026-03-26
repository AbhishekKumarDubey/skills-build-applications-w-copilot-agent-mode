import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
        const protocol = process.env.REACT_APP_CODESPACE_NAME ? 'https' : 'http';
        const domain = process.env.REACT_APP_CODESPACE_NAME 
          ? `-8000.app.github.dev` 
          : `:8000`;
        
        const apiUrl = `${protocol}://${codespace}${domain}/api/teams/`;
        console.log('Fetching teams from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Teams data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const teamsList = Array.isArray(data) ? data : (data.results || []);
        console.log('Teams list:', teamsList);
        
        setTeams(teamsList);
        setError(null);
      } catch (err) {
        console.error('Error fetching teams:', err);
        setError(err.message);
        setTeams([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="component-container">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading teams...</span>
            </div>
            <p className="mt-3">Loading teams...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="component-container">
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error:</strong> {error}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="component-container">
        <div className="component-header">
          <h2 className="component-title">👥 Teams</h2>
        </div>
        
        {teams.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <p>No teams found.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Members</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => (
                  <tr key={team.id}>
                    <td><span className="badge bg-primary">{team.id}</span></td>
                    <td><strong>{team.name || 'N/A'}</strong></td>
                    <td><span className="badge bg-info">{team.members_count || 0}</span></td>
                    <td><span className="badge bg-success">{team.score || 0}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Teams;
