import { CALL_API } from 'redux-api-middleware';
import { browserHistory } from 'react-router';
import { REQUEST, FAILURE } from './types';

const getSuccessType = (successType, successCb) => {
  const payload = (action, state, res) => {
    const currentContentType = res.headers.get('Content-Type');
    if (currentContentType && currentContentType.indexOf('json') !== -1) {
      return res.json().then(
        (json) => {
          if (json.status === -34) {
            browserHistory.push('/login');
          } else if (json.status <= -30) {
            return {
              apiError: true,
              apiErrorMsg: json.message,
            };
          }
          return successCb(json);
        },
      );
    }
    return null;
  };
  return {
    payload,
    type: successType,
  };
};

const getFailType = () => ({
  type: FAILURE,
  meta: (action, state, res) => {
    if (res) {
      return {
        status: res.status,
        statusText: res.statusText,
      };
    }
    return {
      status: -1,
      statusText: 'Network request failed',
    };
  },
});

export default (args) => {
  const { endpoint, method, body, successType, successCb, requestToast } = args;
  let headers = args.headers;
  const types = [requestToast || REQUEST, getSuccessType(successType, successCb), getFailType()];

  if (!headers) {
    headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
  }
  const apiArgs = { endpoint, method, headers, types, credentials: 'include' };

  return {
    [CALL_API]: (body && method && method.toLowerCase() === 'post') ? { ...apiArgs, body } : apiArgs,
  };
};

