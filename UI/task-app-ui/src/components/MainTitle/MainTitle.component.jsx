import React, {useState} from 'react';

import "./MainTitle.styles.css"

const MainTitle = ({textContent, _id }) => (
    <div className="mainTitle">
        <h2>{textContent}</h2>
    </div>
)

export default MainTitle;