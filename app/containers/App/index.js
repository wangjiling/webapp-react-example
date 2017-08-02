import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

import style from './style.css'

class App extends Component {

  constructor(props, context) {
      super(props, context)
  }

  componentWillUpdate(nextProps, nextState) {
  }

  componentWillMount(){
  }

  handleLogout = () => {
  }

  render() {
    const { userName, children, tdShow, tdContent } = this.props
    return (
      <div className={style.appContainer}>
        <Header onLogout={this.handleLogout} userName={userName}></Header>
        <div className={style.appContent}>
          {children}
        </div>
        <Footer></Footer>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { logoutStatus, userName } = state.user
  return {
      userName,
      logoutStatus,
      tdShow: state.common.tdShow,
      tdContent: state.common.tdContent
  }
}


export default connect(
  mapStateToProps
)(App)
