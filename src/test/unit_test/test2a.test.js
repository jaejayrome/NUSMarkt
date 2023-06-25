import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../config/firebase.js';
import db from '../../../config/firebase.js';
import Sell_Listings from './Sell_Listings';
import { collection, getDocs, query, where } from '@firebase/firestore';

jest.mock('firebase/auth', () => ({
  onAuthStateChanged: jest.fn(),
  auth: {
    currentUser: {
      uid: 'test-uid',
    },
  },
}));

jest.mock('@firebase/firestore', () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
}));

describe('Sell_Listings', () => {
  test('renders the component without errors', () => {
    render(
      <MemoryRouter>
        <Sell_Listings />
      </MemoryRouter>
    );

    expect(screen.getByText('Your Listings')).toBeInTheDocument();
  });

  test('displays the fetched listings correctly', async () => {
    const mockListing = {
      id: 'test-listing-id',
      title: 'Test Listing',
    };
    const mockQuerySnapshot = {
      forEach: jest.fn((callback) => callback({ data: () => mockListing })),
    };
    getDocs.mockResolvedValueOnce(mockQuerySnapshot);

    render(
      <MemoryRouter>
        <Sell_Listings />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(mockListing.title)).toBeInTheDocument();
    });
  });

  test('updates the listing array after deletion', async () => {
    const mockListing = {
      id: 'test-listing-id',
      title: 'Test Listing',
    };
    const mockQuerySnapshot = {
      forEach: jest.fn((callback) => callback({ data: () => mockListing })),
    };
    getDocs.mockResolvedValueOnce(mockQuerySnapshot);

    render(
      <MemoryRouter>
        <Sell_Listings />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(mockListing.title)).toBeInTheDocument();
    });

    // Simulate deletion
    const deleteButton = screen.getByRole('button', { name: 'Delete' });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockQuerySnapshot.forEach).toHaveBeenCalledTimes(2);
      expect(screen.queryByText(mockListing.title)).toBeNull();
    });
  });
});
