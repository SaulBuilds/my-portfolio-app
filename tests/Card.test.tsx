import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import Cards from '../components/Card'; // Update this path according to your file structure

describe('Cards Component', () => {
  beforeEach(() => {
    render(<Cards />);
  });

  it('renders the CV and Contact Information card', () => {
    expect(screen.getByText('CV and contact information...')).toBeInTheDocument();
    expect(screen.getByText(/take a look at Saul`s CV and his Work Experience/i)).toBeInTheDocument();
    expect(screen.getByText('Check Out CV')).toBeInTheDocument();
  });

  it('renders the Sauls Portfolio card', () => {
    expect(screen.getByText('Sauls Portfolio')).toBeInTheDocument();
    expect(screen.getByText(/Look at some of sauls work including his public gits/i)).toBeInTheDocument();
    expect(screen.getByText('View Portfolio')).toBeInTheDocument();
  });

  it('renders the Find out more about Saul card', () => {
    expect(screen.getByText('Find out more about Saul...')).toBeInTheDocument();
    expect(screen.getByText(/talk with a large language model created by Saul/i)).toBeInTheDocument();
    expect(screen.getByText('Learn More')).toBeInTheDocument();
  });
});
