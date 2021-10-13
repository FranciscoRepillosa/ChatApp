import React, {Component} from "react";
import "../../components/DateAndAssigned2/DateAndAssigned.styles.css"; 
import MainTitle from "../../components/MainTitle/MainTitle.component"
import DateAndAssigned from "../../components/DateAndAssigned2/DateAndAssigned.component";
import Input from "../../components/input/input.component";
const axios = require("axios");

class TaskDescriptionPage extends Component {
    constructor(props) {
      super();
      this.props = props;
      this.state = {
        task: {},
        role: ""
      }
    }
  
    componentDidMount() {
      console.log("componentDidMount");

      fetch(`http://localhost:4000/task/${this.props.match.params.taskId}`, {
        method: "GET",
          headers: { "authorization": localStorage.getItem("authorization") }
      })
        .then(response => response.json())
        .then(res => {
          console.log(res);
            this.setState( { task: res.task });
            this.setState( { role: res.role });
        })

    }

     submitHandler = () => {

      const reqBody = { newStatus: (this.state.role === "assigned") ? "reviewing" : "done"};

      console.log(reqBody);

      axios({
        url: `http://localhost:4000/task/${this.props.match.params.taskId}/status`,
        method: "PUT",
          headers: { "authorization": localStorage.getItem("authorization") },
          data : reqBody
      })
      .then(response => {
        console.log(response);
      })
    }
  
     
    
    render() {
      return (
        <div className={"newTask-form-container task-description-container"} >
            <MainTitle textContent={this.state.task.name} />
            <DateAndAssigned assignedName={this.state.task.assignedName} dueDate={this.state.task.dueDate} />
            <p>
                {this.state.task.description}
            </p>
            <Input type={"submit"}  submitHandler={this.submitHandler} textContent={"DONE"} />

        </div>
      )
    }
  }
  

  export default TaskDescriptionPage;