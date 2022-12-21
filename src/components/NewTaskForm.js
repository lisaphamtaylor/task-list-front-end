import React, { useState } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';


const NewTaskForm =({onAddTask})=>{
    const [formData, setFormData]= useState({ title: '', description: ''});
    

    const onChangeHandler = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
    
        const newFormData = {...formData, [fieldName]: fieldValue}
        setFormData(newFormData);
        };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        const formDataInput = {
            title: formData.title,
            description: formData.description,
        };
        axios
        .post('https://task-list-api-c17.herokuapp.com/tasks', formDataInput)
        .then((response) => {
            console.log(response);
            onAddTask(formDataInput);
        })
        .catch((err) => console.log(err));
    };

return(
    <form onSubmit={onSubmitHandler}>
        <label htmlFor='title'>Title</label>
        <input style={{width:'50vw', justifyContent:'center'}} 
            name='title'
            type='text'
            onChange={onChangeHandler}
            value={formData.title}
        />
        <label htmlFor='Description'>Description</label>
        <input
            name='description'
            type='text'
            onChange={onChangeHandler}
            value={formData.description}
        />
        <button className="button new-task__submit" type='submit'>Submit New Task</button>
    </form>
)
};
NewTaskForm.propTypes = {
	onAddTask: PropTypes.func.isRequired,
};
export default NewTaskForm;