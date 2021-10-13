import React, {useState} from 'react';

import "./DateAndAssigned.styles.css";

const DateAndAssigned = ({assignedName, dueDate }) => (
    <div class="dateAndAsigned-container2" >
            <h6>Assigned</h6>
            <h6>due date</h6>
            <h2>{assignedName}</h2>
            <h2>{dueDate}</h2>
    </div>
)

export default DateAndAssigned;