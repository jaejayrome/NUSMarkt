// testing the SELL pipeline 
import Sell_addListing from "../../components/pages/sell/Sell_addListing";
import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";

// creation of a mock firebase user
jest.mock("../../config/firebase.js", () => ({
    auth: {
      currentUser: {
        displayName: "John Doe",
        uid: "user123",
      },
    },
  }));

describe("SELL:Add Listing", () => {

    it("useEffect() hook is being called when mounted", async () => {
        const useEffectSpy = jest.spyOn(React, 'useEffect');
        render(<MemoryRouter> <Sell_addListing/> </MemoryRouter>);
        expect(useEffectSpy).toHaveBeenCalledWith(expect.any(Function), []);
        useEffectSpy.mockRestore();
    })

    it("fields of the form is being seen", () => {
        render(<MemoryRouter> <Sell_addListing /> </MemoryRouter>)
        expect(screen.getByLabelText('Product Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Product Price')).toBeInTheDocument();
        expect(screen.getByLabelText('Product Description')).toBeInTheDocument();
    })


})
