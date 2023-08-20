import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {
  Button,
  Container,
  Content,
  Input,
  Item,
  Label,
  Text,
} from 'native-base';

import {connect} from 'react-redux';
import HeaderCostum from '../Components/HeaderCostum';
import {register} from '../../redux/actions/adminAction';

import {styles} from '../styles';
import {loadView, ehandling, shandling} from '../Components/Util';

// @refresh reset

class RegistrasiPreview extends Component {
  state = {};

  componentDidMount() {}

  _nextButton = () => {
    const tmp = this.props.tmpReducer;
    var body = {
      name: tmp.name,
      nik: tmp.nik,
      email: tmp.email,
      phone: tmp.phone,
      photo: tmp.photo,
      password: tmp.password,
      // name: 'bas',
      // nik: '......',
      // email: 'baaaacot',
      // phone: '0852132165',
      // photo: tmp.photo,
      // password: 'Test1234',
    };

    this.props.register(body).then(success => {
      if (success) {
        shandling('SUCCESS register');
        this.props.navigation.navigate('Auth');
      } else ehandling(this.props);
    });
  };

  render() {
    const mainView = (
      <Content padder>
        <Image
          source={{uri: this.props.tmpReducer.photo}}
          style={styles.containerSelfiePreview}
          resizeMode="contain"
        />
        <Item fixedLabel>
          <Label>N I K</Label>
          <Input
            style={styles.textRight}
            disabled={true}
            defaultValue={this.props.tmpReducer.nik}
          />
        </Item>
        <Item fixedLabel>
          <Label>Name</Label>
          <Input
            style={styles.textRight}
            disabled={true}
            defaultValue={this.props.tmpReducer.name}
          />
        </Item>
        <Item fixedLabel>
          <Label>Email</Label>
          <Input
            style={styles.textRight}
            disabled={true}
            defaultValue={this.props.tmpReducer.email}
          />
        </Item>
        <Item fixedLabel>
          <Label>Phone</Label>
          <Input
            style={styles.textRight}
            disabled={true}
            defaultValue={this.props.tmpReducer.phone}
          />
        </Item>
        <Button
          onPress={() => this._nextButton()}
          style={styles.buttonGreenFullRadius}>
          <Text>Finish</Text>
        </Button>
      </Content>
    );

    return (
      <Container>
        <HeaderCostum title={'Register'} />
        {this.props.utilReducer.isFetching ? loadView : mainView}
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
