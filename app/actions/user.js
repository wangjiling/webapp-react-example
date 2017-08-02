import { browserHistory } from 'react-router'
import { CALL_API } from 'redux-api-middleware';
import { api_login } from '../constants'
import { getToken, serialize } from '../constants/util'
import { USER_LOGIN } from './types'
import queryBase from './base'

//login
const login = params => queryBase({
    endpoint: api_login,
    method: 'post',
    body: params?serialize(params):null,
    successType: USER_LOGIN,
    successCb: json => ({})
})

export const userLogin = params => dispatch => {
    return dispatch(login(params));
};