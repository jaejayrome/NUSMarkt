import './Home.css';
import Navbar from './components/compiledData/Navbar.js'
import MasonryImageList from './components/compiledData/MasonryImageList';

function Home() {

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
        <Navbar />
        <div className = 'masonry'> 
        <MasonryImageList imagesList = {imagesList}/>
        </div>
    </div> 
    );

    
}

export default Home;

