import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DeleteTLTransitionModal from './DeleteTLTransitionModal';
import { deleteDoc, getDocs } from '@firebase/firestore';

jest.mock('@firebase/firestore', () => ({
  ...jest.requireActual('@firebase/firestore'),
  deleteDoc: jest.fn(),
  getDocs: jest.fn(),
}));

test('deletes the trade listing and associated trade requests', async () => {
  const mockTradeListingRef = { path: 'trade-listing-id' };
  const mockTradeRequestRefs = [
    { path: 'trade-request-id-1' },
    { path: 'trade-request-id-2' },
  ];

  getDocs.mockResolvedValueOnce({
    forEach: (callback) => {
      callback({ ref: mockTradeRequestRefs[0] });
      callback({ ref: mockTradeRequestRefs[1] });
    },
  });

  render(
    <MemoryRouter>
      <DeleteTLTransitionModal tradeListing={{ tradeListingRef: mockTradeListingRef, tradeRequests: mockTradeRequestRefs }} />
    </MemoryRouter>
  );

  const deleteButton = screen.getByRole('button');
  fireEvent.click(deleteButton);

  await waitFor(() => {
    expect(deleteDoc).toHaveBeenCalledTimes(3);
    expect(deleteDoc).toHaveBeenCalledWith(mockTradeListingRef);
    expect(deleteDoc).toHaveBeenCalledWith(mockTradeRequestRefs[0]);
    expect(deleteDoc).toHaveBeenCalledWith(mockTradeRequestRefs[1]);
  });
});
