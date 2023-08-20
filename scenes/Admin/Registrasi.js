import React, {Component} from 'react';
import {View} from 'react-native';
import {Button, Container, Content, Input, Item, Text} from 'native-base';

import {connect} from 'react-redux';
import {tmpRegistrasi} from '../../redux/actions/tmpAction';

import {styles} from '../styles';
import HeaderCostum from '../Components/HeaderCostum';
import {loadView, ehandling, inputHandling} from '../Components/Util';
import * as Check from '../verif';

class Registrasi extends Component {
  state = {
    name: null,
    email: null,
    nik: null,
    phone: null,
    password: null,
    repass: null,
    nameSuccess: true,
    emailSuccess: true,
    nikSuccess: true,
    phoneSuccess: true,
    passwordSuccess: true,
    repassSuccess: true,
    // name: 'Andi Akram Yusuf',
    // email: 'andi.yusuf@smma.co.id',
    // nik: '190051',
    // phone: '081234567891',
    // password: 'Test1234',
    // repass: 'Test1234',
  };

  _nextButton = async () => {
    let flag = await this.check();
    flag
      ? this.props.tmpRegistrasi(this.state).then(success => {
          success
            ? this.props.navigation.navigate('RegistrasiPhoto')
            : ehandling(this.props);
        })
      : inputHandling('Please correct your input(s)');
  };

  async check() {
    var nameSuccess = await Check.NotNull(this.state.name);
    var emailSuccess = await Check.Email(this.state.email);
    var phoneSuccess = await Check.Hp(this.state.phone);
    var nikSuccess = await Check.NotNull(this.state.nik);
    var passwordSuccess = await Check.Password(this.state.password);
    var repassSuccess = await Check.RePassword(
      this.state.password,
      this.state.repass,
    );

    this.setState({
      nameSuccess,
      emailSuccess,
      phoneSuccess,
      nikSuccess,
      passwordSuccess,
      repassSuccess,
    });

    let flag = false;
    if (
      nameSuccess &&
      emailSuccess &&
      phoneSuccess &&
      nikSuccess &&
      passwordSuccess &&
      repassSuccess
    )
      flag = true;
    else flag = false;

    return flag;
  }

  render() {
    const {
      nameSuccess,
      emailSuccess,
      nikSuccess,
      phoneSuccess,
      passwordSuccess,
      repassSuccess,
    } = this.state;

    const formUser = (
      <View>
        <Item
          regular
          style={nameSuccess ? styles.inputGrey : styles.inputWhiteFalse}>
          <Input
            placeholder="Name"
            placeholderTextColor={'grey'}
            onChangeText={name => this.setState({name, nameSuccess: true})}
            defaultValue={this.state.name}
          />
        </Item>
        {nameSuccess ? null : (
          <Text style={styles.textWarn}>*at least 3 characters</Text>
        )}
        <Item
          regular
          style={emailSuccess ? styles.inputGrey : styles.inputWhiteFalse}>
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
          style={phoneSuccess ? styles.inputGrey : styles.inputWhiteFalse}>
          <Input
            placeholder="Phone"
            placeholderTextColor={'grey'}
            onChangeText={phone => this.setState({phone, phoneSuccess: true})}
            keyboardType="numeric"
            autoCapitalize="none"
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
          style={nikSuccess ? styles.inputGrey : styles.inputWhiteFalse}>
          <Input
            placeholder="N I K"
            placeholderTextColor={'grey'}
            onChangeText={nik => this.setState({nik, nikSuccess: true})}
            defaultValue={this.state.nik}
          />
        </Item>
        {nikSuccess ? null : (
          <Text style={styles.textWarn}>*please input the NIK</Text>
        )}
        <Item
          regular
          style={passwordSuccess ? styles.inputGrey : styles.inputWhiteFalse}>
          <Input
            placeholder="Password"
            placeholderTextColor={'grey'}
            onChangeText={password =>
              this.setState({password, passwordSuccess: true})
            }
            defaultValue={this.state.password}
            secureTextEntry={true}
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
          style={repassSuccess ? styles.inputGrey : styles.inputWhiteFalse}>
          <Input
            placeholder="Re-Password"
            placeholderTextColor={'grey'}
            onChangeText={repass =>
              this.setState({repass, repassSuccess: true})
            }
            defaultValue={this.state.repass}
            secureTextEntry={true}
            autoCapitalize="none"
          />
        </Item>
        {repassSuccess ? null : (
          <Text style={styles.textWarn}>*please input the same password</Text>
        )}
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
        <HeaderCostum title={'Register'} />
        {this.props.utilReducer.isFetching ? loadView : mainView}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {utilReducer: state.utilReducer, tmpReducer: state.tmpReducer};
};

const mapDispatchToProps = {tmpRegistrasi};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Registrasi);
