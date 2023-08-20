import React, {Component} from 'react';
import {View, ImageBackground} from 'react-native';
import {Button, Container, Content, Input, Item, Text} from 'native-base';

import {connect} from 'react-redux';
import {reqReset} from '../../redux/actions/resetAction';

import {styles, fontAntiColor} from '../styles';
import {
  loadView,
  ehandling,
  inputHandling,
  shandling,
} from '../Components/Util';
import * as Check from '../verif';

class ReqReset extends Component {
  state = {
    email: null,
    nik: null,
    phone: null,
    emailSuccess: true,
    nikSuccess: true,
    phoneSuccess: true,
  };

  _nextButton = async () => {
    let flag = await this.check();
    flag
      ? this.props.reqReset(this.state).then(success => {
          if (success) {
            shandling('SUCCESS request reset password, check your email');
            this.props.navigation.navigate('Reset');
          } else ehandling(this.props);
        })
      : inputHandling('Please correct your input(s)');
  };

  async check() {
    var emailSuccess = await Check.Email(this.state.email);
    var phoneSuccess = await Check.NotNull(this.state.phone);
    var nikSuccess = await Check.NotNull(this.state.nik);
    this.setState({emailSuccess, phoneSuccess, nikSuccess});

    let flag = false;
    if (emailSuccess && phoneSuccess && nikSuccess) flag = true;
    else flag = false;

    return flag;
  }

  render() {
    const {emailSuccess, phoneSuccess, nikSuccess} = this.state;

    const formUser = (
      <View>
        <Item
          regular
          style={emailSuccess ? styles.inputWhite : styles.inputWhiteFalse}>
          <Input
            placeholder="Email"
            placeholderTextColor={'grey'}
            onChangeText={email => this.setState({email, emailSuccess: true})}
            keyboardType="email-address"
            autoCapitalize="none"
            defaultValue={this.state.email}
          />
        </Item>
        {emailSuccess ? null : (
          <Text style={styles.textWarn}>*please input the correct email</Text>
        )}
        <Item
          regular
          style={phoneSuccess ? styles.inputWhite : styles.inputWhiteFalse}>
          <Input
            placeholder="Phone"
            placeholderTextColor={'grey'}
            onChangeText={phone => this.setState({phone, phoneSuccess: true})}
            defaultValue={this.state.phone}
          />
        </Item>
        {phoneSuccess ? null : (
          <Text style={styles.textWarn}>
            *please input the correct phone number
          </Text>
        )}
        <Item
          regular
          style={nikSuccess ? styles.inputWhite : styles.inputWhiteFalse}>
          <Input
            placeholder="N I K"
            placeholderTextColor={'grey'}
            onChangeText={nik => this.setState({nik, nikSuccess: true})}
            defaultValue={this.state.nik}
          />
        </Item>
        {nikSuccess ? null : (
          <Text style={styles.textWarn}>*please input the correct NIK</Text>
        )}
        <Button
          onPress={() => this._nextButton()}
          style={styles.buttonGreenFullRadius}>
          <Text>Request</Text>
        </Button>
      </View>
    );

    const mainView = (
      <Content padder>
        <Text style={styles.textWithShadow}>Reset Password</Text>
        {formUser}
      </Content>
    );

    return (
      <Container>
        <ImageBackground
          source={require('../../assets/Background.png')}
          style={styles.imageBackgroundContainer1}>
          {this.props.utilReducer.isFetching ? loadView : mainView}
        </ImageBackground>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {utilReducer: state.utilReducer, tmpReducer: state.tmpReducer};
};

const mapDispatchToProps = {reqReset};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReqReset);
