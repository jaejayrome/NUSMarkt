import "./Navbar.css";
import {useState} from 'react';
import {Link} from 'react-router-dom';

function Navbar(props) {

    // if button is clicked, the font should bold
    const [isClicked, setClick] = useState(false);


    const clickHandler = () => {
        setClick((isClicked) => !isClicked)
    }


    return (
        <div> 
            {
                props.actionArr.map((action, index)=> {
                    return (
                    <Link to = {`${action.title != "BUY" ? action.title: ""}`}>
                        <button onClick = {clickHandler} className = "main_button" key = {index}>
                        {action.title}
                        </button>
                    </Link>
                    )
                })
            }
        </div>
    )
}

export default Navbar;
