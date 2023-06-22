import Navbar from "../../compiledData/Navbar";
import { generateImage } from "../../../controllers/aiConfig";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import Steppers from "../../mini_components/Steppers";

export default function Sell_Analytics() {
  const [thumbnailUrl, setThumbnailUrl] = useState([]);
  const [logo, setLogo] = useState("")
  const [color, setColor] = useState("")
  const [disabledLogo, setDisabledLogo] = useState(false)
  const [disabledColor, setDisabledColor] = useState(false)
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const madePrompt =  `tee shirt with ${logo} in ${color}`

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

      <Steppers stage = {stepper}/>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter Your Logo"
          variant="outlined"
          value={logo}
          onChange={logoHandler}
          disabled = {disabledLogo}
        />

        <Button disabled = {disabledLogo} onClick={disableLogoNow}> Confirm Input </Button>
        <TextField
          label="Enter Your Preferred Colour"
          variant="outlined"
          value={color}
          onChange={colorHandler}
          disabled = {!disabledLogo}
        />
        <Button disabled = {!disabledLogo || disabledColor} onClick = {disableColorNow}> Confirm Input </Button>
        Create Tee Shirt!

        <Button variant="contained" type="submit">
          Generate Designs!
        </Button>
      </form>
      {thumbnailUrl.length > 0 && thumbnailUrl.map((url) => <img src={url.url} alt="Thumbnail" />)}
    </div>
  );
}
