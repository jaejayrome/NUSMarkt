import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { query, where, collection, getDocs } from '@firebase/firestore';
import db from '../../../config/firebase';
import Trade_Outgoing from './Trade_Outgoing';

jest.mock('@firebase/firestore', () => ({
  ...jest.requireActual('@firebase/firestore'),
  query: jest.fn(),
  where: jest.fn(),
  collection: jest.fn(),
  getDocs: jest.fn(),
}));

test('displays the sent trade requests correctly', async () => {
  const mockTradeRequest = {
    requestTitle: 'Test Request',
    requestDescription: 'Test Description',
    offeredSize: 'M',
    madeBy: 'John Doe',
    ref: { id: 'test-request-id' },
  };
  const mockQuerySnapshot = {
    empty: false,
    forEach: jest.fn((callback) => callback(mockTradeRequest)),
  };
  query.mockReturnValueOnce(mockQuerySnapshot);

  render(
    <MemoryRouter>
      <Trade_Outgoing />
    </MemoryRouter>
  );

  expect(query).toHaveBeenCalledWith(collection(db, 'tradeRequest'), where('madeBy', '==', 'John Doe'));
  expect(getDocs).toHaveBeenCalledWith(mockQuerySnapshot);

  expect(screen.getByText(`Request #1 ${mockTradeRequest.requestTitle}`)).toBeInTheDocument();
  expect(screen.getByText(`Request Description: ${mockTradeRequest.requestDescription}`)).toBeInTheDocument();
  expect(screen.getByText(`Offered Size : ${mockTradeRequest.offeredSize}`)).toBeInTheDocument();
  expect(screen.getByText(`Sent By: ${mockTradeRequest.madeBy}`)).toBeInTheDocument();
});

test('displays lock icon when there are no sent trade requests', async () => {
  const mockQuerySnapshot = {
    empty: true,
  };
  query.mockReturnValueOnce(mockQuerySnapshot);

  render(
    <MemoryRouter>
      <Trade_Outgoing />
    </MemoryRouter>
  );

  expect(screen.getByText('You have not sent any trade requests so far')).toBeInTheDocument();
});
