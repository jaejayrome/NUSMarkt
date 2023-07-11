import Navbar from "../../compiledData/Navbar";
import { Button, TextField, InputLabel } from "@mui/material";
import { useState } from "react";
import Steppers from "../../mini_components/Steppers";
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";


export default function Sell_Analytics() {

  const navigate = useNavigate()

  const [thumbnailUrl, setThumbnailUrl] = useState([]);
  const [logo, setLogo] = useState("")
  const [color, setColor] = useState("")
  const [disabledLogo, setDisabledLogo] = useState(false)
  const [disabledColor, setDisabledColor] = useState(false)
  const [disableFinal, setDisableFinal] = useState(false)
  const [stepper, setStepper] = useState(0)

  const logoHandler = (event) => {
    setLogo(event.target.value);
  };

  const colorHandler = (event) => {
    setColor(event.target.value);
  };

  const disableColorNow = () => {
    setDisabledLogo(true)
    setDisabledColor(true)
    setStepper(2)
  }

  const disableLogoNow = () => {
    setDisabledLogo(true)
    setStepper(1)
  }

  const disableFinalOnClick = () => {
    setDisableFinal(true)
  }

  const routeToKickStartIt = () => {
    navigate("/SELL/KICKSTARTIT")
  }

  const generateAgain = (event) => {
    setThumbnailUrl([])
    handleSubmit(event)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDisableFinal(true)
    const madePrompt =  `tee shirt with ${logo} in ${color}`
    console.log("prompt")

    try {
      const res = await fetch("https://api.openai.com/v1/images/generations", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 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",
        },
        body: JSON.stringify({
          prompt: madePrompt, 
          n: 3,
          size: "256x256",
        }),
        method: "POST",
      });

      const data = await res.json();
      setThumbnailUrl([...data.data])
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
            <div style={{ textAlign: "center", marginBottom: "2%"}}>
            <h1>DesignTruly</h1>
                <div style={{ fontSize: "20px"}}>
                    Let us create custom shirt designs for you based on logo name and preferred colour.
                    <div>
                    Choose your favourite design and set it up for pre-order!
                    </div>
                </div>
        </div>

    
      <Steppers stage = {stepper}/>

      <form onSubmit={handleSubmit}>
      {stepper == 0 ? 
      <div style = {{display: "flex", flexDirection: "column",  alignItems: "center", justifyContent: "center"}}>
        {/* <InputLabel htmlFor = "logo"> Logo Name </InputLabel> */}
        <TextField
        label= "Enter here"
          value={logo}
          onChange={logoHandler}
          disabled = {disabledLogo}
          sx= {{width: "50%",marginTop: "5%", marginBottom: "2%"}}
          id = "logo"
        />

        <Button variant = "outlined" startIcon = {<CheckIcon />} disabled = {disabledLogo} onClick={disableLogoNow} sx = {{borderColor: "black" ,color: "black"}}> Confirm Input </Button> </div>
        : <div></div>
  }
        {disabledLogo && !disabledColor ? 
        <div style = {{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
        <TextField
          variant="outlined"
          label = "Enter here"
          value={color}
          onChange={colorHandler}
          disabled = {!disabledLogo}
          sx= {{width: "50%",marginTop: "5%", marginBottom: "2%"}}
        />
        <Button startIcon = {<CheckIcon/>} sx = {{borderColor: "black" ,color: "black"}} variant = "outlined" disabled = {!disabledLogo || disabledColor} onClick = {disableColorNow}> Confirm Input </Button> 
         </div>
        : <div> </div>}

        {(disabledLogo && disabledColor && !disableFinal) ? <div style = {{display: "flex", alignItems: "center", justifyContent: "center"}}>
        <Button startIcon = {<DoneAllIcon />} disabled = {!(disabledLogo && disabledColor)} sx = {{mt: "5%", borderColor: "black", color: "black"}} variant="outlined" type="submit">
          Generate Designs!
        </Button> </div> : <div> </div>}
      </form>
      {disableFinal && thumbnailUrl.length == 0 ?
       <div style = {{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "5%"}}> 

       <div style={{fontWeight: "bold"}}>
        Loading...
        </div>
        <CircularProgress color="inherit" /> 

      </div> 
      : <div> </div> }
      {thumbnailUrl.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {thumbnailUrl.map((url) => (
            <div style = {{margin: "2%", display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                <img
                    src={url.url}
                    alt="Thumbnail"
                    style={{  width: "300px", height: "300px" }}
                />

                 {/* <div style={{textAlign:"center", fontFamily: "Bodoni, serif"}}>
                    Choice {thumbnailUrl.indexOf(url) + 1}
                </div> */}

                <Button onClick = {routeToKickStartIt} variant =  "outlined" startIcon = {<CheckIcon />} sx = {{mt: "5%", borderColor: "black", textTransform: 'none', color: 'black'}}> 
                  Choose Design
                </Button>
            </div>

            
             
            ))}

            <div style = {{display: "flex", flexDirection: "column-reverse", justifyContent: 'center', alignItems: 'center'}}> 
              <Button onClick = {generateAgain} variant = "outlined" sx = {{color: 'black', borderColor: "black", mt : "15%"}}> Generate Design Again! </Button>
              <Button variant = "outlined" sx = {{color: 'black', borderColor: "black"}}> Back to Home Page </Button>
            </div> 
        </div>
      )}

    </div>
  );
}
