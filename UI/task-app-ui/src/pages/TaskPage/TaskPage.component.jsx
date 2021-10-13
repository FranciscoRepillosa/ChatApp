import React, {Component} from "react";
import "../../components/TaskItem/TaskItem.styles.css"; 
import MainTitle from "../../components/MainTitle/MainTitle.component"
import TaskItem from "../../components/TaskItem/TaskItem.component";

class TaskPage extends Component {
    constructor() {
      super();
  
      this.state = {
        tasks: []
      }
    }
  
    componentDidMount() {
      console.log("componentDidMount");

      fetch("http://localhost:4000/task/userTasks", {
        method: "GET",
          headers: { "authorization": localStorage.getItem("authorization") }
      })
        .then(response => response.json())
        .then(task => {
          console.log(task);
            this.setState( { tasks: task.userTasks })
        })

        console.log(this.state);
    }
  
     
    
    render() {
      return (
        <div className={"task-container"} >
            <MainTitle textContent={"My tasks"} />
          <ul className="taskList" >
          { this.state.tasks.map(task => (
            <TaskItem name={task.name} _id={task._id} status={task.status} />
          ) ) }
          </ul>
        </div>
      )
    }
  }
  

  export default TaskPage;