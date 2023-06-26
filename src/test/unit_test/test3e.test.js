import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { query, where, collection, getDocs, getDoc } from '@firebase/firestore';
import Trade_Inbox from './Trade_Inbox';

jest.mock('@firebase/firestore', () => ({
  ...jest.requireActual('@firebase/firestore'),
  query: jest.fn(),
  where: jest.fn(),
  collection: jest.fn(),
  getDocs: jest.fn(),
  getDoc: jest.fn(),
}));

test('displays trade listings with incoming requests', async () => {
  const mockTradeListing1 = {
    tradeListingTitle: 'Trade Listing 1',
    tradeListingRef: 'trade-listing-ref-1',
    tradeRequests: [
      {
        requestTitle: 'Request 1',
        madeBy: 'User 1',
      },
      {
        requestTitle: 'Request 2',
        madeBy: 'User 2',
      },
    ],
  };
  const mockTradeListing2 = {
    tradeListingTitle: 'Trade Listing 2',
    tradeListingRef: 'trade-listing-ref-2',
    tradeRequests: [
      {
        requestTitle: 'Request 3',
        madeBy: 'User 3',
      },
    ],
  };
  const mockQuerySnapshot = {
    docs: [
      {
        data: jest.fn(() => mockTradeListing1),
      },
      {
        data: jest.fn(() => mockTradeListing2),
      },
    ],
  };
  query.mockReturnValueOnce(mockQuerySnapshot);
  where.mockReturnValueOnce(mockQuerySnapshot);
  collection.mockReturnValueOnce(mockQuerySnapshot);
  getDocs.mockResolvedValueOnce(mockQuerySnapshot);
  getDoc.mockResolvedValueOnce({ data: jest.fn(() => mockTradeListing1.tradeRequests[0]) });

  render(
    <MemoryRouter>
      <Trade_Inbox />
    </MemoryRouter>
  );

  // Verify that trade listings are displayed
  expect(screen.getByText(mockTradeListing1.tradeListingTitle)).toBeInTheDocument();
  expect(screen.getByText(mockTradeListing2.tradeListingTitle)).toBeInTheDocument();

  // Verify that incoming requests are displayed for each trade listing
  expect(screen.getByText(`Requests Received (${mockTradeListing1.tradeRequests.length})`)).toBeInTheDocument();
  expect(screen.getByText(`Request #1 - ${mockTradeListing1.tradeRequests[0].requestTitle}`)).toBeInTheDocument();
  expect(screen.getByText(`Request #2 - ${mockTradeListing1.tradeRequests[1].requestTitle}`)).toBeInTheDocument();
  expect(screen.getByText(`Requests Received (${mockTradeListing2.tradeRequests.length})`)).toBeInTheDocument();
  expect(screen.getByText(`Request #1 - ${mockTradeListing2.tradeRequests[0].requestTitle}`)).toBeInTheDocument();
});


test('displays locked feature when there are no incoming requests', async () => {
    const mockQuerySnapshot = { docs: [] };
    query.mockReturnValueOnce(mockQuerySnapshot);
    where.mockReturnValueOnce(mockQuerySnapshot);
    collection.mockReturnValueOnce(mockQuerySnapshot);
    getDocs.mockResolvedValueOnce(mockQuerySnapshot);
  
    render(
      <MemoryRouter>
        <Trade_Inbox />
      </MemoryRouter>
    );
  
    // Verify that the locked feature is displayed
    expect(screen.getByText('Feature Locked')).toBeInTheDocument();
  });
  