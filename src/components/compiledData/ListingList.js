import Listing from "../mini_components/Listing.js";



function ListingList() {
    const listingArray = [
        {title: "CAPT – Dragon House Design A", 
         price: "12.99",
        }, 
        {title: "CAPT – Dragon House Design B",
        price: "8.55"
        }, 
        {title: "CAPT – Dragon House Design C", 
        price: "7.65"
        }
    ];
    
    return (
        <div> 
            {listingArray.map(
                listing => (
                    <Listing title = {listing.title} price = {listing.price}/>
                )
            )}
        </div>
    );
}

export default ListingList;