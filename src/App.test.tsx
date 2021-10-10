/**
 * @jest-environment jsdom
 */

/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders simple test', () => {
  render(<App />);
  const linkElement = screen.getByText(/Bill/i);
  expect(linkElement).toBeInTheDocument();
  expect(document.querySelector('button')).toBeDisabled();
});
