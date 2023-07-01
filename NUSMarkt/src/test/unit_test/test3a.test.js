import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { getDocs, collection } from '@firebase/firestore';
import Trade_Marketplace from './Trade_Marketplace';

jest.mock('@firebase/firestore', () => ({
  ...jest.requireActual('@firebase/firestore'),
  getDocs: jest.fn(),
}));

test('displays fetched trade listings correctly', async () => {
  const mockListings = [
    { id: 'test-listing-1', title: 'Listing 1' },
    { id: 'test-listing-2', title: 'Listing 2' },
  ];

  const mockQuerySnapshot = {
    docs: mockListings.map((listing) => ({
      id: listing.id,
      data: () => listing,
      ref: { id: listing.id },
    })),
  };

  getDocs.mockResolvedValueOnce(mockQuerySnapshot);

  render(
    <MemoryRouter>
      <Trade_Marketplace />
    </MemoryRouter>
  );

  
  await screen.findAllByRole('heading');

  
  mockListings.forEach((listing) => {
    const listingElement = screen.getByText(listing.title);
    expect(listingElement).toBeInTheDocument();
  });
});
