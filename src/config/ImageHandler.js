import {getStorage, ref, getDownloadURL} from "firebase/storage";
import {useState, useEffect} from 'react';

function ImageHandler(props) {
const [imageURL, setImageURL] = useState(null)

useEffect(() => {
    const downloadListingImages = (imageID) => {
    return getDownloadURL(ref(getStorage(), `images/${imageID}.jpg`))
    .then((url) => {
      setImageURL(url);
    })
    .catch((error) => {
      alert(error)
    })}

    downloadListingImages(props.filePath)

    });


return (
<div>
   <img src={imageURL} alt={props.alt} style = {{width: "350px", height: "350px", marginLeft: "25px"}}/>
</div>)

}

export default ImageHandler;