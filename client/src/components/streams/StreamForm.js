import React from 'react';
import { Field, reduxForm } from 'redux-form';

import './Stream.css';

class StreamForm extends React.Component {
    renderInputField = ({input, meta, placeholder, type}) => {
        /* All the properties of input should be hooked up with the field --> so use {...input} */
        return(
            <div className="field">
                <label>{input.name}</label>
                <input {...input} type={type} placeholder={placeholder} autoComplete="off" className={ `${meta.error && meta.touched ? 'border-red': ''}` }/>
                {meta.error && meta.touched && <span style={ {color: 'red'} }>{meta.error}</span>}
            </div>
        )
    }
    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);   
    }

    render() {

        return(
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form">
                <Field name="Title" component={this.renderInputField} type="text" placeholder="Enter Title" />
                <Field name="Description" component={this.renderInputField} type="text" placeholder="Enter Description" />
                <div>
                    <button className="ui button primary" type="submit" disabled={this.props.submitting || this.props.invalid }>Submit</button>
                </div>
            </form>
        )
    }
}

// Validation should be a function outside the component's function of class
const inputValidate = (formValues) => {
    const errors = {};
    if(!formValues.Title) {
        errors.Title = "You must enter a title";
    }
    if(!formValues.Description) {
        errors.Description = "You must enter a descrition";
    }
    return errors;
}

export default reduxForm({
    form: 'streamForm', // This is the name of the form. Can be any string value
    validate: inputValidate // Wiring the validate function to the redux form
})(StreamForm);