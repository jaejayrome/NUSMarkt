import { getDoc } from "@firebase/firestore"
import { useEffect, useState } from "react"



export default function ListingMessage(props) {
    const [message, setMessage] = useState(null)
    const messageRef = props.messageInstance
    
    useEffect(() => {
        const openMessage = async () => {
          try {
            const messageMaybe = await getDoc(messageRef);
            setMessage({ ...messageMaybe.data() });
          } catch (error) {
            console.log(error);
          }
        };
        openMessage();
      
      
      
      }, [message, messageRef]);
      

    return (
        <div>
            {message &&(
            <div> {message.content}
            {message.listedBy}
            {message.reviewStatus}
            </div>)
            }
        </div>
    )
}