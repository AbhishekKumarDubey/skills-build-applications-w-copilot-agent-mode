import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
        const protocol = process.env.REACT_APP_CODESPACE_NAME ? 'https' : 'http';
        const domain = process.env.REACT_APP_CODESPACE_NAME 
          ? `-8000.app.github.dev` 
          : `:8000`;
        
        const apiUrl = `${protocol}://${codespace}${domain}/api/users/`;
        console.log('Fetching users from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Users data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const usersList = Array.isArray(data) ? data : (data.results || []);
        console.log('Users list:', usersList);
        
        setUsers(usersList);
        setError(null);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.message);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="component-container">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading users...</span>
            </div>
            <p className="mt-3">Loading users...</p>
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
          <h2 className="component-title">👤 Users</h2>
        </div>
        
        {users.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <p>No users found.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Team</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td><span className="badge bg-primary">{user.id}</span></td>
                    <td><strong>{user.username || 'N/A'}</strong></td>
                    <td>{user.email || 'N/A'}</td>
                    <td><span className="badge bg-success">{user.team || 'N/A'}</span></td>
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

export default Users;
