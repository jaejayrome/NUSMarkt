import { getDoc } from "@firebase/firestore"
import { useState } from "react"
import { useEffect } from "react"


export default function ChildOrder(props) {

    const [order, setOrder] = useState(null)

    useEffect(()=> {

        const getOrder = async () => {
            try {
                const order = await getDoc(props.orderRef)
                setOrder({...order.data()})
            } catch (error) {
                console.log(error)
            }
        }

        getOrder()

    }, [])

    return (
        <div> 
            {order && order.listingTitle}
            {order && order.listingPrice}
        </div>
    )
}