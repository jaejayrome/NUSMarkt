import { Route, Routes } from 'react-router-dom';
import Home from './Home.js';
import Sell_Page from './components/pages/sell/Sell_Page.js'
import Trade_Page from './components/pages/trade/Trade_Page.js'

function App() {
  return (
    <div>
      <Routes>
        <Route path = "/" element = {<Home />} />
        {/* <Route path = "/BUY" element = {<Home />} /> */}
        <Route path = "/SELL" element = {<Sell_Page />}/>
        <Route path = "/TRADE" element = {<Trade_Page />}/>
        
      </Routes>
    </div>
  );
}

export default App;




