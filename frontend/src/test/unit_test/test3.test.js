import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { addDoc } from '@firebase/firestore';
import { auth } from '../../../config/firebase';
import Trade_Request from './Trade_Request';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('@firebase/firestore', () => ({
  ...jest.requireActual('@firebase/firestore'),
  addDoc: jest.fn(),
}));

test('confirms trade request title', () => {
  render(
    <MemoryRouter>
      <Trade_Request />
    </MemoryRouter>
  );

  const titleInput = screen.getByLabelText('Enter here');
  const confirmButton = screen.getByRole('button', { name: 'Confirm Input' });

  fireEvent.change(titleInput, { target: { value: 'Trade Request Title' } });
  fireEvent.click(confirmButton);

  expect(screen.getByText('Select Your Size:')).toBeInTheDocument();
});

test('selects sizes in trade request', () => {
  render(
    <MemoryRouter>
      <Trade_Request />
    </MemoryRouter>
  );

  const sizeButtons = screen.getAllByRole('button', { name: /Size /i });
  const confirmButton = screen.getByRole('button', { name: 'Confirm Input' });

  fireEvent.click(sizeButtons[0]);
  fireEvent.click(sizeButtons[1]);
  fireEvent.click(confirmButton);

  expect(screen.getByText('Trade Description')).toBeInTheDocument();
});

test('submits trade request', async () => {
  const navigateMock = jest.fn();
  useNavigate.mockReturnValue(navigateMock);

  render(
    <MemoryRouter>
      <Trade_Request />
    </MemoryRouter>
  );

  const descriptionInput = screen.getByLabelText('Trade Description');
  const confirmButton = screen.getByRole('button', { name: 'Confirm Input' });
  const uploadButton = screen.getByRole('button', { name: 'Upload Listing' });

  fireEvent.change(descriptionInput, { target: { value: 'Trade Request Description' } });
  fireEvent.click(confirmButton);

  await waitFor(() => {
    fireEvent.click(uploadButton);
    expect(addDoc).toHaveBeenCalledTimes(1);
    expect(addDoc).toHaveBeenCalledWith(expect.any(Object), expect.any(Object));
    expect(navigateMock).toHaveBeenCalledWith('/TRADE/MARKETPLACE');
  });
});
