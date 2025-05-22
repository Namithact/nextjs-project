'use client'
import React, { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
    const imageInputRef=useRef();
    const[pickedImage, setPickedImage]=useState(false);
    function handleButtonClick() {
        imageInputRef.current.click();
    }
    function handleImageChange(event) {
        const file= event.target.files[0];
        if (!file) {
            setPickedImage(false);
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload =  ()=> {
            setPickedImage(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        
      <div className={classes.preview}>
        {pickedImage && <Image src={pickedImage} alt="Image selected by user" fill />}
        {!pickedImage && <p>No image chosen</p>}</div>
        <input
          type="file"
          className={classes.input}
          id={name}
          name={name}
          accept="image/png,img/jpeg"
          ref={imageInputRef}
          onChange={handleImageChange}
          required
        />
        <button className={classes.button} type="button" onClick={handleButtonClick}>
          Select Image
        </button>
      </div>
    </div>
  );
}
