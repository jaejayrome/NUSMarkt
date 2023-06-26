import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { collection, deleteDoc, getDocs, updateDoc } from '@firebase/firestore';
import db from '../../config/firebase';
import DeleteTRTransitionModal from './DeleteTRTransitionModal';

// Mock the Firestore functions
jest.mock('@firebase/firestore', () => ({
  ...jest.requireActual('@firebase/firestore'),
  collection: jest.fn(),
  deleteDoc: jest.fn(),
  getDocs: jest.fn(),
  updateDoc: jest.fn(),
}));

test('deletes the trade request and updates trade listing', async () => {
  const mockTradeRequestRef = {
    path: 'trade-request-path',
  };
  const mockTradeListingRef = {
    ref: 'trade-listing-ref',
  };
  const mockTradeRequestSnapshot = {
    ref: mockTradeRequestRef,
  };
  const mockTradeListingSnapshot = {
    data: jest.fn(() => ({ tradeRequestArr: [mockTradeRequestRef] })),
    ref: mockTradeListingRef,
  };
  collection.mockReturnValueOnce(mockTradeListingSnapshot);
  getDocs.mockResolvedValueOnce([mockTradeListingSnapshot]);

  render(
    <MemoryRouter initialEntries={['/TRADE/MARKETPLACE']}>
      <Route path="/TRADE/MARKETPLACE">
        <DeleteTRTransitionModal refer={mockTradeRequestRef} />
      </Route>
      <Route path="/TRADE/INTERMEDIATE">Intermediate Page</Route>
    </MemoryRouter>
  );

  // Click the delete button to open the modal
  const deleteButton = screen.getByRole('button', { name: 'Delete' });
  fireEvent.click(deleteButton);

  // Click the confirm delete button
  const confirmDeleteButton = screen.getByRole('button', { name: 'Confirm Delete' });
  fireEvent.click(confirmDeleteButton);

  expect(deleteDoc).toHaveBeenCalledWith(mockTradeRequestRef);
  expect(collection).toHaveBeenCalledWith(db, 'tradeListing');
  expect(getDocs).toHaveBeenCalledWith(mockTradeListingSnapshot);
  expect(updateDoc).toHaveBeenCalledWith(mockTradeListingRef, { tradeRequestArr: [] });

  // Ensure that the user is redirected to the intermediate page
  expect(screen.getByText('Intermediate Page')).toBeInTheDocument();
});
