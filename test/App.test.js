// kopierat text från jsramverk.se. Ska tas bbort när testning klar/påbörjad. Inlagd för mitt eget minne

// Testerna för en komponent till exempel App.js skrivs i filen App.test.js.

// Ett test för att kolla om en rubrik finns i den renderade appen görs på följande sätt.

// testverktyget i react https://legacy.reactjs.org/docs/testing.html

// Testing recipes i react https://legacy.reactjs.org/docs/testing-recipes.html

// Nedan 'r exempel från jsramverk.se och inte en test fäår våran kod.
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders ', () => {
  const { container } = render(<App />);

  expect(screen.getByText(/folinodocs/i)).toBeInTheDocument();
});