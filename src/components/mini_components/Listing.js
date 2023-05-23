function Listing(props) {
    
    return (
        <div> 
            <div> 
                {props.title}
            </div>
            <div> 
                ${props.price}
            </div>
            
        </div>
    );
}

export default Listing;