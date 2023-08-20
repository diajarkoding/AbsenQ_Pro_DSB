import React, {Component} from 'react';
import {View, ImageBackground} from 'react-native';
import {Button, Container, Content, Input, Item, Text} from 'native-base';

import {connect} from 'react-redux';
import {reset} from '../../redux/actions/loginAction';

import {styles, fontAntiColor} from '../styles';
import {
  loadView,
  ehandling,
  inputHandling,
  shandling,
} from '../Components/Util';
import * as Check from '../verif';

class Reset extends Component {
  state = {
    otp: null,
    otpSuccess: true,
    password: null,
    passwordSuccess: true,
    repass: null,
    repassSuccess: true,
  };

  _nextButton = async () => {
    const tmp = this.props.tmpReducer;
    // console.log(tmp);
    let flag = await this.check();
    var body = {
      nik: tmp.nik,
      email: tmp.email,
      phone: tmp.phone,
      otp: this.state.otp,
      password: this.state.password,
      repass: this.state.repass,
    };

    flag
      ? this.props.reset(body).then(success => {
          if (success) {
            shandling('SUCCESS reset password');
            this.props.navigation.navigate('Auth');
          } else ehandling(this.props);
        })
      : inputHandling('Please correct your input(s)');
  };

  async check() {
    var otpSuccess = await Check.Otp(this.state.otp);
    var passwordSuccess = await Check.Password(this.state.password);
    var repassSuccess = await Check.RePassword(
      this.state.password,
      this.state.repass,
    );

    this.setState({otpSuccess, passwordSuccess, repassSuccess});

    let flag = false;
    if (otpSuccess && passwordSuccess && repassSuccess) flag = true;
    else flag = false;

    return flag;
  }

  render() {
    const {otpSuccess, passwordSuccess, repassSuccess} = this.state;

    const formUser = (
      <View>
        <Item
          regular
          style={otpSuccess ? styles.inputWhite : styles.inputWhiteFalse}>
          <Input
            placeholder="Code"
            placeholderTextColor={'grey'}
            onChangeText={otp => this.setState({otp, otpSuccess: true})}
            keyboardType="numeric"
            defaultValue={this.state.otp}
          />
        </Item>
        {otpSuccess ? null : (
          <Text style={styles.textWarn}>*please input the correct code</Text>
        )}
        <Item
          regular
          style={passwordSuccess ? styles.inputWhite : styles.inputWhiteFalse}>
          <Input
            placeholder="New Password"
            placeholderTextColor={'grey'}
            onChangeText={password =>
              this.setState({password, passwordSuccess: true})
            }
            secureTextEntry={true}
            defaultValue={this.state.password}
            autoCapitalize="none"
          />
        </Item>
        {passwordSuccess ? null : (
          <Text style={styles.textWarn}>
            *at least 8 characters, 1 uppercase, 1 lowercase, 1 number
          </Text>
        )}
        <Item
          regular
          style={repassSuccess ? styles.inputWhite : styles.inputWhiteFalse}>
          <Input
            placeholder="Re-Password"
            placeholderTextColor={'grey'}
            onChangeText={repass =>
              this.setState({repass, repassSuccess: true})
            }
            secureTextEntry={true}
            defaultValue={this.state.repass}
            autoCapitalize="none"
          />
        </Item>
        {repassSuccess ? null : (
          <Text style={styles.textWarn}>*please input the same password</Text>
        )}
        <Button
          onPress={() => this._nextButton()}
          style={styles.buttonGreenFullRadius}>
          <Text>Reset</Text>
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

const mapDispatchToProps = {reset};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Reset);
