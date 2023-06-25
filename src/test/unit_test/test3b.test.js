import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { addDoc, updateDoc, arrayUnion, collection } from '@firebase/firestore';
import TradeRequestDrawer from './TradeRequestDrawer';

// Mock the Firestore functions
jest.mock('@firebase/firestore', () => ({
  ...jest.requireActual('@firebase/firestore'),
  addDoc: jest.fn(),
  updateDoc: jest.fn(),
  arrayUnion: jest.fn(),
  collection: jest.fn(),
}));

test('submits a trade request and updates the listing', async () => {
  const mockListingReference = { id: 'test-listing-id' };
  const mockTradeRequest = {
    requestTitle: 'Test Request',
    requestDescription: 'Test Description',
    offeredSize: 'M',
    madeBy: 'John Doe',
  };

  addDoc.mockResolvedValueOnce({ id: 'test-request-id' });

  render(
    <MemoryRouter>
      <TradeRequestDrawer originalListingReference={mockListingReference} disabled={false} />
    </MemoryRouter>
  );

  const titleInput = screen.getByLabelText('Trade Request Title');
  const descriptionInput = screen.getByLabelText('Trade Request Description');
  const sizeRadio = screen.getByLabelText('M');
  fireEvent.change(titleInput, { target: { value: mockTradeRequest.requestTitle } });
  fireEvent.change(descriptionInput, { target: { value: mockTradeRequest.requestDescription } });
  fireEvent.click(sizeRadio);

  const submitButton = screen.getByRole('button', { name: 'Submit Request' });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(addDoc).toHaveBeenCalledWith(expect.any(Object), mockTradeRequest);
    expect(updateDoc).toHaveBeenCalledWith(mockListingReference, {
      tradeRequestArr: arrayUnion({ id: 'test-request-id' }),
    });
  });
  expect(screen.getByText('You have successfully sent a trade request!')).toBeInTheDocument();
});
