import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResumeViewer from '../components/specific/ResumeViewer';

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ title: 'Software Engineer', description: 'Experienced in React and Node.js' }),
  })
);

describe('ResumeViewer Component', () => {
  it('displays resume details', async () => {
    render(<ResumeViewer resumeId="1" isAuthenticated={true} />);

    // Use waitFor for async operations
    await waitFor(() => {
      expect(screen.getByText(/Software Engineer/i)).toBeInTheDocument();
      expect(screen.getByText(/Experienced in React and Node.js/i)).toBeInTheDocument();
    });
  });

  // Additional tests...
});
