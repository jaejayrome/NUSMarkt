import { Route, Routes, Outlet } from 'react-router-dom';
import Home from './Home.js';
import Sell_Page from './components/pages/sell/Sell_Page.js'
import Trade_Page from './components/pages/trade/Trade_Page.js'
import Signup from './components/pages/miscellaeneous/Signup.js';
import Register from './components/pages/miscellaeneous/Register.js';
import ListingPage from './components/mini_components/ListingPage.js'
import Cart from './components/pages/buy/Cart/Cart.js'
import ToastContain from './components/mini_components/ToastContain.js';
import Sell_addListing from './components/pages/sell/Sell_addListing.js';
import Sell_addListing2 from './components/pages/sell/Sell_addListing2.js';
import Sell_addListing3 from './components/pages/sell/Sell_addListing3.js';
import Trade_Marketplace from './components/pages/trade/Trade_Marketplace.js';
import Trade_Request from './components/pages/trade/Trade_Request.js';
import Trade_Inbox from './components/pages/trade/Trade_Inbox.js';
import Sell_Listings from './components/pages/sell/Sell_Listings.js';
import Sell_Analytics from './components/pages/sell/Sell_Analytics.js';
import Payment from './components/pages/payments/index.js';
import Trade_Intermediate from './components/pages/trade/Trade_Intermediate.js';
import Trade_Outgoing from './components/pages/trade/Trade_Outgoing.js';

function App() {
  return (
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
          <Route path = "LISTINGS" element = {<Sell_Listings/>}/>
          <Route path = "ANALYTICS" element = {<Sell_Analytics/>}/>
        </Route>

        <Route path = "/TRADE" element = {<Outlet />}>
          <Route index element = {<Trade_Page/>}/> 
          <Route path = "INTERMEDIATE" element = {<Trade_Intermediate/>} />
          <Route path = "MARKETPLACE" element = {<Trade_Marketplace/>}/>
          <Route path = "REQUEST" element = {<Trade_Request/>}/>
          <Route path = "INBOX" element = {<Trade_Inbox/>}/>
          <Route path = "OUTGOING" element = {<Trade_Outgoing/>}/>
        </Route>

        <Route path = "/SIGNUP" element = {<Signup />} />
        
        <Route path = "/REGISTER" element = {<Register />}/>

        <Route path = "/PAYMENT" element = {<Payment/>}/>
        
      </Routes>
      <ToastContain />
    </div>
  )
}


export default App;




 