import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import "../../../stylesheets/Cart.css"

export default function CartItem() {

    return (
        <div className='total_movement'> 
            <div className = 'bag_icon'> 
                <ShoppingBagOutlinedIcon sx={{ fontSize: 75}}/>
            </div>
            <div className='cart_missing_font' style = {{fontWeight: "bold", fontSize: "45px"}}> 
                Shopping Cart Empty
            </div> 
            <div className = "cart_bottom_font">
            Sign in to add items to your cart
            </div>
        </div>
    )
}