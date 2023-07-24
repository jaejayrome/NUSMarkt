import { useEffect, useState } from "react";
import { deleteDoc, arrayRemove, collection, getDoc, updateDoc, getDocs, query, where } from "@firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../config/firebase.js";
import ImageHandler from "../../../config/ImageHandler.js";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteTransitionModal from "../../mini_components/DeleteTransitionModal.js";


export default function Sell_IndivListing(props) {

    const [listing, setListing] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [expanded, setExpanded] = useState(false);
    
    const userID = auth.currentUser.uid;

    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
      })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      }));

      
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


      useEffect(() => {
        const fetchListing = async () => {
            console.log(props.itemRef)
            try {
            const listing = await getDoc(props.itemRef)
            if (listing.exists()){
                setListing({...listing.data()})
                console.log(listing.data().listingTitle)
            } else {
            }
            
            } catch(error) {
                console.log(error)
            }
        }

        fetchListing()
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(user !== null);
            
        });


      
      
        return () => unsubscribe();

    }, [props.item])

    

    return (
    <Card>
    
      {listing && (
        <div>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "black" }} aria-label="recipe">
          </Avatar>
        }
        action={
          <DeleteTransitionModal onDelete = {props.onDelete} itemRef = {props.itemRef}/> 
        }
       
        title= {listing.listingTitle}
        subheader= "Listed By: You"
      />
      
      <div style = {{display: "flex", alignItems: "center", justifyContent: "center"}}>
      <ImageHandler width = "500px" height = "500px" filePath = {listing.filePath} alt = {listing.title}/>
      </div>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph> Product Description</Typography>
          <Typography paragraph>
           {listing.productDescription}
          </Typography>
          <Typography paragraph>

          </Typography>
            
          <Typography paragraph>
          
          </Typography>
          <Typography>
          </Typography>
        </CardContent>
      </Collapse>
      </div>)}
    </Card>
  
    )

}
