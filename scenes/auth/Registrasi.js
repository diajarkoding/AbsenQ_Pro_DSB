import React, {Component} from 'react';
import {View, ImageBackground} from 'react-native';
import {
  Content,
  Form,
  Icon,
  Input,
  Item,
  Label,
  Button,
  Text,
  Container,
  Toast,
} from 'native-base';

import {connect} from 'react-redux';
import {tmpRegistrasi} from '../../redux/actions/loginAction';

import {styles, fontAntiColor} from '../styles';
import {loadView} from '../Components/Util';
import * as Check from '../verif';

class Registrasi extends Component {
  state = {
    name: null,
    nameSuccess: false,
    nameFail: false,
    email: null,
    emailSuccess: false,
    emailFail: false,
    nik: null,
    nikSuccess: false,
    nikFail: false,
    phone: null,
    phoneSuccess: false,
    phoneFail: false,
    password: null,
    passwordSuccess: false,
    passwordFail: false,
    repass: null,
    repassSuccess: false,
    repassFail: false,
  };

  _nextButton = () => {
    this.state.emailSuccess
      ? this.props
          .tmpRegistrasi(this.state)
          .then(() => {
            this.props.tmpReducer.name
              ? this.props.navigation.navigate('RegistrasiCompany')
              : Toast.show({
                  text: 'Please input all fields',
                  buttonText: 'Ok',
                  type: 'danger',
                  duration: 5000,
                });
          })
          .catch(err => {
            console.log('login page: ' + err);
          })
      : Toast.show({
          text: 'Please input the correct email',
          buttonText: 'Ok',
          type: 'danger',
          duration: 5000,
        });
  };

  async check(expression) {
    let flag = null;
    switch (expression) {
      case 'nik':
        flag = await Check.Number(this.state.nik);
        this.setState({nikSuccess: flag, nikFail: !flag});
        break;
      case 'name':
        flag = await Check.NotNull(this.state.name);
        this.setState({nameSuccess: flag, nameFail: !flag});
        break;
      case 'phone':
        flag = await Check.Number(this.state.phone);
        this.setState({phoneSuccess: flag, phoneFail: !flag});
        break;
      case 'email':
        flag = await Check.Email(this.state.email);
        this.setState({emailSuccess: flag, emailFail: !flag});
        break;
      case 'password':
        flag = await Check.Password(this.state.password);
        this.setState({passwordSuccess: flag, passwordFail: !flag});
        break;
      case 'repassword':
        flag = await Check.RePassword(this.state.password, this.state.repass);
        this.setState({repassSuccess: flag, repassFail: !flag});
        break;
      default:
    }
    // console.error(flag);
  }

  render() {
    const formUser = (
      <View>
        <Item regular style={styles.registerInput}>
          <Input
            placeholder="Name"
            placeholderTextColor={'grey'}
            // style={{color: 'grey'}}
            onChangeText={name => this.setState({name})}
            defaultValue={this.state.name}
          />
        </Item>
        <Item regular style={styles.registerInput}>
          <Input
            placeholder="Email"
            placeholderTextColor={'grey'}
            // style={{color: 'grey'}}
            onChangeText={email => this.setState({email})}
            onEndEditing={() => this.check('email')}
            keyboardType="email-address"
            autoCapitalize="none"
            defaultValue={this.state.email}
          />
        </Item>
        <Item regular style={styles.registerInput}>
          <Input
            placeholder="Phone"
            placeholderTextColor={'grey'}
            // style={{color: 'grey'}}
            onChangeText={phone => this.setState({phone})}
            keyboardType="numeric"
            autoCapitalize="none"
            defaultValue={this.state.phone}
          />
        </Item>
        <Item regular style={styles.registerInput}>
          <Input
            placeholder="N I K"
            placeholderTextColor={'grey'}
            // style={{color: 'grey'}}
            onChangeText={nik => this.setState({nik})}
            keyboardType="numeric"
            defaultValue={this.state.nik}
          />
        </Item>
        <Item regular style={styles.registerInput}>
          <Input
            placeholder="Password"
            placeholderTextColor={'grey'}
            // style={{color: 'grey'}}
            onChangeText={password => this.setState({password})}
            secureTextEntry={true}
            autoCapitalize="none"
          />
        </Item>
        <Item regular style={styles.registerInput}>
          <Input
            placeholder="Re-Password"
            placeholderTextColor={'grey'}
            // style={{color: 'grey'}}
            onChangeText={repass => this.setState({repass})}
            secureTextEntry={true}
            autoCapitalize="none"
          />
        </Item>
        <Button
          onPress={() => this._nextButton()}
          style={{
            flex: 1,
            margin: 5,
            marginVertical: 15,
            borderRadius: 8,
            justifyContent: 'center',
            backgroundColor: 'green',
          }}>
          <Text>Next</Text>
        </Button>
      </View>
    );

    const mainView = (
      <Content padder>
        <Text
          style={{
            fontSize: 28,
            margin: 5,
            alignSelf: 'center',
            color: fontAntiColor,
            textShadowColor: 'black',
            textShadowOffset: {width: 1, height: 1},
            textShadowRadius: 15,
            fontWeight: 'bold',
          }}>
          Register
        </Text>
        {formUser}
      </Content>
    );

    return (
      <Container style={styles.contentContainerStyle}>
        <ImageBackground
          source={require('../../assets/Background.png')}
          style={{flex: 1, resizeMode: 'cover'}}>
          {this.props.utilReducer.isFetching ? loadView : mainView}
        </ImageBackground>
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
