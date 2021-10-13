import React, {useState} from 'react';

import "./dateAndAssigned.styles.css"

const DateAndAssigned = ({onInputChange, name }) => (
    <div className="dateAndAsigned-container">
        <input placeholder="Assigned" onChange={onInputChange} className="newTask-form-input" type="text" name="assignedName" id=""></input>
        <label for="dueDate">Due date :</label>
        <input className="taskDate"type="date" onChange={onInputChange}  name="dueDate" id=""></input>
    </div>
)

export default DateAndAssigned;