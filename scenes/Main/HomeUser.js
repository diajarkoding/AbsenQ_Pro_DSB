import React, {Component} from 'react';
import {AppState, Image, Text, TouchableOpacity, View} from 'react-native';
import {Container} from 'native-base';

import {connect} from 'react-redux';
import {fetchingRequest, validation} from '../../redux/actions/utilAction';
import {tracking} from '../../redux/actions/trackingAction';

import {styles} from '../styles';
import HeaderCostum from '../Components/HeaderCostum';
import {loadView, ehandling} from '../Components/Util';

import Geolocation from 'react-native-geolocation-service';
import moment from 'moment';

//break is bug if the health q is not the first one

class HomeUser extends Component {
  constructor(props) {
    super(props);
    this.state = {isRunning: false};
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    this.props.navigation.addListener('didFocus', payload => {
      //check if the are mandatory fitures or none
      const {active} = this.props.fitureReducer;
      for (var i = 0; i < active.length; i++) {
        console.log(active);
        if (active[i].status && active[i].mandatory && !active[i].done) {
          this.props.navigation.navigate(active[i].name);
        }
        break;
      }
    });

    // this.props.navigation.navigate('Health Questionnaire');

   Geolocation.configure({
  desiredAccuracy: Geolocation.HIGH_ACCURACY,
  distanceFilter: 50,
  interval: 3600000,
  fastestInterval: 1800000,
  activitiesInterval: 3600000,
  stopOnTerminate: true,
  startOnBoot: false,
  pauseLocationUpdatesAutomatically: false,
  // You can add more configuration options here
});
    Geolocation.removeAllListeners();

   Geolocation.addEventListener('location', location => {
      this.track(location, 'loc');
    });

   Geolocation.addEventListener('geofence', location => {
      this.track(location, 'stat');
    });

    Geolocation.start();
  }

   async track(location, from) {
    const body = { lat: location.latitude, lon: location.longitude };
    console.log(moment().format('YYYY-MM-DD hh:mm:ss'), 'Geolocation', body, from);
    var format = 'hh:mm:ss';
    var current = moment();
    if (current.isAfter(moment('07:00:00', format))) {
      await this.props.tracking(body);
    }
    if (current.isAfter(moment('18:00:00', format))) {
      Geolocation.stop();
      Geolocation.removeAllListeners();
    }
  }


  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    if (nextAppState === 'active') {
      this.props.validation().then(success => {
        if (!success) ehandling(this.props);
      });
    } else if (nextAppState === 'background') this.props.fetchingRequest();
  };

  render() {
    const mainView = (
      <View style={styles.containerSpace}>
        <View />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('HomePhoto')}
          style={styles.buttonQ}>
          <Image
            source={require('../../assets/button.png')}
            style={styles.iconQButton}
          />
        </TouchableOpacity>
        <Text style={{margin: 10}}>Note : press Q for submit attendance</Text>
      </View>
    );

    return (
      <Container>
        <HeaderCostum />
        {this.props.utilReducer.isFetching ? loadView : mainView}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {utilReducer: state.utilReducer, fitureReducer: state.fitureReducer};
};

const mapDispatchToProps = {fetchingRequest, validation, tracking};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeUser);
