import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
        const protocol = process.env.REACT_APP_CODESPACE_NAME ? 'https' : 'http';
        const domain = process.env.REACT_APP_CODESPACE_NAME 
          ? `-8000.app.github.dev` 
          : `:8000`;
        
        const apiUrl = `${protocol}://${codespace}${domain}/api/leaderboard/`;
        console.log('Fetching leaderboard from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Leaderboard data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardList = Array.isArray(data) ? data : (data.results || []);
        console.log('Leaderboard list:', leaderboardList);
        
        setLeaderboard(leaderboardList);
        setError(null);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
        setLeaderboard([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="component-container">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading leaderboard...</span>
            </div>
            <p className="mt-3">Loading leaderboard...</p>
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
          <h2 className="component-title">🏆 Leaderboard</h2>
        </div>
        
        {leaderboard.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <p>No leaderboard data found.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Score</th>
                  <th>Team</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr key={entry.id || index}>
                    <td>
                      <span className={`badge ${index === 0 ? 'bg-warning' : index === 1 ? 'bg-secondary' : index === 2 ? 'bg-danger' : 'bg-info'}`}>
                        {index + 1}
                      </span>
                    </td>
                    <td><strong>{entry.user || 'N/A'}</strong></td>
                    <td><span className="badge bg-success">{entry.score || 0}</span></td>
                    <td>{entry.team || 'N/A'}</td>
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

export default Leaderboard;
