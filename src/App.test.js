import { render, screen } from '@testing-library/react';
import App from './App';

test('renders character li', async () => {
  render(<App />);
  const liElement = await screen.getByText(/Luke Skywalker/i);
  expect(liElement).toBeInTheDocument();
});
