import React, {Component} from 'react';

import {useIsFocused} from '@react-navigation/native';
import {connect} from 'react-redux';
import {absensiCreate} from '../../redux/actions/absensiAction';

import Selfie from '../Components/selfie';
import {ehandling, shandling} from '../Components/Util';

class HomePhoto extends Component {
  state = {};

  componentDidMount() {}

  next = data => {
    this.props.absensiCreate({photo: data.uri}).then(success => {
      if (success) {
        shandling('Success');
        this.props.navigation.navigate('Auth');
      } else ehandling(this.props);
    });
  };

  render() {
    const {isFocused} = this.props;
    return isFocused ? <Selfie next={data => this.next(data)} /> : null;
  }
}

const Homee = useIsFocused(HomePhoto);

const mapStateToProps = state => {
  return {utilReducer: state.utilReducer};
};

const mapDispatchToProps = {absensiCreate};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Homee);
