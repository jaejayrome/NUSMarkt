import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import Navbar from '../compiledData/Navbar';
import { auth } from '../../config/firebase';
import db from '../../config/firebase';
import { useEffect, useState } from 'react';
import { query,getDocs, where, collection } from '@firebase/firestore';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import UpdateProfileDrawer from './UpdateProfileDrawer';

export default function UserProfile() {
    const uid = auth.currentUser.uid;
    const [user, setUser] = useState(null)

    useEffect(() => {

        try {
        const getUser = async () => {
            const q = query(collection(db, 
                "users"), where("uid", "==", uid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(element => {
                setUser({...element.data(), id: element.id})
            });
           
        }
    

        getUser()
        } catch (error) {
            console.log(error)
        }
    })

    if (!user) {
        return null;
      }

    return (
        <div>
            <Navbar />
            <div style={{flexDirection: "row", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "5%", marginRight: "5%"}}>
            <div style={{flex: 1, display: "flex", justifyContent: "right", alignItems:"center"}}> 
            <Avatar sx = {{backgroundColor: "black", width: 200, height: 200}}/>
            </div>

            <div style={{flex: 1, flexDirection: "column", display: "flex", marginLeft: "5%"}}> 
            <div style={{marginBottom: "1%", fontSize: "20px"}}> 
                First Name: {user.firstName}
            </div>

            <div style={{marginBottom: "1%", fontSize: "20px"}}> 
                Last Name: {user.lastName}
            </div>

            <div style={{marginBottom: "1%", fontSize: "20px"}}> 
                Username: {user.userName}
            </div>

            <div style={{marginBottom: "1%", fontSize: "20px"}}> 
                Email Address: {user.registerEmail}
            </div>

            <div style={{marginBottom: "1%", fontSize: "20px"}}> 
                Phone Number: {user.phoneNumber}
            </div>

            <div style={{marginBottom: "1%", fontSize: "20px"}}> 
                Telegram Handle: {user.telegramHandle}
            </div>


            </div>
            </div>

            <div style = {{marginTop: "5%", display: "flex", alignItems: 'center', justifyContent: "center"}}>
                <UpdateProfileDrawer user = {user} id = {user.id} />
            </div>
        </div>
    )
}