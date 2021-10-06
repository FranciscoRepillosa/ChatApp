import React from 'react';

import "./CardText.styles.css"

const CardText = ({textContent}) => (
    <h3 className="card-text">
           {textContent} 
    </h3>
)

export default CardText;