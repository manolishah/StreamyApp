import React from 'react';
import {connect} from 'react-redux';
import {fetchStream} from '../../actions';
import flv from 'flv.js';
class StreamShow extends React.Component{
  constructor(props){
    super(props);
    this.VideoRef = React.createRef();
  }
  componentDidMount(){
    const {id} = this.props.match.params;
    this.props.fetchStream(id);
   this.buildPlay();
  }
  componentDidUpdate(){
    this.buildPlay();
  }
  componentWillUnmount(){
    this.player.destroy();
  }
  buildPlay(){
    if(this.player || !this.props.streams){
      return;
    }
    const {id} = this.props.match.params;
    this.player=flv.createPlayer({
      type:'flv', //type of video is geat
      url: `http://localhost:8000/live/${id}.flv`
    });
    this.player.attachMediaElement(this.VideoRef.current);
    this.player.load();

  }
  render(){
    if(!this.props.streams){
      return <div > Loading .....</div>;
    }
    return(
      <div>
        <video ref={this.VideoRef} style={{width:'100%' }} controls />
        <h1>{this.props.streams.title}</h1>
        <h5>{this.props.streams.description}</h5>
      </div>
    );
  
  }
}
const mapStateProps = (state,ownProps) =>{
  return {streams:state.streams[ownProps.match.params.id]};
}
export default connect(mapStateProps,{fetchStream})(StreamShow);
  