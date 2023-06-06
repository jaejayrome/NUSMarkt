import { Route, Routes, Outlet } from 'react-router-dom';
import Home from './Home.js';
import Sell_Page from './components/pages/sell/Sell_Page.js'
import Trade_Page from './components/pages/trade/Trade_Page.js'
import Signup from './components/pages/miscellaeneous/Signup.js';
import Register from './components/pages/miscellaeneous/Register.js';
// import Account from './components/pages/miscellaeneous/Account.jsx'
import ListingPage from './components/mini_components/ListingPage.js'
import Cart from './components/pages/buy/Cart.js'


function App() {
  return (
 
    // need to nest register under sign up
    <div>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path= "/BUY" element={<Outlet />}>
          <Route index element={<Home />} /> {/* Renders Home component */}
          <Route path=":listingID" element={<ListingPage />} />
          <Route path= "CART" element = {<Cart />}/>
        </Route>

        <Route path = "/SELL" element = {<Sell_Page />}/>
          <Route path = "/TRADE" element = {<Trade_Page />}/>
          <Route path = "/SIGNUP" element = {<Signup />}>
            {/* <Route path = ":accountUsername" element = {<Account/>}></Route> */}
          </Route>
          <Route path = "/REGISTER" element = {<Register />}/>
      </Routes>
    </div>
  )
}

// once i have signed up i would lead it to the login page using the useNavigateHook

export default App;




 