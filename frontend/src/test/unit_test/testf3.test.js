import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddReviewDrawer from './AddReviewDrawer';
import { addDoc, deleteDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { MemoryRouter } from 'react-router-dom';
import DeleteReviewTransitionModal from './DeleteReviewTransitionModal';
import { toast } from 'react-toastify';

jest.mock('firebase/firestore', () => ({
  ...jest.requireActual('firebase/firestore'),
  addDoc: jest.fn(),
  getDoc: jest.fn(),
  updateDoc: jest.fn(),
  arrayUnion: jest.fn(),
}));

jest.mock('../../config/firebase', () => ({
  auth: {
    currentUser: {
      displayName: 'Test User',
    },
  },
}));

test('adds a review successfully', async () => {
  const mockListingRef = { path: 'listing-id' };
  const mockMessageRef = { path: 'message-id' };

  getDoc.mockResolvedValueOnce({
    exists: true,
    ref: mockListingRef,
  });

  addDoc.mockResolvedValueOnce({
    id: 'message-id',
  });

  render(
    <MemoryRouter>
      <AddReviewDrawer listingRef="listing-id" callback={jest.fn()} />
    </MemoryRouter>
  );

  const reviewTextArea = screen.getByLabelText('Leave Your Review');
  fireEvent.change(reviewTextArea, { target: { value: 'Test review' } });

  const addButton = screen.getByRole('button', { name: 'Leave Review' });
  fireEvent.click(addButton);

  await waitFor(() => {
    expect(addDoc).toHaveBeenCalledTimes(1);
    expect(addDoc).toHaveBeenCalledWith(expect.anything(), {
      content: 'Test review',
      listedBy: 'Test User',
      reviewStatus: expect.anything(),
    });

    expect(updateDoc).toHaveBeenCalledTimes(1);
    expect(updateDoc).toHaveBeenCalledWith(mockListingRef, {
      messagesArr: arrayUnion({ id: 'message-id' }),
    });
  });
});

jest.mock('firebase/firestore', () => ({
  ...jest.requireActual('firebase/firestore'),
  deleteDoc: jest.fn(),
  updateDoc: jest.fn(),
  arrayRemove: jest.fn(),
}));

jest.mock('react-toastify', () => ({
  toast: jest.fn(),
}));

test('deletes the review successfully', async () => {
  const mockListingRef = { path: 'listing-id' };
  const mockMessageRef = { path: 'message-id' };

  render(
    <MemoryRouter>
      <DeleteReviewTransitionModal listingRef={mockListingRef} messageRef={mockMessageRef} />
    </MemoryRouter>
  );

  const deleteButton = screen.getByRole('button');
  fireEvent.click(deleteButton);

  await waitFor(() => {
    expect(updateDoc).toHaveBeenCalledTimes(1);
    expect(updateDoc).toHaveBeenCalledWith(mockListingRef, {
      messagesArr: arrayRemove(mockMessageRef),
    });

    expect(deleteDoc).toHaveBeenCalledTimes(1);
    expect(deleteDoc).toHaveBeenCalledWith(mockMessageRef);

    expect(toast).toHaveBeenCalledTimes(1);
    expect(toast).toHaveBeenCalledWith('Message has been successfully deleted!');
  });
});

