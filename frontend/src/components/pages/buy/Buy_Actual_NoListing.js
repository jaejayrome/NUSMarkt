
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import styled from '@emotion/styled';

export default function Buy_Actual_NoListing(props) {

    // re-using this component for any component that needs to list any listings
    // for Buy_Actual_Listings, props.id == 1
    // for Buy_Preorder_Listings, props.id == 2

    const StyledIcon = styled(SentimentVeryDissatisfiedIcon)`
        font-size: 60px
    `
    return (
        <div style = {{fontSize: "40px", fontWeight: 'bolder', display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '5%'}}> 
            <StyledIcon />
            <div> 
            Orders Not Found
            </div>

            <div style = {{fontWeight: 'normal', fontSize: "25px"}}> 
                {props.id == 1 ? <div> You have no orders placed so far </div> : 
                props.id == 2 ?  <div> You have no pre-orders listings made so far</div> : 
                <div> You have no listings made so far </div>}
            </div>
        </div>
    )
}