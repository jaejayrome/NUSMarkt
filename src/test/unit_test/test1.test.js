import { render, screen} from '@testing-library/react';
import Home from '../../Home.js';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import MasonryImageList from '../../components/compiledData/MasonryImageList.js';
import ListingReader from '../../config/ListingReader.js';
import CartTransitionModal from '../../components/mini_components/CartTransitionModal.js';

describe("BUY: User Viewing Listings", () => {
    const mockedListings = [
        { id: 1, listingTitle: 'Listing 1' },
        { id: 2, listingTitle: 'Listing 2' },
        { id: 3, listingTitle: 'Listing 3' },
    ]

  it('useEffect() called when mounted', async () => {
        const useEffectSpy = jest.spyOn(React, 'useEffect');
        render(<MemoryRouter> <Home/> </MemoryRouter>);
        expect(useEffectSpy).toHaveBeenCalledWith(expect.any(Function), []);
        useEffectSpy.mockRestore();

  });

  it('listings state passed to child component when mounted', async () => {
    const {getByTestId } = render(<MemoryRouter><Home listings = {mockedListings}/> </MemoryRouter>)
    const masonryImageListComponent = getByTestId('masonry-image-list')
    expect(masonryImageListComponent).toBeInTheDocument();
    
    mockedListings.forEach((listing) => {
        const listingTitleElements = screen.queryAllByText(
          new RegExp(listing.listingTitle, 'i') 
        );
        expect(listingTitleElements).not.toBeUndefined();
  })
})

  })

  describe('BUY: Carting of Items', () => {
    const mockUid = 'user-id';
    const mockListingRef = 'listing-ref';
    const mockToast = jest.fn();
    jest.mock('@firebase/firestore');

    it('test navigation to individual listings', async () => {
        const history = createMemoryHistory();
        history.push('/');
        render(
            <MemoryRouter history={history}>
              <MasonryImageList/>
            </MemoryRouter>
          );
        screen.getByTestId('linkToIndiv').click()
        mockedListings.forEach((listing) => {
            expect(screen.getByText(listing.listingTitle))
        })
      })

    it('check indiv listing appropriate fields', async () => {
        render(<MemoryRouter> <ListingReader /> </MemoryRouter>)
        expect(screen.getByLabelText('Product Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Product Price')).toBeInTheDocument();
        expect(screen.getByLabelText('Product Description')).toBeInTheDocument();
    })

    it('check viewing of modal', async () => {
        render(<MemoryRouter> <CartTransitionModal uid="user-id" listingRef="listing-ref"/> </MemoryRouter>)
        expect(screen.queryByText('Select Your Quantity & Size')).not.toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: 'Add To Cart' }));
        expect(screen.getByText('Select Your Quantity & Size')).toBeInTheDocument();
    })

    it('check that user can add listing to cart', async () => {

        const mockToast = jest.fn();
        const mockGetDocs = jest.fn();
        const mockUpdateDoc = jest.fn();

        toast.mockImplementation(mockToast);

        const mockQuerySnapshot = {
            forEach: jest.fn(),
          };
          const mockUserRef = {
            ref: 'user-ref',
          };

        collection.mockReturnValueOnce(mockUserRef);
        query.mockReturnValueOnce(mockQuerySnapshot);
        getDocs.mockResolvedValueOnce(mockQuerySnapshot);
        updateDoc.mockResolvedValueOnce();
    
        jest.mock('react-toastify', () => ({
            toast: mockToast,
          }));
          render(
            <MemoryRouter>
              <CartTransitionModal uid={mockUid} listingRef={mockListingRef} />
            </MemoryRouter>
          );
          fireEvent.click(screen.getByRole('button', { name: 'Add To Cart' }))

            expect(collection).toHaveBeenCalledWith(db, 'users');
            expect(query).toHaveBeenCalledWith(mockUserRef, where('uid', '==', mockUid));
            expect(getDocs).toHaveBeenCalledWith(mockQuerySnapshot);
            expect(updateDoc).toHaveBeenCalledWith(mockUserRef, {
            cart: arrayUnion({
                quantity: 1,
                listingRef: mockListingRef,
                size: 'M',
            }),
            });

          expect(mockToast).toHaveBeenCalledWith('You have successfully added the item to cart!');
    })


  })


