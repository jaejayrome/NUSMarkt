import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Sell_addListing from './Sell_addListing';
import Sell_addListing2 from './Sell_addListing2';
import Sell_addListing3 from './Sell_addListing3';
import { addDoc, collection, updateDoc } from '@firebase/firestore';
import { auth } from '../../../config/firebase';
import { MemoryRouter, useNavigate } from 'react-router-dom';

jest.mock('@firebase/firestore', () => ({
  ...jest.requireActual('@firebase/firestore'),
  addDoc: jest.fn(),
  collection: jest.fn(),
  updateDoc: jest.fn(),
}));

jest.mock('../../../config/firebase', () => ({
  auth: {
    currentUser: {
      displayName: 'John Doe',
      uid: 'test-uid',
    },
  },
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Sell_addListing', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('successfully navigates to the next step and updates user bank account information', async () => {
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);

    render(
      <MemoryRouter>
        <Sell_addListing />
      </MemoryRouter>
    );

    const listingTitleInput = screen.getByLabelText('Product Name');
    const listingPriceInput = screen.getByLabelText('Product Price');
    const productDescriptionInput = screen.getByLabelText('Product Description');
    const submitButton = screen.getByRole('button', { name: 'Confirm Size Guide' });
    const bankAccountNumberInput = screen.getByLabelText('Bank Account Number');
    const bankSelect = screen.getByRole('combobox', { name: 'Bank' });

    const userInput = {
      listingTitle: 'Test Listing',
      listingPrice: '100',
      productDescription: 'Test Description',
      bankAccountNumber: '1234567890',
      bank: 'POSB/DBS',
    };

    fireEvent.change(listingTitleInput, { target: { value: userInput.listingTitle } });
    fireEvent.change(listingPriceInput, { target: { value: userInput.listingPrice } });
    fireEvent.change(productDescriptionInput, { target: { value: userInput.productDescription } });
    fireEvent.click(submitButton);
    fireEvent.change(bankAccountNumberInput, { target: { value: userInput.bankAccountNumber } });
    fireEvent.change(bankSelect, { target: { value: userInput.bank } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledTimes(1);
      expect(navigateMock).toHaveBeenCalledWith('STEP2', { state: expect.any(Object) });
      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(updateDoc).toHaveBeenCalledTimes(1);
      expect(updateDoc).toHaveBeenCalledWith(expect.any(Object), {
        bankAccount: {
          bankAccountNumber: userInput.bankAccountNumber,
          bank: userInput.bank,
        },
      });
    });

    expect(screen.queryByText('Loading...')).toBeNull();
  });

  test('displays bank account details input fields when bank details are not uploaded', () => {
    render(
      <MemoryRouter>
        <Sell_addListing />
      </MemoryRouter>
    );

    const bankAccountNumberInput = screen.getByLabelText('Bank Account Number');
    const bankSelect = screen.getByRole('combobox', { name: 'Bank' });

    expect(bankAccountNumberInput).toBeInTheDocument();
    expect(bankSelect).toBeInTheDocument();
  });
});

describe('Sell_addListing2', () => {
  test('uploads image successfully', async () => {
    render(
      <MemoryRouter>
        <Sell_addListing2 />
      </MemoryRouter>
    );

    const file = new File(['image content'], 'test-image.jpg', { type: 'image/jpeg' });
    const uploadBytesMock = jest.fn().mockResolvedValueOnce();
    const getDownloadURLMock = jest.fn().mockResolvedValueOnce('https://example.com/image.jpg');
    const storageRefMock = {
      storage: jest.fn().mockReturnValue({
        ref: jest.fn().mockReturnValue({
          child: jest.fn().mockReturnValue({
            put: uploadBytesMock,
            getDownloadURL: getDownloadURLMock,
          }),
        }),
      }),
    };

    Object.defineProperty(global, 'firebase', {
      value: {
        storage: jest.fn().mockReturnValue(storageRefMock),
      },
      writable: true,
    });

    const fileInput = screen.getByLabelText('upload-image');
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(uploadBytesMock).toHaveBeenCalledWith(expect.any(Object), file);
      expect(getDownloadURLMock).toHaveBeenCalledWith(expect.any(Object));
      expect(screen.getByAltText('Image Upload Fail')).toHaveAttribute('src', 'https://example.com/image.jpg');
    });
  });

  test('allows choosing another image', () => {
    render(
      <MemoryRouter>
        <Sell_addListing2 />
      </MemoryRouter>
    );

    const file = new File(['image content'], 'test-image.jpg', { type: 'image/jpeg' });
    const fileInput = screen.getByLabelText('upload-image');
    fireEvent.change(fileInput, { target: { files: [file] } });

    const chooseAnotherImageButton = screen.getByRole('button', { name: 'Choose Another Image' });
    expect(chooseAnotherImageButton).toBeInTheDocument();

    fireEvent.click(chooseAnotherImageButton);

    expect(fileInput).toHaveValue('');
  });
});

describe('Sell_addListing3', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('uploads a new listing on button click', async () => {
    render(
      <MemoryRouter>
        <Sell_addListing3 />
      </MemoryRouter>
    );

    const uploadListingButton = screen.getByRole('button', { name: 'Upload Listing' });
    addDoc.mockResolvedValueOnce({ id: 'test-listing-id' });

    fireEvent.click(uploadListingButton);

    await waitFor(() => {
      expect(addDoc).toHaveBeenCalledWith(collection(expect.any(Object), 'listing'), expect.any(Object));
    });
  });
});
