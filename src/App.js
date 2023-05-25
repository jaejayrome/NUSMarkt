import { Route, Routes } from 'react-router-dom';
import Home from './Home.js';
import Sell_Page from './components/pages/sell/Sell_Page.js'
import Trade_Page from './components/pages/trade/Trade_Page.js'
import Signup from './components/pages/miscellaeneous/Signup.js';
import Register from './components/pages/miscellaeneous/Register.js';

function App() {
  return (

    // need to nest register under sign up
    <div>
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/SELL" element = {<Sell_Page />}/>
        <Route path = "/TRADE" element = {<Trade_Page />}/>
        <Route path = "/SIGNUP" element = {<Signup />}/>
        <Route path = "/REGISTER" element = {<Register />}/>
      </Routes>
    </div>
  );
}

export default App;




 