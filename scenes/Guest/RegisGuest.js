import React, {Component} from 'react';
import {FlatList, Image, View} from 'react-native';
import {
  Button,
  Container,
  Content,
  DatePicker,
  Input,
  Item,
  Text,
} from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';

import {connect} from 'react-redux';
import {tmpRegisGuest} from '../../redux/actions/tmpAction';

import {styles} from '../styles';
import HeaderCostum from '../Components/HeaderCostum';
import {loadView, ehandling, inputHandling} from '../Components/Util';

import moment from 'moment';

import * as Check from '../verif';

class RegisGuest extends Component {
  state = {
    dateString: 'Date',
    date: null,
    dateSuccess: true,
    listt: [
      {
        name: null,
        nameSuccess: true,
        email: null,
        emailSuccess: true,
        phone: null,
        phoneSuccess: true,
      },
    ],
    location: null,
    locationSuccess: true,
    purpose: null,
    purposeSuccess: true,
    isDateTimePickerVisible: false,
  };

  _nextButton = async () => {
    let flag = await this.check();
    this.setState({isDateTimePickerVisible: false});
    flag
      ? this.props.tmpRegisGuest(this.state).then(success => {
          success
            ? this.props.navigation.navigate('GuestPhoto')
            : ehandling(this.props);
        })
      : inputHandling('Please correct your input(s)');
  };

  async check() {
    var failTotal = 0;
    // var i = 0;
    var tmp = [...this.state.listt];
    // await this.state.listt.forEach(async (data, i) => {
    //   console.log('pertama ', tmp[i]);
    //   tmp[i].nameSuccess = await Check.NotNull(data.name);
    //   tmp[i].emailSuccess = await Check.Email1(data.email);
    //   tmp[i].phoneSuccess = await Check.Hp(data.phone);
    //   console.log('kedua ', tmp[i]);
    //   if (!tmp[i].nameSuccess) await failTotal++;
    //   if (!tmp[i].emailSuccess) await failTotal++;
    //   if (!tmp[i].phoneSuccess) await failTotal++;
    //   i++;
    // });

    for (let i = 0; i < this.state.listt.length; i++) {
      console.log('pertama ', tmp[i]);
      tmp[i].nameSuccess = await Check.NotNull(this.state.listt[i].name);
      tmp[i].emailSuccess = await Check.Email1(this.state.listt[i].email);
      tmp[i].phoneSuccess = await Check.Hp(this.state.listt[i].phone);
      console.log('kedua ', tmp[i]);
      if (!tmp[i].nameSuccess) await failTotal++;
      if (!tmp[i].emailSuccess) await failTotal++;
      if (!tmp[i].phoneSuccess) await failTotal++;
    }

    var locationSuccess = await Check.NotNull(this.state.location);
    var purposeSuccess = await Check.NotNull(this.state.purpose);
    var dateSuccess = this.state.date != null ? true : false;

    await this.setState({
      listt: tmp,
      locationSuccess,
      purposeSuccess,
      dateSuccess,
    });

    let flag = false;
    if (failTotal == 0 && locationSuccess && purposeSuccess && dateSuccess)
      flag = true;
    else flag = false;

    return flag;
  }

  showDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: true, dateSuccess: true});
  };

  hideDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: false});
  };

  handleDatePicked = date => {
    this.hideDateTimePicker();
    var string = moment(date).format('YYYY-MM-DD HH:mm');
    this.setState({date: moment(date).format(), dateString: string});
  };

  guest = () => {
    return this.state.listt.map((data, i) => (
      <>
        <Item
          regular
          style={data.nameSuccess ? styles.inputGrey : styles.inputWhiteFalse}>
          <Input
            placeholder={'Guest Name ' + (i + 1).toString()}
            placeholderTextColor={'grey'}
            onChangeText={name => this.handleChange(i, 'name', name)}
            defaultValue={data.name}
          />
        </Item>
        {data.nameSuccess ? null : (
          <Text style={styles.textWarn}>*at least 3 characters</Text>
        )}
        <Item
          regular
          style={data.emailSuccess ? styles.inputGrey : styles.inputWhiteFalse}>
          <Input
            placeholder={'Guest Email ' + (i + 1).toString()}
            placeholderTextColor={'grey'}
            onChangeText={email => this.handleChange(i, 'email', email)}
            keyboardType="email-address"
            autoCapitalize="none"
            defaultValue={data.email}
          />
        </Item>
        {data.emailSuccess ? null : (
          <Text style={styles.textWarn}>*please input the correct email</Text>
        )}
        <Item
          regular
          style={data.phoneSuccess ? styles.inputGrey : styles.inputWhiteFalse}>
          <Input
            placeholder={'Guest Phone ' + (i + 1).toString()}
            placeholderTextColor={'grey'}
            onChangeText={phone => this.handleChange(i, 'phone', phone)}
            keyboardType="numeric"
            autoCapitalize="none"
            defaultValue={data.phone}
          />
        </Item>
        {data.phoneSuccess ? null : (
          <Text style={styles.textWarn}>
            *please input the correct phone number
          </Text>
        )}
      </>
    ));
  };

  _addPeopleBut = () => {
    if (this.state.listt.length >= 3) return true;
    let listt = [
      ...this.state.listt,
      {
        name: null,
        nameSuccess: true,
        email: null,
        emailSuccess: true,
        phone: null,
        phoneSuccess: true,
      },
    ];
    this.setState({listt});
  };

  _removePeopleBut = () => {
    if (this.state.listt.length <= 1) return true;
    let listt = [...this.state.listt];
    listt.pop();
    this.setState({listt});
  };

  handleChange(i, what, data) {
    let listt = [...this.state.listt];
    switch (what) {
      case 'email':
        listt[i].email = data;
        listt[i].emailSuccess = true;
        break;
      case 'name':
        listt[i].name = data;
        listt[i].nameSuccess = true;
        break;
      case 'phone':
        listt[i].phone = data;
        listt[i].phoneSuccess = true;
        break;
    }
    this.setState({listt});
  }

  render() {
    const {
      date,
      dateString,
      dateSuccess,
      locationSuccess,
      purposeSuccess,
    } = this.state;

    let tomorrow = moment(new Date())
      .add(1, 'day')
      .toDate();

    const formUser = (
      <View>
        <DateTimePicker
          minimumDate={tomorrow}
          isVisible={this.state.isDateTimePickerVisible}
          mode="datetime"
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
        <Item
          regular
          style={dateSuccess ? styles.inputGrey : styles.inputWhiteFalse}>
          <Text
            style={{
              flex: 2,
              color: date ? null : 'grey',
              marginLeft: 9,
              margin: 13,
            }}>
            {dateString}
          </Text>
          <Button
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              // marginHorizontal: 10,
              justifyContent: 'center',
              backgroundColor: 'green',
            }}
            onPress={this.showDateTimePicker}>
            <Text>date</Text>
          </Button>
        </Item>
        {dateSuccess ? null : (
          <Text style={styles.textWarn}>*please select a date</Text>
        )}

        <Item
          regular
          style={locationSuccess ? styles.inputGrey : styles.inputWhiteFalse}>
          <Input
            placeholder="Meeting Location"
            placeholderTextColor={'grey'}
            onChangeText={location =>
              this.setState({location, locationSuccess: true})
            }
            defaultValue={this.state.location}
          />
        </Item>
        {locationSuccess ? null : (
          <Text style={styles.textWarn}>*please input the location</Text>
        )}
        <Item
          regular
          style={purposeSuccess ? styles.inputGrey : styles.inputWhiteFalse}>
          <Input
            placeholder="Meeting Purpose"
            placeholderTextColor={'grey'}
            onChangeText={purpose =>
              this.setState({purpose, purposeSuccess: true})
            }
            defaultValue={this.state.purpose}
            multiline={true}
            numberOfLines={4}
          />
        </Item>
        {purposeSuccess ? null : (
          <Text style={styles.textWarn}>
            *please input the purpose of the meeting
          </Text>
        )}
        {this.guest()}
        {this.state.listt.length > 1 ? (
          <Button
            onPress={() => this._removePeopleBut()}
            style={{...styles.buttonGreenFullRadius, backgroundColor: 'red'}}>
            <Text>remove guest</Text>
          </Button>
        ) : null}
        <Button
          onPress={() => this._addPeopleBut()}
          style={styles.buttonGreenFullRadius}>
          <Text>add guest</Text>
        </Button>
        <Button
          onPress={() => this._nextButton()}
          style={styles.buttonGreenFullRadius}>
          <Text>Next</Text>
        </Button>
      </View>
    );

    const mainView = <Content padder>{formUser}</Content>;

    return (
      <Container>
        <HeaderCostum title="Guest" />
        {this.props.utilReducer.isFetching ? loadView : mainView}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    utilReducer: state.utilReducer,
    authReducer: state.authReducer,
    cardReducer: state.cardReducer,
  };
};

const mapDispatchToProps = {tmpRegisGuest};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisGuest);
