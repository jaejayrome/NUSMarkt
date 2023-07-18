import Navbar from "../../compiledData/Navbar";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../config/firebase.js";
import db from "../../../config/firebase.js";
import { styled } from '@mui/material/styles';
import { deleteDoc, arrayRemove, collection, getDoc, updateDoc, getDocs, query, where } from "@firebase/firestore";
import Sell_IndivListing from "./Sell_IndivListing";
import {Box, ImageListItem, ImageList, Divider, Button} from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import WithdrawalModal from "../../mini_components/WithdrawalModal";

// need to add in some validation for the amount of money that the person can withdraw

export default function Sell_Listings() {
  const [uid, setUid] = useState(null);
  const [arr, setArr] = useState([]);
  const [withdrawAmount, setWithdrawAmount] = useState(0.00)
  const [bank, setBank] = useState('')
  const [bankAccountNumber, setBankAccountNumber] = useState('')
  const [userName, setUserName] = useState('')
  const [uuid, setUUID] = useState('')
  // const [userRef, setUserRef] = useState(null)


  const BigIcon = styled(SentimentVeryDissatisfiedIcon)({
    fontSize: '5rem', // Adjust the size as per your requirement

  });

  // there's a bug that it won't automatically update prolly due to the way in with the on auth state changesd is changing
  // after i send the withdrawl request the amount ot withdraw should be reduced

  const handleDeletion = () => {
    fetchUser();
  };

  const fetchUser = async () => {
    try {
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
   
    querySnapshot.forEach((user) => {
      const data = user.data().Sell_ListingArr;
      // console.log(user.data().Sell_ListingArr)
      const bankAccount = user.data().bankAccount; // Get the bankAccount object
      const userName = user.data().userName; // Access the userName field
      const withdrawAmount = user.data().withdrawAmount; // Access the withdrawAmount field
      // setUserRef(user.ref)
      setUUID(user.data().uid)
      setBankAccountNumber(bankAccount.bankAccountNumber);
      setBank(bankAccount.bank);
      setUserName(userName);
      setArr(data);
      setWithdrawAmount(withdrawAmount);
  
      // console.log(bank);
      // console.log(bankAccountNumber);
      // console.log(userName);
    })
    } catch(error) {
      console.log(error)
    }
  
  };

  const ScrollableCardContainer = styled('div')`
    max-height: 500px; 
    overflow-y: auto;
  `;

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
      fetchUser()
    }
  }, [uid]);

  // just for debuggin purposes
  useEffect(() => {
    console.log(bank);
    console.log(bankAccountNumber);
    console.log(userName);
  }, [bank, bankAccountNumber, userName]);

  return (
    <div>
      <Navbar />
      <div style = {{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
      <div style={{ fontSize: "30px", textAlign: 'center' }}> 
        Merchant Statistics
      </div>

      <div style={{textAlign: 'center', font: "black", fontsize: '20px'}}> 
      Account Balance: ${parseFloat(withdrawAmount).toFixed(2)}
      </div>

      <div style={{marginTop: '2%'}}> 
      <WithdrawalModal uuid = {uuid} bank = {bank} bankAccountNumber = {bankAccountNumber} userName = {userName} withdrawAmount = {withdrawAmount}/>
      </div>
    
      </div>
      <Divider sx = {{marginTop: "2%", border: "1px solid black"}} />
      <ScrollableCardContainer>
        <Box sx={{ flexGrow: 1 }}> 
          <ImageList>
            {arr.length !== 0 && arr.map((item) => (
              <ImageListItem key={item}>
                <Sell_IndivListing onDelete={handleDeletion} itemRef={item} />
              </ImageListItem>
            ))}
          </ImageList> 
          {arr.length === 0 && (
            <div style={{marginTop: "10%",display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: "center"}}> 
              <BigIcon />
              <div style={{fontWeight: "bolder", fontSize: "30px"}}> 
                Nothing to Show
                <div style = {{fontWeight: "normal", fontSize: "20px"}}> 
                  You have not listed anything so far
                </div>
              </div>
            </div>
          )}
        </Box>
      </ScrollableCardContainer>
    </div>
  );
}
