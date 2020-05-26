import React from 'react';
import {connect} from 'react-redux';
import StreamForm from './streamsForm';
import _ from 'lodash';
import {fetchStream,editStream} from '../../actions';
class StreamEdit extends React.Component{
  componentDidMount(){
    this.props.fetchStream(this.props.match.params.id);
  }
  onSubmit = formValues =>{
    this.props.editStream(this.props.match.params.id,formValues);
  }
  render(){
    if(!this.props.streams){
      return <div > Loading .....</div>;
    }
    return(
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm 
        initialValues={_.pick(this.props.streams,'title','description')}
        onSubmit={this.onSubmit}/>
      </div>
    );
  
    
  }
};
const mapStateProps = (state,ownProps) =>{
  return {streams:state.streams[ownProps.match.params.id]};
} 
export default connect(mapStateProps,{fetchStream,editStream}) (StreamEdit);
  