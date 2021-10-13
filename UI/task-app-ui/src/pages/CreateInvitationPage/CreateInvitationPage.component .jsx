import React, {Component, useState} from "react";
import FormInput from "../../components/input/input.component";
import "../../components/input/input.styles.css"
const axios = require("axios");

const CreateInvitationPage = (props) => {

    const [guestEmail, setGuestEmail] = useState("");


    const handleInputChange = (event) => {
        switch (event.target.name) {
          case "guestEmail":
            setGuestEmail(event.target.value);
            break;
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();


      let reqBody = {
        guestEmail, 
      };

      console.log(reqBody);

      
      axios({
      method: "post",
      url: `http://localhost:4000/invitation`,
      headers: { "authorization": localStorage.getItem("authorization") }, 
      data: reqBody
      })
      .then(res => {
        console.log(res);
      })
    }

    return (
            <form className="form-container">
                    <FormInput type={"text"} name={"guestEmail"} textContent={"Email"} inputStyleList={"form-input"} LabelStyleList={"form-label"} onInputChange={handleInputChange} />
                    <FormInput type={"submit"} submitHandler={handleSubmit} textContent={"INVITE"} />
            </form>
        
    );
}

export default CreateInvitationPage;