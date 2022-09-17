import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';
import {toastr} from 'react-redux-toastr'

import { 
    GET_RECORDS, 
    SET_RECORDS,
    ADD_RECORD
} from './types';

export const doGuessing = (mode, before) => dispatch => {
    axios
        .post('/guess', {mode: mode, before: before})
        .then(res => {
            if(res.data.user === jwt_decode(localStorage.jwtToken).id) {
                const goal = res.data.guessResult;

                if(goal) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Your Guessing Result',
                        text: 'Good luck! You are right :)'
                      })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Your Guessing Result',
                        text: 'Oops... You are wrong :('
                      })
                }

                dispatch({
                    type: ADD_RECORD,
                    payload: res.data
                });
            }
        })
        .catch(err => {
            toastr.warning('Warning', err.response.data);
        });
}

export const getRecords = () => dispatch => {
    dispatch({
        type: GET_RECORDS,
        payload: null
    });

    axios
        .get('/guess/records')
        .then(res => {
            dispatch({
                type: SET_RECORDS,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
}