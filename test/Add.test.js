
import 'whatwg-fetch';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import Add from '../src/components/Add';

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

test('updates title and content inputs', () => {
  render(
    <MemoryRouter>
      <Add />
    </MemoryRouter>
  );

  const titleInput = screen.getByLabelText(/title/i);
  const contentInput = screen.getByLabelText(/content/i);

  fireEvent.change(titleInput, { target: { value: 'New Title' } });
  fireEvent.change(contentInput, { target: { value: 'New Content' } });

  expect(titleInput.value).toBe('New Title');
  expect(contentInput.value).toBe('New Content');
});

test('submits the form with input value', () => {
  render(
    <MemoryRouter>
      <Add />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText("Title"), { target: { value: "Testar titel-input" } });

  const form = screen.getByTestId('add-form');
  fireEvent.submit(form);
});

test('submit the form an navigate to homepage', () => {
  render(
    <MemoryRouter>
      <Add />
    </MemoryRouter>
  );

  const titleInput = screen.getByLabelText(/title/i);
  const contentInput = screen.getByLabelText(/content/i);

  fireEvent.change(titleInput, { target: { value: 'New Title' } });
  fireEvent.change(contentInput, { target: { value: 'New Content' } });

  const form = screen.getByTestId('add-form');
  fireEvent.submit(form);
  
  expect(mockNavigate).toHaveBeenCalledWith('/')
});
