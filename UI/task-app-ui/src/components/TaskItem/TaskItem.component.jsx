import React, {useState} from 'react';
import blanckCheckBullet from "../../blank-check-bullet.svg"

import "./TaskItem.styles.css";


const TaskItem = ({name, _id }) => (
    <div>
        
        <li className="li-task"> 
            <img src="blanckCheckBullet" className="bullet"/> 
            <span class="task-text" > {name} </span> 
        </li>
        <hr class="hr-li"></hr>
    </div>
)

export default TaskItem;