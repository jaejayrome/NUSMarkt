import './Home.css';
import Navbar from './components/compiledData/Navbar.js'
import AccountCircle from './components/mini_components/AccountCircle.js';
import CartIcon from './components/mini_components/CartIcon';
import homePageIcon from './images/logo.jpg';
import MasonryImageList from './components/compiledData/MasonryImageList';
import {Link} from 'react-router-dom';

function Home() {

    const actionArr = [
        {title: 'BUY'},
        {title: 'SELL'},
        {title: 'TRADE'}
    ]


    const imagesList = [
        {id: 1, src: "/images/listingsrc/capt_dragon_a_front.png", title: "capt_dragon_a_front"},
        {id: 2, src: "/images/listingsrc/capt_dragon_a_back.png", title: "capt_dragon_a_back"}, 
        {id: 3, src: "/images/listingsrc/capt_kamal.png", title: "capt_kamal_front"},
        {id: 4, src: "/images/listingsrc/capt_kamal.png", title: "capt_kamal_front"},
        {id: 5, src: "/images/listingsrc/capt_kamal.png", title: "capt_kamal_front"},
        {id: 6, src: "/images/listingsrc/capt_kamal.png", title: "capt_kamal_front"}, 
        {id: 7, src: "/images/listingsrc/capt_dragon_a_back.png", title: "capt_dragon_a_back"}, 
        {id: 8, src: "/images/listingsrc/capt_dragon_a_back.png", title: "capt_dragon_a_back"}, 
        {id: 9, src: "/images/listingsrc/capt_dragon_a_back.png", title: "capt_dragon_a_back"}
    ]
      
    return (
    <div>
        <header>
            <Link to = "/" reloadDocument>
                <img src = {homePageIcon} alt = "NUS MARKT" className= 'logo_button'/>
            </Link>

            <Navbar actionArr = {actionArr}> </Navbar>  
            <AccountCircle />
            <CartIcon/>
        </header>  

        <div className = 'masonry'> 
        <MasonryImageList imagesList = {imagesList}/>
        </div>
    </div> 
    );
}

export default Home;

