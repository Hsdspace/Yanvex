import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import NotFoundPage from '../pages/NotFoundPage.jsx';

describe('NotFoundPage', () => {
  it('renders the 404 message and recovery actions', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <NotFoundPage />
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByRole('heading', { name: /page not found/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /return home/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /contact support/i })).toHaveAttribute(
      'href',
      'mailto:hello@yanvex.ai'
    );
  });
});
