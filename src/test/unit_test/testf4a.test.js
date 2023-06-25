import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CartItem from './CartItem';

test('calculates the total cost correctly', () => {
  const mockCart = [
    {
      listingRef: {
        data: () => ({ listingPrice: 10 }),
      },
      quantity: 2,
    },
    {
      listingRef: {
        data: () => ({ listingPrice: 5 }),
      },
      quantity: 3,
    },
  ];

  render(
  <MemoryRouter>
  <CartItem  cart={mockCart} />
  </MemoryRouter>);

  const totalCostElement = screen.getByText(/Total Cost:/);
  expect(totalCostElement).toHaveTextContent('Total Cost: $40.00');
});
