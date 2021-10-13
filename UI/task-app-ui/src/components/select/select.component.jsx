import React, {useState} from 'react';

import "./select.styles.css"

const Select = ({level, clickHandler, onChangeHandler, selectedLevel }) => (
    <label class="container">{level}
  <input type="radio" checked={level === selectedLevel} name="radio"  onChange={onChangeHandler} value={level} onClick={clickHandler} />
  <span class="checkmark"></span>
</label>
)

export default Select;