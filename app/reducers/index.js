import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import { common } from './common'
import { user } from './user'

export default combineReducers({
  routing,
  common,
  user,
  form
})
