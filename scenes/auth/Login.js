import React, {Component} from 'react';
import {AsyncStorage, Image, ImageBackground, View} from 'react-native';
import {Button, Container, Icon, Input, Item, Text} from 'native-base';

import {connect} from 'react-redux';
import {login} from '../../redux/actions/loginAction';
import {auth} from '../../redux/actions/utilAction';

import {styles, backGBlueColor, fontAntiColor} from '../styles';
import {loadView, generateId, ehandling} from '../Components/Util';

// @refresh reset

class Login extends Component {
  static navigationOptions = {
    headerMode: 'none',
  };
  state = {
    email: 'andi.yusuf@smma.co.id',
    password: 'Wasd1234',
    tmpPhoto: null,
  };
  state = {
    email: 'hr.it@danasaham.co.id',
    password: 'Test1234',
    tmpPhoto: null,
  };
  state = {email: null, password: null, tmpPhoto: null};

  async componentDidMount() {
    // await AsyncStorage.removeItem('photo');

    const tmpPhoto = await AsyncStorage.getItem('photo');
    if (tmpPhoto != null) this.setState({tmpPhoto: tmpPhoto});
    // this.props.navigation.navigate('ReqReset');
  }

  _loginButton = () => {
    const body = {email: this.state.email, password: this.state.password};
    this.props.login(body).then(success => {
      if (success) {
        switch (this.props.authReducer.whatami) {
          case 1:
            console.log('As a company admin');
            this.props.navigation.navigate('Admin');
            break;
          case 2:
            console.log('As a user');
            this.props.navigation.navigate('User');
            break;
          default:
            this.props.navigation.navigate('Login');
        }
      } else ehandling(this.props);
    });
  };

  render() {
    const mainView = (
      <ImageBackground
        source={require('../../assets/Background.png')}
        style={styles.imageBackgroundContainer}>
        <View />
        <View>
          <Text
            style={{
              fontSize: 50,
              margin: 5,
              alignSelf: 'center',
              color: 'white',
              textShadowColor: 'black',
              textShadowOffset: {width: 1, height: 1},
              textShadowRadius: 15,
              fontWeight: 'bold',
            }}>
            AbsenQ
          </Text>
        </View>
        <View>
          <Item regular style={styles.inputSemiTransTop}>
            <Input
              placeholder="Email"
              onChangeText={email => this.setState({email})}
              defaultValue={this.state.email}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor={fontAntiColor}
              style={{color: fontAntiColor}}
            />
          </Item>
          <Item regular style={styles.inputSemiTransBot}>
            <Input
              placeholder="Password"
              onChangeText={password => this.setState({password})}
              defaultValue={this.state.password}
              secureTextEntry={true}
              autoCapitalize="none"
              placeholderTextColor={fontAntiColor}
              style={{color: fontAntiColor}}
              // keyboardType="numeric"
            />
          </Item>
          <View style={{flexDirection: 'row'}}>
            <Button
              onPress={() => this._loginButton()}
              style={{
                flex: 1,
                backgroundColor: 'green',
                justifyContent: 'center',
                marginRight: this.state.tmpPhoto != null ? 2 : null,
              }}>
              <Text style={{fontSize: 17}}>Log in</Text>
            </Button>
            {this.state.tmpPhoto != null ? (
              <Button
                onPress={() => this.props.navigation.navigate('LoginPhoto')}
                style={{
                  flex: 0.3,
                  backgroundColor: 'green',
                  justifyContent: 'center',
                  marginLeft: 2,
                }}>
                <Icon
                  type="MaterialCommunityIcons"
                  name="face-recognition"
                  size={30}
                  backgroundColor="None"
                  style={{color: 'white'}}
                />
              </Button>
            ) : null}
          </View>
          {this.state.tmpPhoto != null ? (
            <Button
              onPress={() => this.props.navigation.navigate('GuestCheck')}
              style={styles.buttonGreenFull}>
              <Text style={{fontSize: 17}}>Check Meeting</Text>
            </Button>
          ) : null}
          <Button
            transparent
            onPress={() => this.props.navigation.navigate('ReqReset')}
            style={{alignSelf: 'center'}}>
            <Text style={styles.textSmallUnder} uppercase={false}>
              Reset password
            </Text>
          </Button>
          <Image
            source={require('../../assets/logo_login.png')}
            style={{
              width: 280,
              height: 120,
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
          />
        </View>
      </ImageBackground>
    );
    return (
      <Container>
        {this.props.utilReducer.isFetching ? loadView : mainView}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {utilReducer: state.utilReducer, authReducer: state.authReducer};
};

const mapDispatchToProps = {login, auth};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

// export default Login;
