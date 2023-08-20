import React, {Component} from 'react';
import {AsyncStorage, Image, ImageBackground, View} from 'react-native';
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
import IMEI from 'react-native-imei';

import {connect} from 'react-redux';
import {register} from '../../redux/actions/loginAction';
import {auth} from '../../redux/actions/utilAction';

import {styles, fontAntiColor} from '../styles';
import {loadView} from '../Components/Util';
import Selfie from '../Components/selfie';

// @refresh reset

class RegistrasiPreview extends Component {
  state = {imei1: null, imei2: null};

  async componentDidMount() {
    var tmpImei1 = await AsyncStorage.getItem('imei');

    IMEI.getImei().then(imeiList => {
      if (imeiList[0] == null) {
        imeiList[0] = tmpImei1;
        if (imeiList.length == 2) imeiList[1] = tmpImei1;
      }

      console.log(imeiList);

      this.setState({imei1: imeiList[0]});
      if (imeiList.length == 2) this.setState({imei2: imeiList[1]});
      else this.setState({imei2: '-'});
    });
  }

  _nextButton = () => {
    const tmp = this.props.tmpReducer;
    var body = {
      name: tmp.name,
      nik: tmp.nik,
      email: tmp.email,
      phone: tmp.phone,
      photo: tmp.photo,
      imei1: this.state.imei1,
      imei2: this.state.imei2,
      password: tmp.password,
      code: tmp.companyCode,
      companyName: tmp.companyName,
      description: tmp.companyDesc,
    };
    console.log(body);
    this.props.register(body).then(success => {
      if (success) {
        Toast.show({
          text: 'SUCCESS register',
          buttonText: 'Ok',
          type: 'success',
          duration: 5000,
        });
        this.props.navigation.navigate('Login');
      } else {
        Toast.show({
          text: this.props.utilReducer.errorMessage,
          buttonText: 'Ok',
          type: 'danger',
          duration: 5000,
        });
        this.props.navigation.navigate('Register');
      }
    });
  };

  render() {
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
        <Image
          source={{uri: this.props.tmpReducer.photo}}
          style={{
            height: 150,
            width: 150,
            marginVertical: 5,
            alignSelf: 'center',
            backgroundColor: fontAntiColor,
          }}
          resizeMode="contain"
        />
        <Item fixedLabel>
          <Label style={{color: fontAntiColor}}>N I K</Label>
          <Input
            style={{color: fontAntiColor, textAlign: 'right'}}
            disabled={true}
            defaultValue={this.props.tmpReducer.nik}
          />
        </Item>
        <Item fixedLabel>
          <Label style={{color: fontAntiColor}}>Name</Label>
          <Input
            style={{color: fontAntiColor, textAlign: 'right'}}
            disabled={true}
            defaultValue={this.props.tmpReducer.name}
          />
        </Item>
        <Item fixedLabel>
          <Label style={{color: fontAntiColor}}>Email</Label>
          <Input
            style={{color: fontAntiColor, textAlign: 'right'}}
            disabled={true}
            defaultValue={this.props.tmpReducer.email}
          />
        </Item>
        <Item fixedLabel>
          <Label style={{color: fontAntiColor}}>Phone</Label>
          <Input
            style={{color: fontAntiColor, textAlign: 'right'}}
            disabled={true}
            defaultValue={this.props.tmpReducer.phone}
          />
        </Item>
        <Item fixedLabel>
          <Label style={{color: fontAntiColor}}>Company</Label>
          <Input
            style={{color: fontAntiColor, textAlign: 'right'}}
            disabled={true}
            defaultValue={this.props.tmpReducer.companyName}
          />
        </Item>
        <Item fixedLabel>
          <Label style={{color: fontAntiColor}}>Company Code</Label>
          <Input
            style={{color: fontAntiColor, textAlign: 'right'}}
            disabled={true}
            defaultValue={this.props.tmpReducer.companyCode}
          />
        </Item>
        <Item fixedLabel>
          <Label style={{color: fontAntiColor}}>Company Description</Label>
          <Input
            style={{color: fontAntiColor, textAlign: 'right'}}
            disabled={true}
            defaultValue={this.props.tmpReducer.companyDesc}
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
          <Text>Finish</Text>
        </Button>
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
  return {
    utilReducer: state.utilReducer,
    tmpReducer: state.tmpReducer,
    authReducer: state.authReducer,
  };
};

const mapDispatchToProps = {register};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegistrasiPreview);
