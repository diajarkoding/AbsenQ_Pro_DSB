import React, {Component} from 'react';
import {ImageBackground, View} from 'react-native';
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
import {tmpRegistrasiCompany} from '../../redux/actions/loginAction';

import {styles, fontAntiColor} from '../styles';
import {loadView} from '../Components/Util';
import * as Check from '../verif';

class RegistrasiCompany extends Component {
  state = {
    companyName: null,
    companyNameSuccess: false,
    companyNameFail: false,
    companyCode: null,
    companyCodeSuccess: false,
    companyCodeFail: false,
    companyDesc: null,
    companyDescSuccess: false,
    companyDescFail: false,
  };

  _nextButton = () => {
    this.props
      .tmpRegistrasiCompany(this.state)
      .then(() => {
        this.props.tmpReducer.companyName != null
          ? this.props.navigation.navigate('RegistrasiPhoto')
          : Toast.show({
              text: 'Please input all the fields',
              buttonText: 'Ok',
              type: 'danger',
              duration: 5000,
            });
      })
      .catch(err => {
        console.log('login page: ' + err);
      });
  };

  async check(expression) {
    // console.error(this.state.password);
    let flag = null;
    switch (expression) {
      case 'nik':
        flag = await Check.Number(this.state.nik);
        this.setState({nikSuccess: flag, nikFail: !flag});
        break;
    }
    // console.error(flag);
  }

  render() {
    const formCompany = (
      <View>
        <Item regular style={styles.registerInput}>
          <Input
            placeholder="Company Name"
            placeholderTextColor={'grey'}
            // style={{color: 'grey'}}
            onChangeText={companyName => this.setState({companyName})}
            defaultValue={this.state.companyName}
          />
        </Item>
        <Item regular style={styles.registerInput}>
          <Input
            placeholder="Company Code"
            placeholderTextColor={'grey'}
            // style={{color: 'grey'}}
            onChangeText={companyCode => this.setState({companyCode})}
            maxLength={4}
            autoCapitalize="characters"
            defaultValue={this.state.companyCode}
          />
        </Item>
        <Item regular style={styles.registerInput}>
          <Input
            placeholder="Company Description"
            placeholderTextColor={'grey'}
            // style={{color: 'grey'}}
            onChangeText={companyDesc => this.setState({companyDesc})}
            secureTextEntry={true}
            multiline={true}
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
        {formCompany}
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

const mapDispatchToProps = {tmpRegistrasiCompany};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegistrasiCompany);
