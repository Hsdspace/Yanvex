import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../admin/routes/ProtectedRoute.jsx';
import AuthContext from '../admin/context/AuthContext.jsx';

const renderProtectedRoute = (authValue) =>
  render(
    <AuthContext.Provider value={authValue}>
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <div>Secure dashboard</div>
              </ProtectedRoute>
            }
          />
          <Route path="/admin/login" element={<div>Login screen</div>} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );

describe('ProtectedRoute', () => {
  it('renders a loading state while auth is resolving', () => {
    renderProtectedRoute({ user: null, loading: true });
    expect(screen.getByText(/verifying access/i)).toBeInTheDocument();
  });

  it('redirects anonymous users to login', () => {
    renderProtectedRoute({ user: null, loading: false });
    expect(screen.getByText(/login screen/i)).toBeInTheDocument();
  });

  it('renders children for authenticated users', () => {
    renderProtectedRoute({ user: { id: '1', role: 'admin' }, loading: false });
    expect(screen.getByText(/secure dashboard/i)).toBeInTheDocument();
  });
});
