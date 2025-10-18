
import 'whatwg-fetch';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom';
import React from 'react';
import App from '../src/components/App';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

test('renders Add component at "/add" route', () => {
  render(
    <MemoryRouter initialEntries={['/add']}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/add/i)).toBeInTheDocument();
});

