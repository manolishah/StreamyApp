import _ from 'lodash';
import {
    CREATE_STREM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from '../actions/type';

export default (state = {},action) => {
    switch(action.type){
        case CREATE_STREM:
            return {...state,[action.payload.id]:action.payload};
        case FETCH_STREAMS:
            return {...state,..._.mapKeys(action.payload,'id')};
        //add new single stream 
        case FETCH_STREAM:
            //retun new aryyy first id and data
            return {...state,[action.payload.id]:action.payload};
        case EDIT_STREAM:
            return {...state,[action.payload.id]:action.payload};
        case DELETE_STREAM:
            return _.omit(state,action.payload);
        default:
            return state;
    }
};