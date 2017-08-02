import { TOAST_SHOW, USER_LOGIN } from '../actions/types';

const initialState = {
    tdShow: false,//toast dialog
    tdContent: '',
};

export const common = (state = initialState, action) => {
    switch(action.type) {
        case TOAST_SHOW:
            return {
                ...state,
                tdShow: true,
                tdContent: action.meta.tdContent
            };

        case USER_LOGIN:
            return {
                ...state,
                tdShow: false,
                tdContent: '',
            };
        default: {
            /* Return original state if no actions were consumed. */
            return state;
        }
    }
};