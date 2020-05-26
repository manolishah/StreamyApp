import streams from '../api/streams';
import history from '../history';
import {
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from './type';
export const signIns = (userId) => {
    return{
        type:SIGN_IN,
        payload:userId
    };
};
export const signOuts = () =>{
    return{
        type:SIGN_OUT
    };
};
export const createSteam = (formValues) =>  async (dispatch,getState) => {
    const{userId}=getState().auth;
    const response = await streams.post('/streams',{...formValues,userId});
    dispatch({type:CREATE_STREM,payload:response.data});
    history.push('/');
};

export const fetchStreams = () => async dispatch => {
    const response =await streams.get('/streams');
    dispatch({type:FETCH_STREAMS,payload:response.data});
};

export const fetchStream = id => async dispatch => {
    const response =await streams.get(`/streams/${id}`);
    dispatch({type:FETCH_STREAM,payload:response.data});
};

export const editStream = (id,formValues) => async dispatch => {
    const response =await streams.put(`/streams/${id}`,formValues);
    dispatch({type:EDIT_STREAM,payload:response.data});
    history.push('/');
};

export const deleteStream = id => async dispatch => {
    await streams.delete(`/streams/${id}`);
    dispatch({type:DELETE_STREAM,payload:id});
};