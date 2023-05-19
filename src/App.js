import './App.css';
import Navbar from './components/Navbar.js'
import AccountCircle from './components/mini_components/AccountCircle.js';
import CartIcon from './components/mini_components/CartIcon';

function App() {
  return (
    <div>
        <button className='logo_button'> NUS MARKT </button>
        <Navbar> </Navbar>  
        <AccountCircle />
        <CartIcon/>
    </div> 
  );
}

export default App;
