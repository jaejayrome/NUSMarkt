import { getDoc } from "@firebase/firestore"
import { useState } from "react"
import { useEffect } from "react"
import ChildChildOrder from "./ChildChildOrder"
import { Divider } from "@mui/material"

export default function ChildOrder(props) {

    // one order can have many "entries"

    const [ordera, setOrder] = useState(null)
    const [orderID, setOrderID] = useState("")
 
    // it is a list of order references

    useEffect(()=> {

        const getOrder = async () => {
            try {
                const orderSnapshot = await getDoc(props.orderRef)
                const orderData = orderSnapshot.data();
                setOrder(orderData)
                setOrderID(orderSnapshot.id)
               
            } catch (error) {
                console.log(error)
            }
        }

        getOrder()

    }, [])


    // const getListing = (listingRef) => {


    // }

    return (

       
        <div style={{display: "flex", alignContent: 'center', justifyContent: "center", border: "1px solid black", marginLeft: "5%", marginRight: "5%", flexDirection: 'column', marginBottom: "3%"}}>
        <div style = {{ paddingLeft: "1%", fontWeight: "bold", fontSize: "25px", paddingTop: '1%', marginBottom: "2%", paddingBottom: "1%", borderBottom: "1px solid black"}}> 
            Order Number #{orderID}
        </div>
   
        {ordera &&
        Object.keys(ordera).map((key) => {
        const entry = ordera[key];
        return (

        <div> 
        <ChildChildOrder
            key={key}
            listingRef={entry.listingRef}
            quantity={entry.quantity}
            size={entry.size}
        />
        <Divider sx = "1px light grey solid "> </Divider>



        </div>
        );
        })}
       

        </div>
    )
}