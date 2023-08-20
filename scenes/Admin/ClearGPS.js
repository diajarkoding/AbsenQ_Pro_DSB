import React, {Component} from 'react';
import {Button, Container, Content, Input, Item, Text} from 'native-base';

import {connect} from 'react-redux';
import {clearGPS} from '../../redux/actions/adminAction';

import {styles} from '../styles';
import HeaderCostum from '../Components/HeaderCostum';
import {
  loadView,
  ehandling,
  shandling,
  inputHandling,
} from '../Components/Util';
import * as Check from '../verif';

class ClearGPS extends Component {
  constructor(props) {
    super(props);
    this.state = {email: null, emailSuccess: true};
    // this.state = {email: 'g@smma.co.id', emailSuccess: true};
  }

  componentDidMount() {}

  _nextButton = async () => {
    let flag = await this.check();
    flag
      ? this.props.clearGPS(this.state).then(success => {
          if (success) {
            shandling('SUCCESS clear GPS');
            this.props.navigation.navigate('Home');
          } else ehandling(this.props);
        })
      : inputHandling('Please input the correct email');
  };

  async check() {
    var emailSuccess = await Check.Email(this.state.email);
    this.setState({emailSuccess});

    let flag = false;

    if (emailSuccess) flag = true;
    else flag = false;

    return flag;
  }

  render() {
    const {emailSuccess} = this.state;
    const mainView = (
      <Content padder>
        <Item
          regular
          style={emailSuccess ? styles.inputGrey : styles.inputWhiteFalse}>
          <Input
            placeholder="Email"
            placeholderTextColor={'grey'}
            onChangeText={email => this.setState({email, emailSuccess: true})}
            // onEndEditing={() => this.check('email')}
            keyboardType="email-address"
            autoCapitalize="none"
            defaultValue={this.state.email}
          />
        </Item>
        {emailSuccess ? null : (
          <Text style={styles.textWarn}>*please input the correct email</Text>
        )}
        <Button
          onPress={() => this._nextButton()}
          style={styles.buttonGreenFullRadius}>
          <Text>Clear</Text>
        </Button>
      </Content>
    );

    return (
      <Container>
        <HeaderCostum title={'Clear GPS'} />
        {this.props.utilReducer.isFetching ? loadView : mainView}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {utilReducer: state.utilReducer, userReducer: state.userReducer};
};

const mapDispatchToProps = {clearGPS};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClearGPS);
