import React, {Component, useState, useEffect} from "react";
import "../../components/input/input.styles.css";
import MainTitle from "../../components/MainTitle/MainTitle.component";
import InvitationCard from "../../components/InvitationCard/InvitationCard.component"; 
const axios = require("axios");

class InvitationPage extends Component {
    constructor() {
      super();
  
      this.state = {
        invitations: []
      }
    }

    componentDidMount() {
        const accessKey = localStorage.getItem('authorization');
        axios({
                method: "get",
                url: `http://localhost:4000/invitation`,
                headers : {
                "Authorization": accessKey
                }
            })
        .then(res => {
            console.log(res.data);
            this.setState({invitations: res.data.Invitations})
        })
    };


    render() {
        return (
            <div>
                <MainTitle textContent={"INVITATIONS"}/>
                    <div className="form-container">
                        {console.log(this.state)}
                        { this.state.invitations.map(invitation => (
                        <InvitationCard  invitationId={invitation._id} 
                                         companyName={invitation.companyName}
                                         hostName={invitation.hostName} />
                        ))}
                    </div>
            </div>
        )
    }
}

export default InvitationPage;