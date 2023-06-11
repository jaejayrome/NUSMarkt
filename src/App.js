import { Route, Routes, Outlet } from 'react-router-dom';
import Home from './Home.js';
import Sell_Page from './components/pages/sell/Sell_Page.js'
import Trade_Page from './components/pages/trade/Trade_Page.js'
import Signup from './components/pages/miscellaeneous/Signup.js';
import Register from './components/pages/miscellaeneous/Register.js';
import ListingPage from './components/mini_components/ListingPage.js'
import Cart from './components/pages/buy/Cart.js'
import ToastContain from './components/mini_components/ToastContain.js';
import Sell_addListing from './components/pages/sell/Sell_addListing.js';
import Sell_addListing2 from './components/pages/sell/Sell_addListing2.js';
import Sell_addListing3 from './components/pages/sell/Sell_addListing3.js';

function App() {
  return (

    // buy the routing doesn't matter 
    // need to nest register under sign up
    <div>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path= "/BUY" element={<Outlet />}>
          <Route index element={<Home />} /> 
          <Route path=":listingID" element={<ListingPage />} />
          <Route path= "CART" element = {<Cart />}/>
        </Route>

        <Route path = "/SELL" element = {<Outlet />}>
          <Route index element={<Sell_Page/>} />
          <Route path = "ADD_LISTING" element = {<Outlet />}>
            <Route index element={<Sell_addListing/>} />
            <Route path = "STEP2" element = {<Sell_addListing2/>}/>
            <Route path = "STEP3" element = {<Sell_addListing3/>}/>
          </Route>
        </Route>

        <Route path = "/TRADE" element = {<Trade_Page />}/>
        
        
        <Route path = "/SIGNUP" element = {<Signup />} />
        
        <Route path = "/REGISTER" element = {<Register />}/>
        
      </Routes>
      <ToastContain />
    </div>
  )
}

// once i have signed up i would lead it to the login page using the useNavigateHook

export default App;




 