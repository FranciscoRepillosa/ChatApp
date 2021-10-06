import React from "react";
import "./InvitationCard.styles.css";
import CardText from "../CardText/CardText.component";
import Input from "../input/input.component";
const axios = require("axios");

const InvitationCard = ({ companyName, invitationId, hostName}) => {
    const handleSubmit = (e) => {
        //e.preventDefault();
        const accessKey = localStorage.getItem('authorization');

        console.log(invitationId);
        console.log(accessKey);
        axios({
                method: "put",
                url: `http://localhost:4000/invitation/${invitationId}`,
                headers : {
                "Authorization": accessKey
                }
            }).then(res => {
                console.log(res);
            });
        
      }
    
    return (
    <div className="card">
        <h3 className={"card-text"}> {`Company: ${companyName}`} </h3>
        <h3 className={"card-text"}> {`Host: ${hostName}`} </h3>
        <Input type={"submit"} submitHandler={handleSubmit} textContent={"ACCEPT"}/>
    </div>    
)}

export default InvitationCard;
