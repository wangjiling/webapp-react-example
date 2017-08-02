import cookie from 'react-cookie';
import { CALL_API } from 'redux-api-middleware';

export default store => next => action => {
  const callApi = action[CALL_API]

  // Check if this action is a redux-api-middleware action.
  if (callApi) {
    //console.log(callApi.headers);
  }

  // Pass the FSA to the next action.
  return next(action)

}