import React from "react";
import "./input.styles.css"


const Input = ({LabelStyleList, inputStyleList, type, placeholder, name, value, textContent, onInputChange, submitHandler}) => {

    if (type !== "submit") {
        return(
            <>
                <label className={LabelStyleList} for={name}>{textContent}:</label>
                <input className={inputStyleList} type={type}  placeholder={placeholder} name={name} onChange={onInputChange} ></input>
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