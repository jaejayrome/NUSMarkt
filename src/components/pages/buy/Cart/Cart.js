import Navbar from "../../../compiledData/Navbar";
import CartItem from "../CartItem.js";
import {auth} from '../../../../config/firebase.js';
import {useState, useEffect} from 'react';
import { onAuthStateChanged } from "firebase/auth";

export default function Cart() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(user !== null);
          });
    
        return () => unsubscribe();
        }, []);


    return (
        <div>
            <Navbar />
            <CartItem isLogged = {isLoggedIn} uid = {auth.currentUser.uid}/>
        </div>
    )
}