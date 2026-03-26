import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
        const protocol = process.env.REACT_APP_CODESPACE_NAME ? 'https' : 'http';
        const domain = process.env.REACT_APP_CODESPACE_NAME 
          ? `-8000.app.github.dev` 
          : `:8000`;
        
        const apiUrl = `${protocol}://${codespace}${domain}/api/workouts/`;
        console.log('Fetching workouts from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Workouts data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const workoutsList = Array.isArray(data) ? data : (data.results || []);
        console.log('Workouts list:', workoutsList);
        
        setWorkouts(workoutsList);
        setError(null);
      } catch (err) {
        console.error('Error fetching workouts:', err);
        setError(err.message);
        setWorkouts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="component-container">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading workouts...</span>
            </div>
            <p className="mt-3">Loading workouts...</p>
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
          <h2 className="component-title">💪 Workouts</h2>
        </div>
        
        {workouts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <p>No workouts found.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Duration</th>
                  <th>Calories</th>
                </tr>
              </thead>
              <tbody>
                {workouts.map((workout) => (
                  <tr key={workout.id}>
                    <td><span className="badge bg-primary">{workout.id}</span></td>
                    <td><strong>{workout.name || 'N/A'}</strong></td>
                    <td><span className="badge bg-info">{workout.type || 'N/A'}</span></td>
                    <td>{workout.duration || 'N/A'}</td>
                    <td><span className="badge bg-warning">{workout.calories || 0}</span></td>
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

export default Workouts;
