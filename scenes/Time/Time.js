import React, {Component} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Button, CheckBox, Container, Text} from 'native-base';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {connect} from 'react-redux';
import {timeSet, timeGet} from '../../redux/actions/timeAction';

import {styles} from '../styles';
import HeaderCostum from '../Components/HeaderCostum';
import {loadView, ehandling, shandling} from '../Components/Util';

class Time extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showWI: false,
      in: '08:00:00',
      showWO: false,
      out: '17:00:00',
    };
  }

  componentDidMount() {
    this.props.timeGet().then((success) => {
      if (!success) ehandling(this.props);
      else {
        this.setState({
          in: this.props.timeReducer.in,
          out: this.props.timeReducer.out,
        });
      }
    });
  }

  timeToDb = () => {
    this.props.timeSet(this.state).then((success) => {
      if (success) shandling('SUCCESS Set time');
      else ehandling(this.props);
    });
  };

  stateTime = (time, day, io) => {
    var tmpTime = moment(time).seconds(0).format('HH:mm:ss').toString();

    if (day == 'weekday' && io == 'in')
      this.setState({in: tmpTime, showWI: false});
    else if (day == 'weekday' && io == 'out')
      this.setState({out: tmpTime, showWO: false});
  };

  render() {
    const mainView = (
      <View
        style={{margin: 10, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{flexDirection: 'row', margin: 10}}>
          <TouchableOpacity
            onPress={() => this.setState({showWI: true})}
            style={{flex: 1, alignItems: 'center'}}>
            <Text>In</Text>
            <Moment element={Text} format="HH:mm:ss">
              {moment(this.state.in, 'HH:mm:ss')}
            </Moment>
            <DateTimePickerModal
              date={new Date(moment(this.state.in, 'HH:mm:ss').utc())}
              isVisible={this.state.showWI}
              mode="time"
              display="spinner"
              onConfirm={(time) => this.stateTime(time, 'weekday', 'in')}
              onCancel={() => this.setState({showWI: false})}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({showWO: true})}
            style={{flex: 1, alignItems: 'center'}}>
            <Text>Out</Text>
            <Moment element={Text} format="HH:mm:ss">
              {moment(this.state.out, 'HH:mm:ss')}
            </Moment>
            <DateTimePickerModal
              date={new Date(moment(this.state.out, 'HH:mm:ss').utc())}
              isVisible={this.state.showWO}
              mode="time"
              display="spinner"
              onConfirm={(time) => this.stateTime(time, 'weekday', 'out')}
              onCancel={() => this.setState({showWO: false})}
            />
          </TouchableOpacity>
        </View>
        <Button
          style={{backgroundColor: 'green', margin: 15, alignSelf: 'center'}}
          onPress={() => this.timeToDb()}>
          <Text>save</Text>
        </Button>
      </View>
    );

    return (
      <Container>
        <HeaderCostum title={'Time'} />
        {this.props.utilReducer.isFetching ? loadView : mainView}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {utilReducer: state.utilReducer, timeReducer: state.timeReducer};
};

const mapDispatchToProps = {timeSet, timeGet};

export default connect(mapStateToProps, mapDispatchToProps)(Time);
