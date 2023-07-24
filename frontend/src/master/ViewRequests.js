import { useEffect, useState, forceUpdate } from "react"
import Navbar from "../components/compiledData/Navbar.js"
import { Box, Grid, Button, IconButton, Avatar, Checkbox} from "@mui/material"
import { useNavigate } from "react-router-dom"
import db from "../config/firebase.js"
import { collection, getDocs, deleteDoc, doc, updateDoc} from "@firebase/firestore"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { toast } from "react-toastify"

export default function ViewRequests() {

    const [requests, setRequestsArr] = useState([])
    const [updateFlag, setUpdateFlag] = useState(false);
    const navigate = useNavigate()
    // const [isClicked, setIsClicked] = useState(false)


    useEffect(() => {

        const fetchRequests = async () => {
            try {

                const colRef = collection(db, "withdrawalRequests")
                const snapshot = await getDocs(colRef)
                if (snapshot){
                    const requestsData = snapshot.docs.map(doc => {
                        return {...doc.data(), id: doc.id, path: doc.ref.path}
                        
                    });
                    // const pathData = snapshot.docs.map((doc) => doc.id)
                    setRequestsArr(requestsData);
                }


            } catch (error) {
                console.log(error)
            }
        }

        fetchRequests()

    }, [])



    const updateRequest = async (req) => {
        try {
            const id = req.id
            await updateDoc(doc(db, "withdrawalRequests", id), {completed: true})

            toast.success("You have marked a request as completed")
            navigate('/BUY')
           
            // setIsClicked(true)
        
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div> 
            <Navbar />


            <div style={{fontSize: "30px", fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center'}}> 
            Incoming Withdrawal Requests
            </div>

            <div style={{overflowY: "auto", height: '550px'}}> 
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap'}}>
            {requests.length > 0 &&
                requests.map((req) => (
                <div
                    style={{
                    marginTop: "5%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: '16px',
                    border: req.completed ? "1px solid #ccc" : "1px solid black",
                    padding: "10px",
                    marginRight: '5%',
                    }}
                >
                    <div style={{color: req.completed ? "#ccc" : 'black'}}>
                    <AccountBoxIcon />
                    {req.userName}
                    </div>
                    <div style={{color: req.completed ? "#ccc" : 'black'}}>
                    ${req.amount}
                    </div>
                    <div style={{color: req.completed ? "#ccc" : 'black'}}>
                    Bank: {req.bank}
                    </div>
                    <div style={{color: req.completed ? "#ccc" : 'black'}}>
                    Bank Account Number: {req.bankAccountNumber}
                    </div>
                    <div style={{color: req.completed ? "#ccc" : 'black'}}>
                    Mark as Transferred:
                    <IconButton onClick={() => updateRequest(req)} disabled={req.completed}>
                        <CheckBoxIcon />
                    </IconButton>
                    </div>
                </div>
                ))}
            </Box>
            </div>

        </div>
    )
}