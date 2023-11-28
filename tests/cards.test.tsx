import React from 'react';
import { render, screen } from '@testing-library/react';
import { HomeCards } from '../components/Cards'; // Adjust the import path as needed
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
  }));

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      route: '/',
      pathname: '/',
      query: '',
      asPath: '',
      // add other properties that you use from useRouter here
    });
  });
  
describe('HomeCards Component', () => {
  beforeEach(() => {
    render(<HomeCards />);
  });

  it('renders the CV button and responds to a click', () => {
    const cvButton = screen.getByRole('button', { name: /Check Out CV/i });
    expect(cvButton).toBeInTheDocument();

    // If there's an onClick handler, you can test it like this:
    // userEvent.click(cvButton);
    // expect(someMockFunction).toHaveBeenCalled();
  });

  it('renders the View Portfolio button and responds to a click', () => {
    const portfolioButton = screen.getByRole('button', { name: /View Portfolio/i });
    expect(portfolioButton).toBeInTheDocument();

    // Test onClick handler as needed
  });

  it('renders the Talk With Larry’s button and responds to a click', () => {
    const talkButton = screen.getByRole('button', { name: /Talk With Larry`s/i });
    expect(talkButton).toBeInTheDocument();

    // Test onClick handler as needed
  });
});
