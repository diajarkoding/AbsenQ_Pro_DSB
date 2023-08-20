import React, {Component} from 'react';
import {ImageBackground, View} from 'react-native';
import {Button, Container, Content, Input, Item, Text} from 'native-base';

import {connect} from 'react-redux';
import {tmpRegistrasiCompany} from '../../redux/actions/tmpAction';

import {styles} from '../styles';
import {loadView, ehandling, inputHandling} from '../Components/Util';
import * as Check from '../verif';

class RegistrasiCompany extends Component {
  state = {
    companyName: null,
    companyNameSuccess: true,
    companyCode: null,
    companyCodeSuccess: true,
    companyDesc: null,
    companyDescSuccess: true,
  };

  _nextButton = async () => {
    let flag = await this.check();
    flag
      ? this.props.tmpRegistrasiCompany(this.state).then(success => {
          success
            ? this.props.navigation.navigate('RegistrasiPhoto')
            : ehandling(this.props);
        })
      : inputHandling('Please correct your input(s)');
  };

  async check() {
    var companyNameSuccess = await Check.NotNull(this.state.companyName);
    var companyCodeSuccess = await Check.NotNullnExact(
      this.state.companyCode,
      4,
    );
    var companyDescSuccess = await Check.NotNull(this.state.companyDesc);

    this.setState({companyNameSuccess, companyCodeSuccess, companyDescSuccess});

    let flag = false;
    if (companyNameSuccess && companyCodeSuccess && companyDescSuccess)
      flag = true;
    else flag = false;

    return flag;
  }

  render() {
    const {
      companyNameSuccess,
      companyCodeSuccess,
      companyDescSuccess,
    } = this.state;

    const formCompany = (
      <View>
        <Item
          regular
          style={
            companyNameSuccess ? styles.inputWhite : styles.inputWhiteFalse
          }>
          <Input
            placeholder="Company Name"
            placeholderTextColor={'grey'}
            onChangeText={companyName =>
              this.setState({companyName, companyNameSuccess: true})
            }
            defaultValue={this.state.companyName}
          />
        </Item>
        {companyNameSuccess ? null : (
          <Text style={styles.textWarn}>*at least 3 characters</Text>
        )}
        <Item
          regular
          style={
            companyCodeSuccess ? styles.inputWhite : styles.inputWhiteFalse
          }>
          <Input
            placeholder="Company Code"
            placeholderTextColor={'grey'}
            onChangeText={companyCode =>
              this.setState({companyCode, companyCodeSuccess: true})
            }
            maxLength={4}
            autoCapitalize="characters"
            defaultValue={this.state.companyCode}
          />
        </Item>
        {companyCodeSuccess ? null : (
          <Text style={styles.textWarn}>*must 4 characters</Text>
        )}
        <Item
          regular
          style={
            companyDescSuccess ? styles.inputWhite : styles.inputWhiteFalse
          }>
          <Input
            placeholder="Company Description"
            placeholderTextColor={'grey'}
            onChangeText={companyDesc =>
              this.setState({companyDesc, companyDescSuccess: true})
            }
            multiline={true}
            autoCapitalize="none"
            defaultValue={this.state.companyDesc}
          />
        </Item>
        {companyDescSuccess ? null : (
          <Text style={styles.textWarn}>*at least 3 characters</Text>
        )}
        <Button
          onPress={() => this._nextButton()}
          style={styles.buttonGreenFullRadius}>
          <Text>Next</Text>
        </Button>
      </View>
    );

    const mainView = (
      <Content padder>
        <Text style={styles.textWithShadow}>Register</Text>
        {formCompany}
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

const mapDispatchToProps = {tmpRegistrasiCompany};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegistrasiCompany);
