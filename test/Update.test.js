
import 'whatwg-fetch';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom';
import React from 'react';
import Edit from '../src/components/Update';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ title: 'mock title', content: 'mock content' }),
  })
);

test('Testing input fields', async () => {
  render(
    <MemoryRouter initialEntries={['/add']}>
      <Edit />
    </MemoryRouter>
  );

  const titleInput = await screen.findByDisplayValue('mock title');
  const contentInput = await screen.findByDisplayValue('mock content');

  expect(titleInput).toBeInTheDocument();
  expect(contentInput).toBeInTheDocument();
});

test('Testing updating input fields', async () => {
  render(
    <MemoryRouter initialEntries={['/add']}>
      <Edit />
    </MemoryRouter>
  );

  const titleInput = await screen.findByDisplayValue('mock title');
  const contentInput = await screen.findByDisplayValue('mock content');

  fireEvent.change(titleInput, { target: { value: 'new title' } });
  fireEvent.change(contentInput, { target: { value: 'new content' } });

  expect(titleInput).toHaveDisplayValue('new title');
  expect(contentInput).toHaveDisplayValue('new content');
});

