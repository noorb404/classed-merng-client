import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'semantic-ui-react';
import './ImageUpload.css';


const ImageUpload = props => {
    
    const [file,setFile] =  useState();
    const [previewUrl,setPreviewUrl] =  useState();
    const [isValid,setIsValid] =  useState(false);
    const filePicker = useRef();

    useEffect(() => {

        if(!file){
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);

    } , [file]);

        const pickImageHandler = () => {
            filePicker.current.click();
        };

        const pickedHandler = event => {
            let pickedFile;
            let fileIsValid = isValid;
          if (event.target.files && event.target.files.length === 1) 
          {
                pickedFile = event.target.files[0];
                setFile(pickedFile);
                setIsValid(true);
                fileIsValid = true;
          } else {

              setIsValid(false);
              fileIsValid = false;
         }
         props.onInput(props.id,pickedFile,fileIsValid);
        };
        return(
            <div >

            <input onChange={pickedHandler} ref={filePicker} id={props.id} style={{display: 'none'}} type="file" accept=".jpg,.png,.jpeg"/>
            <div className="image-upload center">
                <div  className="image-upload__preview">
                     {previewUrl && <img src={previewUrl} alt="Preview" /> } 
                     {!previewUrl && <p style={{color:'green' , fontFamily:'sans-serif'}}>Please pick an image.</p> } 
                </div>
                <Button color="green" onClick={pickImageHandler}>Pick Image</Button>
            </div>
            {!isValid && <p>{props.errors}</p>}
            </div>
        );
};
 
export default ImageUpload;