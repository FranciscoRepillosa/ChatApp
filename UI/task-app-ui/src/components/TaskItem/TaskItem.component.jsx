import React, {useState} from 'react';
import blanckCheckBullet from "../../blank-check-bullet.svg";
import yellowCheckBullet from "../../yellow-check-bullet.svg";
import greenCheckBullet from "../../green-check-bullet.svg";
import {withRouter} from "react-router-dom";


import "./TaskItem.styles.css";


const TaskItem = ({name, _id, history, status }) => (
    <div>
        
        <li className="li-task"> 
            <img src={blanckCheckBullet} className="bullet" onClick={() => history.push(`/task/${_id}`)}/> 
            <span class="task-text" > {name} </span> 
        </li>
        <hr></hr>
    </div>
)

export default withRouter(TaskItem);