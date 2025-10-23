
import 'whatwg-fetch';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom';
import fetch from 'node-fetch';
import React from 'react';
import FetchData from '../src/DataFetcher';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

test('Testing table headers', async () => {
  await act(async () => {
    render(<FetchData />);
  });

  const titleHeader = screen.getByText('Title');
  const actionHeader = screen.getByText('Action');

  expect(titleHeader).toBeInTheDocument();
  expect(actionHeader).toBeInTheDocument();
});
