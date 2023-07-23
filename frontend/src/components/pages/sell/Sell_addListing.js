
import {useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, InputLabel, TextField, FormControl, Select, MenuItem, InputAdornment } from '@mui/material';
import Navbar from '../../compiledData/Navbar.js';
import SizeButtonGroup from '../../mini_components/SizeButtonGroup.js';
import {auth} from '../../../config/firebase.js'
import SizingGuide from '../../mini_components/SizingGuide.js';
import TransitionModal from '../../mini_components/TransitionModal.js';
import {query, collection, where, getDocs, updateDoc} from "@firebase/firestore"
import { ref, getStorage, uploadBytes } from 'firebase/storage';
import db from "../../../config/firebase.js"
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

// this component is for the user to add any listings up to sell

// need to think of what else we can skip so we need to ensure that the image is being uploaded in accordance ot it's listing title also 

export default function Sell_addListing() {
    // const [listingTitle, setListingTitle] = useState("")
    // const [listingPrice, setListingPrice] = useState("")
    // const [productDescription, setProductDescription] = useState('')
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [sizingGuide, setSizingGuide] = useState([]);
    const [cSizingGuide, setCSizingGuide] = useState([]);
    const [bankAccountNumber, setBankAccountNumber] = useState('')
    const [bank, setBank] = useState('');
    const [bankDetailsUploaded, setBankDetailsUploaded] = useState(false)
    const [isSizeGuideConfirmed, setIsSizeGuideConfirmed] = useState(false);

    const location = useLocation()
    const storage = getStorage(); 

    const uploadImageToStorage = async (base64Data, fileName) => {
        try {
          const decodedData = atob(base64Data);
          const arrayBuffer = new ArrayBuffer(decodedData.length);
          const uint8Array = new Uint8Array(arrayBuffer);
      
          for (let i = 0; i < decodedData.length; i++) {
            uint8Array[i] = decodedData.charCodeAt(i);
          }
      
          const blob = new Blob([uint8Array], { type: 'image/jpeg' });
      
          const storagePath = `images/${fileName}.jpg`;
          const fileRef = ref(storage, storagePath);
          await uploadBytes(fileRef, blob);
        } catch (error) {
          console.log(error);
        }
      };

      const updateDB = async () => {
        const q = query(collection(db, "users"), where("uid", "==", userID));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (user) => {
        await updateDoc(user.ref, {bankAccount: {
            bankAccountNumber: bankAccountNumber, 
            bank: bank
        }});
        })
        }




    const preBuiltSizes = ["Chest Width", 'Shoulder Width', "Chest Length"]

    const handleSizingGuide = (sizingGuide) => {
        setSizingGuide(sizingGuide);
    };

    const confirmSizeGuide = (sizingGuide) => {
        setCSizingGuide(sizingGuide)
    }
    
    const handleConfirmSizeGuide = () => {
        confirmSizeGuide(sizingGuide);
        setIsSizeGuideConfirmed(true);
    };

    // callback function
    const handleSelectedSizes = (sizes) => {
        setSelectedSizes(sizes);
    };

    const bankAccountNumberHandler = (event) => {
        setBankAccountNumber(event.target.value)
    }

    const handleBankChange = (event) => {
        setBank(event.target.value);
    };


    const validationSchema = Yup.object({
        listingTitle: Yup.string().required("Listing Title is required"),
        listingPrice: Yup.number().required("Listing Price is required")
        .positive("Price must be a positive number")
        .min(0.01, "Your item must cost at least $0.01"),
        productDescription: Yup.string().required("Product Description is required"), 
        sizesAvailable: Yup.array().min(1, "You have to select at least 1 Size!"),
        cSizingGuide: Yup.array().of(
            Yup.object().shape({
                inputMeasurementArr: Yup.array().of(
                    Yup.object().shape({
                        inputMeasurement: Yup.number()
                        .required("Note: You are missing a size measurement! Rectify Your Mistake and Reconfirm the Sizing Guide before moving on!")
                        .min(1, 'Note: Measurement must be greater than 0! Rectify Your Mistake and Reconfirm the Sizing Guide before moving on!'),
                    })
                )
            })
        ),
        bankDetailsUploaded: Yup.boolean(),
        bankAccountNumber: Yup.string().when('bankDetailsUploaded', {
          is: false,
          then: () => Yup.number().required("Bank Account Number is required"),
          otherwise: () => Yup.string().notRequired(),
        }),
        bank: Yup.string().when('bankDetailsUploaded', {
          is: false,
          then: () => Yup.string().required("Bank Is required"),
          otherwise: () => Yup.string().notRequired(),
        }),
    })
    
    const listedBy = auth.currentUser.displayName;
    const userID = auth.currentUser.uid;

    const formik = useFormik({
        initialValues: {
            listingTitle: '',
            listingPrice: '', 
            productDescription: '',
            bankDetailsUploaded: bankDetailsUploaded,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            navigationHandler(values)
        },
    })

        const newListing = {
            listingTitle: formik.values.listingTitle, 
            listingPrice: formik.values.listingPrice,
            productDescription: formik.values.productDescription, 
            sizesAvailable: selectedSizes, 
            filePath: formik.values.listingTitle,
            listedBy: listedBy,
            sizingGuide: cSizingGuide
        }

    const navigate = useNavigate()


    const navigationHandler = () => {

        const checkPreOrder = location.state?.json64;

        if (checkPreOrder != null) {
            validationSchema.validate({ listingTitle: formik.values.listingTitle, listingPrice: formik.values.listingPrice, productDescription: formik.values.productDescription, sizesAvailable: selectedSizes,
                cSizingGuide: cSizingGuide, bankDetailsUploaded: formik.values.bankDetailsUploaded,
                bankAccountNumber: bankAccountNumber, bank: bank}).then(validateData => {
                    uploadImageToStorage(checkPreOrder, newListing.listingTitle);
                    navigate('STEP3', { state: { ...newListing, json64: checkPreOrder } });
                    updateDB()
                }).catch(error => {
                    setIsSizeGuideConfirmed(false)
                    console.log(error)
                    toast.error("Validation Error: " + error.message); 
                    if (error.inner) {
                        error.inner.forEach((err) => {
                        toast.error("Inner Error: " + err.message);
                        });
                    }
            })
            
        } else {
            validationSchema.validate({ listingTitle: formik.values.listingTitle, listingPrice: formik.values.listingPrice, productDescription: formik.values.productDescription, sizesAvailable: selectedSizes,
            cSizingGuide: cSizingGuide, bankDetailsUploaded: formik.values.bankDetailsUploaded,
            bankAccountNumber: bankAccountNumber, bank: bank}).then(validateData => {
                navigate('STEP2', { state: newListing });
                updateDB()
            }).catch(error => {
                setIsSizeGuideConfirmed(false)
                console.log(error)
                toast.error("Validation Error: " + error.message); 
                if (error.inner) {
                    error.inner.forEach((err) => {
                    toast.error("Inner Error: " + err.message);
                    });
                }
                })
           
        }
    }


    useEffect(() => {
        const receiveDB = async () => {
            const q = query(collection(db, "users"), where("uid", "==", auth.currentUser.uid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async (user) => {
            if (user.data().bankAccount != null) {
                setBankDetailsUploaded(true)
                setBank(user.data().bankAccount.bank)
                console.log(user.data().bankAccount.bankAccountNumber)
                setBankAccountNumber(user.data().bankAccount.bankAccountNumber)
            }
        })
        }
        receiveDB()
    }, [])
    
    return (
        <div>
            <Navbar />

            <form onSubmit={formik.handleSubmit}>
            <div style = {{display: "flex", flexDirection: 'row', alignItems: "center"}}> 
                <div style = {{flex: 1, marginLeft: "10%", display: "flex", flexDirection: 'column'}}>
                   
                    <div style = {{fontFamily: 'serif', fontWeight: 'bolder', fontSize: "30px", marginBottom: "5%"}}> 
                    Step 1: Fill in the Listing Details
                    </div>

                    <InputLabel htmlFor = "listingTitle"> Product Name </InputLabel>
                    <TextField id = "listingTitle"
                    variant = "outlined"
                    value = {formik.values.listingTitle}
                    onChange = {formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.listingTitle && formik.errors.listingTitle}
                    helperText={formik.touched.listingTitle && formik.errors.listingTitle}
                    sx = {{width: 500, mb: '1%'}}
                    required
                    />

                    <InputLabel htmlFor = "listingPrice"> Product Price </InputLabel>
                    <TextField id = "listingPrice"
                    variant = "outlined"
                    value={formik.values.listingPrice}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.listingPrice && formik.errors.listingPrice}
                    helperText={formik.touched.listingPrice && formik.errors.listingPrice}
                    InputProps={{
                        startAdornment: <InputAdornment position='start'>$</InputAdornment>
                    }}
                    sx = {{width: 500, mb: '1%'}}
                    required
                    />

                    <InputLabel htmlFor = "productDescription"> Product Description </InputLabel>
                    <TextField id = "productDescription"
                    variant = "outlined"
                    value={formik.values.productDescription}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.productDescription && formik.errors.productDescription}
                    helperText={formik.touched.productDescription && formik.errors.productDescription}
                    sx = {{width: 500, mb: '1%'}}
                    required
                    />

                    <div style={{marginBottom: '1%'}}> 
                    Select Sizes
                    </div>
                    <SizeButtonGroup selectedSizes={selectedSizes}
                    onSelectedSizes={handleSelectedSizes}/>
                    
                </div>
                {selectedSizes.length != 0 ?
                    <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        Configure Sizing Guide 
                        <SizingGuide disabled={isSizeGuideConfirmed} dimensions = {preBuiltSizes} callback = {handleSizingGuide} selectedSizes = {selectedSizes}/>

                        <Button sx = {{color: "black", borderColor: "black", mt : '2%'}} disabled= {isSizeGuideConfirmed} variant = "outlined" onClick = {handleConfirmSizeGuide}> Confirm Size Guide </Button>
                    </div> : <div style = {{flex: 1}}> </div>
                }
                </div>

                {bankDetailsUploaded ? <div> </div> : <div style={{marginTop: "5%", flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'left', marginLeft: "10%"}}>
                {/* <InputLabel htmlFor = "bankAccountNumber"> Bank Account Number </InputLabel> */}
                    <TextField id = "bankAccountNumber"
                    variant = "outlined"
                    label = "Bank Account Number"
                    value = {bankAccountNumber}
                    onChange = {bankAccountNumberHandler}
                    sx = {{width: 500, marginRight: "3%"}}
                    required
                />
            
                <FormControl sx={{ }}>
                <Select
                labelId="quantity-label"
                id="quantity-select"
                value={bank}
                onChange={handleBankChange}
                >
                <MenuItem value={'POSB/DBS'}>POSB/DBS</MenuItem>
                <MenuItem value={'OCBC'}>OCBC</MenuItem>
                <MenuItem value={'UOB'}>UOB</MenuItem>
            </Select>
            </FormControl>

            


        </div>}
            
           

        <div style = {{marginTop: "3%" ,position: 'relative', left: "42%"}}>
        <TransitionModal navigation = {navigationHandler}/>
        </div>
        </form>

            
        </div>
    )
}