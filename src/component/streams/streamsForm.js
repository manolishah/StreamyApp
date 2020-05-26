import React from 'react';
import {Field,reduxForm} from 'redux-form';
class  StreamForm extends React.Component{
  renderError({error,touched }){
    if(touched && error){
      return(
        <div className='ui error message'>
          <div className='header'>{error}</div>
        </div>
      );
    }
  }
  renderInput = ({input , label,meta}) => {
    return(
      <div className='field'>
        <label> {label}</label>
        <input {...input} autoComplete='off'/>
        {this.renderError(meta)}
      </div>
    );
  }
  onSubmit = formValues =>{
    this.props.onSubmit(formValues);
  }
  render(){
    return (
      <form className='ui form error' onSubmit={this.props.handleSubmit(this.onSubmit)}> 
        <Field 
        name="title" 
        component={this.renderInput}
        label="Enter Title"
         />
        <Field 
        name="description" 
        component={this.renderInput} 
        label="Enter Description"
        />
        <button className='ui button primary'>submit</button>
      </form>
    );
  } 
}
const validate = (formValues) =>{
  const error = {};
  if(!formValues.title){
    error.title='You must enter a title';
  }
  if(!formValues.description){
    error.description='You must enter a description';
  }
  return error;
}
export default reduxForm({
  form:'streamForm',
  validate
})(StreamForm);

  