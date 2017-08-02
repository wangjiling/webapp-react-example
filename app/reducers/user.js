'use strict';

import { USER_LOGIN } from '../actions/types';

const initialState = {
    user: null
};

export const user = (state = initialState, action) => {
    switch(action.type) {
        case 'REQUEST':
            return {
                ...state,
                requesting: true,
            };

        case USER_LOGIN:
            return {
                ...state,
                user: action.payload && action.payload.user,
                requesting: false,
            }

        case 'FAILURE':
            return{
                ...state,
                requesting: false,
            };

        default: {
            /* Return original state if no actions were consumed. */
            return state;
        }
    }
};