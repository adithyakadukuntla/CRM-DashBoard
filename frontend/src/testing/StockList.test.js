import { render, screen } from '@testing-library/react';
import StockList from '../components/stocks/StockList';

test('renders the dashboard title', () => {
  render(<StockList />);
  const titleElement = screen.getByText(/stocks/i);
  expect(titleElement).toBeInTheDocument();
});
