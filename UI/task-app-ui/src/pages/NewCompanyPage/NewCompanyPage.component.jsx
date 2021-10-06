import React, {Component, useState} from "react";
import FormInput from "../../components/input/input.component";
import "../../components/input/input.styles.css"
const axios = require("axios");

const LoginPage = (props) => {

  

    const [companyName, setCompanyName] = useState("");


    const handleInputChange = (event) => {
        switch (event.target.name) {
          case "companyName":
            setCompanyName(event.target.value);
            break;
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

      let reqBody = {
        companyName
      };

      console.log(reqBody);
     
      
      axios({
      method: "post",
      url: `http://localhost:4000/company`,
      headers: { "authorization": localStorage.getItem("authorization") }, 
      data: reqBody
      })
      .then(res => {
        console.log(res);
      })
    }

    return (
            <form className="form-container">
                    <FormInput type={"text"} name={"companyName"} textContent={"Company Name"} onInputChange={handleInputChange} />
                    <FormInput type={"submit"} submitHandler={handleSubmit} textContent={"CREATE"} />
            </form>
        
    );
}

export default LoginPage;