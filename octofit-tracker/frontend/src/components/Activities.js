import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
        const protocol = process.env.REACT_APP_CODESPACE_NAME ? 'https' : 'http';
        const domain = process.env.REACT_APP_CODESPACE_NAME 
          ? `-8000.app.github.dev` 
          : `:8000`;
        
        const apiUrl = `${protocol}://${codespace}${domain}/api/activities/`;
        console.log('Fetching activities from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Activities data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const activitiesList = Array.isArray(data) ? data : (data.results || []);
        console.log('Activities list:', activitiesList);
        
        setActivities(activitiesList);
        setError(null);
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError(err.message);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="component-container">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading activities...</span>
            </div>
            <p className="mt-3">Loading activities...</p>
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
          <h2 className="component-title">🏃 Activities</h2>
        </div>
        
        {activities.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <p>No activities found.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity.id}>
                    <td><span className="badge bg-primary">{activity.id}</span></td>
                    <td><strong>{activity.name || 'N/A'}</strong></td>
                    <td><span className="badge bg-info">{activity.type || 'N/A'}</span></td>
                    <td>{activity.date || 'N/A'}</td>
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

export default Activities;
