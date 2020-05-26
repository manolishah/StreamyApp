import React from 'react';
import { connect } from 'react-redux';
import {signIns,signOuts} from '../actions/index';

class GoogleAuth extends React.Component{
 // state={isSignedIn:undefined};
    constructor(props){
        super(props);
        this.onAuthChange=this.onAuthChange.bind(this);
       
    }
    componentDidMount(){
        window.gapi.load('client:auth2',() => {
            window.gapi.client.init({
                clientId:
                    '306822970765-cf5psiuoivjvtj9mq6udltd8sgol40ta.apps.googleusercontent.com',
                scope:'email'
            }).then(() =>{
                this.auth=window.gapi.auth2.getAuthInstance();
                //this.setState({isSignedIn:this.auth.isSignedIn.get()});
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }
    onAuthChange = isSignedIn => {
        if(isSignedIn) {
            this.props.signIns(this.auth.currentUser.get().getId());
        }
        else{
            this.props.signOuts();
        }
        
    }
    onSingInClick = () =>{this.auth.signIn();}
    onSingOutClick = () =>{this.auth.signOut();}
    renderAuthButton(){
        if(this.props.isSignedIn === null){
            return null;
        }else if(this.props.isSignedIn){
            return (
                <button className='ui red google button' onClick={this.onSingOutClick} >
                    <i className="google icon" />
                        Sign Out
                </button>
            );
        }else{return (
            <button className='ui red google button' onClick={this.onSingInClick} >
            <i className="google icon" />
                Sign In with Google
             </button>
        );}
    }
    render(){
        return(
            <div>{this.renderAuthButton()}</div>
        );
    }
}
const mapStateToProps =(state) =>{
    return {isSignedIn:state.auth.isSignedIn};
}
export default connect(
    mapStateToProps,
    {signIns,
    signOuts})
(GoogleAuth);