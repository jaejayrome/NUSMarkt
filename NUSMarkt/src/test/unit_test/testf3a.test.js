import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddReviewDrawer from './AddReviewDrawer';
import { addDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { MemoryRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

jest.mock('firebase/firestore', () => ({
  ...jest.requireActual('firebase/firestore'),
  addDoc: jest.fn(),
  getDoc: jest.fn(),
  updateDoc: jest.fn(),
  arrayUnion: jest.fn(),
}));

jest.mock('react-toastify', () => ({
  toast: jest.fn(),
}));

jest.mock('../../config/firebase', () => ({
  auth: {
    currentUser: {
      displayName: 'Test User',
    },
  },
}));

test('submits a sentiment-based review successfully', async () => {
  const mockListingRef = 'listing-id';
  const mockMessageRef = 'message-id';

  getDoc.mockResolvedValueOnce({
    exists: true,
    ref: mockListingRef,
  });

  addDoc.mockResolvedValueOnce({
    id: mockMessageRef,
  });

  render(
    <MemoryRouter>
      <AddReviewDrawer listingRef={mockListingRef} callback={jest.fn()} />
    </MemoryRouter>
  );

  const reviewTextArea = screen.getByLabelText('Leave Your Review');
  fireEvent.change(reviewTextArea, { target: { value: 'Great product!' } });

  const addButton = screen.getByRole('button', { name: 'Leave Review' });
  fireEvent.click(addButton);

  await waitFor(() => {
    expect(addDoc).toHaveBeenCalledTimes(1);
    expect(addDoc).toHaveBeenCalledWith(expect.anything(), {
      content: 'Great product!',
      listedBy: 'Test User',
      reviewStatus: expect.anything(),
    });

    expect(updateDoc).toHaveBeenCalledTimes(1);
    expect(updateDoc).toHaveBeenCalledWith(mockListingRef, {
      messagesArr: arrayUnion(mockMessageRef),
    });

    expect(toast).toHaveBeenCalledTimes(1);
    expect(toast).toHaveBeenCalledWith('Successfully submitted the review!');
  });
});
