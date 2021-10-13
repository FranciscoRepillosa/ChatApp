import React, {Component, useState} from "react";
import FormInput from "../../components/input/input.component";
import "../../components/input/input.styles.css"
const axios = require("axios");

const LoginPage = (props) => {
  

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleInputChange = (event) => {
        switch (event.target.name) {
          case "email":
            setEmail(event.target.value);
            break;
          case "password":
            setPassword(event.target.value);
            break;
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

      let reqBody = {
          email,
          password
      };

      console.log(reqBody);


      axios({
      method: "post",
      url: `http://localhost:4000/user/login`, 
      data: reqBody
      })
      .then(res => {
        console.log(res);
        localStorage.setItem('authorization', `Bearer ${res.data.token}`);
      })
    }

    return (
            <form className="form-container">
                    <FormInput type={"text"} name={"email"} textContent={"Email"} inputStyleList={"form-input"} LabelStyleList={"form-label"} onInputChange={handleInputChange} />
                    <FormInput type={"text"} name={"password"} textContent={"Password"} inputStyleList={"form-input"} LabelStyleList={"form-label"} onInputChange={handleInputChange} />
                    <FormInput type={"submit"} submitHandler={handleSubmit} textContent={"LOGIN"} />
            </form>
        
    );
}

export default LoginPage;