import style from './style.css'

import React, {
    PropTypes,
    Component
} from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UserActions from '../../actions/user';

class Home extends Component {
    componentWillMount(){
        const { actions } = this.props;
    }

    render() {
        const {actions} = this.props;
        return (
            <DocumentTitle title='example'>
                <div className={style.homeContainer}>
                </div>
            </DocumentTitle>
        )
    }
}

Home.displayName = 'Home';

function mapStateToProps(state) {
    const props = {
    };
    return props;
}

function mapDispatchToProps(dispatch) {
    const actionMap = { actions: bindActionCreators(Object.assign({}, UserActions), dispatch) };
    return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

