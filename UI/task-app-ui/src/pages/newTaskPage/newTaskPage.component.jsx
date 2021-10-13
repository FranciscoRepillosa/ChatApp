import React, {Component, useState} from "react";
import FormInput from "../../components/input/input.component";
import "../../components/input/input.styles.css"
import DateAndAssigned from "../../components/dateAndAssigned/dateAndAssigned.component";
import Select from "../../components/select/select.component";
import "../../components/select/select.styles.css";
const axios = require("axios");

const SignupPage = (props) => {

  

    const [taskName, setTaskName] = useState("");
    const [assignedName, setAssignedName] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [priorityLevels, setLriorityLevels] = useState(["low","med","high"]);
    const [taskProrityLevel, setTaskPrority] = useState("");


    const handleInputChange = (event) => {
      switch (event.target.name) {
          case "taskName":
            setTaskName(event.target.value);
            break;
          case "assignedName":
            setAssignedName(event.target.value);
            break;
          case "dueDate":
            setDueDate(event.target.value);
            break;
          case "taskDescription":
            setTaskDescription(event.target.value);
            break; 
        }
    };

    const handleCheckboxClick = (e) => {
      setTaskPrority(e.target.value);
    }

    const onChangeHandler = (e) => {
    }

    const handleSubmit = (event) => {
        event.preventDefault();
      let reqBody = {
        taskName,
        assignedName,
        dueDate,
        taskDescription,
        taskProrityLevel,
        
      };

      console.log(reqBody);
     
       
      axios({
      method: "post",
      url: `http://localhost:4000/task`, 
      headers: { "authorization": localStorage.getItem("authorization") }, 
      data: reqBody
      })
      .then(res => {
        console.log(res);
      })
      
    }

    return (
            <div className="newTask-form-container">
                    <FormInput type={"text"} inputStyleList={"newTask-form-input text-size-2"} name={"taskName"} placeholder={"Task name..."} onInputChange={handleInputChange} />
                    <DateAndAssigned onInputChange={handleInputChange}/>
                    <FormInput type={"text"} name={"taskDescription"} inputStyleList={"newTask-form-input"} onInputChange={handleInputChange} placeholder={"Task description"} />
                   <div className="checkbox-container">
                   { priorityLevels.map(priorityLevel => (
                        <Select clickHandler={handleCheckboxClick} onChangeHandler={onChangeHandler} selectedLevel={taskProrityLevel} level={priorityLevel} /> 
                    ))}
                    </div>
                    <FormInput type={"submit"} submitHandler={handleSubmit} textContent={"Create"} />
                    <input type="radio" name="hola" id="" />{"hola"}
             </div>
        
    );
}

export default SignupPage;