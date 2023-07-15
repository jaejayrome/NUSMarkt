import { useEffect } from "react"
import Navbar from "../../compiledData/Navbar"
import db from "../../../config/firebase.js"
import {auth} from "../../../config/firebase.js"
import { getDocs, query, where, collection,getDoc} from "@firebase/firestore";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import ChildOrder from "../../mini_components/ChildOrder";



// this would show the current orders that have been currently made thus far

// good thing is that i don't have to remove any orders at all 
export default function Buy_Actual_Listings() {
    const [uid, setUid] = useState(null);
    // this array consists of references of orders
    const [orderArr, setOrderArr] = useState([])


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if(user) {
            setUid(user.uid)
          }
        });
        console.log("first use effect")
      }, []);


    useEffect(() => {

        if (uid) {
            const getListings = async () => {

                try {
                    const q = query(collection(db, "users"), where("uid", "==", uid))
                    await getDocs(q)
                    .then((snapshot) => {
                        snapshot.forEach((user) => {
                            const orderArr = user.data()
                            setOrderArr([...orderArr.order_arr])
                            console.log("inside again")
                        })
                    }).catch((error) => console.log(error))


                } catch (error) {
                    console.log(error)
                }
            }

            getListings()
        }
    }, [uid])

    // const getOrder = async (orderRef) => {
    //     try {
    //       const toRet = await getDoc(orderRef);
    //       return {...toRet.data()};
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };
      

    return (
        <div> 
            <Navbar />
            {orderArr.length > 0 && orderArr.map((orderRef) => {
                return <ChildOrder orderRef = {orderRef}/>
            })}
        </div>
    )
}