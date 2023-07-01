import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CartItemRow from "./CartItemRow";
import {
  getDoc,
  query,
  collection,
  getDocs,
  where,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";

jest.mock("firebase/firestore");
jest.mock("../../../../config/firebase");

describe("CartItemRow", () => {
  const mockCartItem = {
    item: {
      listingRef: "mockListingRef",
      quantity: 2,
      size: "M",
    },
  };

  const mockListingData = {
    listingTitle: "Mock Listing",
    listingPrice: 10.99,
  };

  beforeEach(() => {
    getDoc.mockReturnValueOnce({
      data: () => mockListingData,
      exists: true,
    });
    query.mockReturnValueOnce({
      forEach: jest.fn(async (callback) => {
        await callback({ ref: { update: jest.fn() } });
      }),
    });
    updateDoc.mockResolvedValue();
    arrayRemove.mockResolvedValue();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders cart item correctly", async () => {
    render(
      <MemoryRouter>
        <CartItemRow {...mockCartItem} />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText("Mock Listing")).toBeInTheDocument()
    );
    expect(screen.getByText("10.99")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("M")).toBeInTheDocument();
    expect(screen.getByText("21.98")).toBeInTheDocument();
  });

  test("deletes cart item on button click", async () => {
    render(
      <MemoryRouter>
        <CartItemRow {...mockCartItem} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() =>
      expect(updateDoc).toHaveBeenCalledWith(
        expect.objectContaining({ path: "users" }),
        { cart: arrayRemove(mockCartItem.item) }
      )
    );
  });
});
