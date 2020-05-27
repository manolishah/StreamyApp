import React,{Fragment} from 'react';
import Modal from '../model';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {deleteStream,fetchStream} from '../../actions';
import history from '../../history';
class StreamDelete extends React.Component{
  componentDidMount(){
    this.props.fetchStream(this.props.match.params.id);
  }
  renderAction(){
    const {id}= this.props.match.params;
  return(
    <Fragment>
      <button  onClick={()=>this.props.deleteStream(id)} className='ui  button negative'>Delete</button>
      <Link to='/' className='ui button'>Cancel</Link>
    </Fragment>
  );
};


renderContent(){
  if(!this.props.streams){
    return 'Are you sure you want delete the stream?';
  }
  return `Are you sure you want delete the stream with title : ${this.props.streams.title}`
};
 render(){
    return (
       <Modal 
       title="Delete Stream"
       content={this.renderContent()}
       actions={this.renderAction()}
       onDismiss={()=>history.push('/')}
       />
    );
 }
}
const mapStateToProps = (state,ownProps) =>{
  return {streams:state.streams[ownProps.match.params.id]}
};
export default connect(mapStateToProps,{deleteStream,fetchStream}) (StreamDelete);
  