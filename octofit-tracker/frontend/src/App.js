import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Menu */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              OctoFit Tracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    Leaderboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    Workouts
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container-main">
          <Routes>
            <Route
              path="/"
              element={
                <div className="container mt-5">
                  <div className="component-container">
                    <div className="component-header">
                      <h1 className="component-title">Welcome to OctoFit Tracker</h1>
                    </div>
                    <p className="lead">Select a section from the navigation menu to get started.</p>
                    <div className="row mt-4">
                      <div className="col-md-6 mb-3">
                        <div className="card h-100">
                          <div className="card-body text-center">
                            <h5 className="card-title">🏃 Activities</h5>
                            <p className="card-text">Track and view your fitness activities.</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="card h-100">
                          <div className="card-body text-center">
                            <h5 className="card-title">🏆 Leaderboard</h5>
                            <p className="card-text">See where you rank among other users.</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <div className="card h-100">
                          <div className="card-body text-center">
                            <h5 className="card-title">👥 Teams</h5>
                            <p className="card-text">Manage and view team information.</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <div className="card h-100">
                          <div className="card-body text-center">
                            <h5 className="card-title">👤 Users</h5>
                            <p className="card-text">Browse user profiles and details.</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <div className="card h-100">
                          <div className="card-body text-center">
                            <h5 className="card-title">💪 Workouts</h5>
                            <p className="card-text">View available workouts and recommendations.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
