import React from "react";
import "./input.styles.css"


const Input = ({type, placeholder, name, value, textContent, onInputChange, submitHandler}) => {

    if (type !== "submit") {
        return(
            <>
                <label className="form-label" for={name}>{textContent}:</label>
                <input className="form-input" type={type}  placeholder={placeholder} name={name} onChange={onInputChange} ></input>
            </>
        )
    } else {
        return(
            <div className="button-container">
                <button type={type} className="form-button" onClick={submitHandler} >{textContent} </button>
            </div>
        )
    }
    
}

export default Input;