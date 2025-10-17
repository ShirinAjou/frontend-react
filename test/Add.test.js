
import 'whatwg-fetch';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import Add from '../src/components/Add';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

test('updates title and content inputs', () => {
  render(
    <MemoryRouter>
      <Add />
    </MemoryRouter>
  );

  const titleInput = screen.getByLabelText(/titel/i);
  const contentInput = screen.getByLabelText(/innehåll/i);

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

  fireEvent.change(screen.getByLabelText("Titel"), { target: { value: "Testar titel-input" } });

  const form = screen.getByTestId('add-form');
  fireEvent.submit(form);
});