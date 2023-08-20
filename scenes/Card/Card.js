import React, {Component} from 'react';
import {FlatList, Image, View} from 'react-native';
import {Button, Container, Content, Icon, Text} from 'native-base';

import {connect} from 'react-redux';
import {card} from '../../redux/actions/cardAction';

import {styles} from '../styles';
import HeaderCostum from '../Components/HeaderCostum';
import {loadView, ehandling} from '../Components/Util';

import QRCode from 'react-native-qrcode-svg';
// import Buffer from 'buffer';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {nik: null};
  }

  componentDidMount() {
    const {whoami} = this.props.authReducer;
    const Buffer = require('buffer').Buffer;
    const nik = new Buffer(whoami.nik.toString()).toString('base64');
    console.log(nik);
    this.setState({nik: '?id=' + nik});
    this.props.card().then(success => {
      if (!success) ehandling(this.props);
    });
  }

  render() {
    const data = this.props.cardReducer;

    const mainView = (
      <Content>
        <View style={styles.container}>
          <Image
            source={{uri: 'data:image/png;base64,' + data.photo}}
            resizeMode="contain"
            style={{marginTop: 20, width: 150, height: 150, borderRadius: 100}}
          />
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: 'black',
              margin: 10,
            }}>
            <Text style={{margin: 5, fontSize: 22}}>{data.name}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              margin: 5,
              width: '70%',
            }}>
            <Icon
              type={'FontAwesome'}
              name={'briefcase'}
              style={{fontSize: 23, flex: 1, textAlign: 'center'}}
            />
            <Text style={{flex: 3}}>{data.job}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              margin: 5,
              width: '70%',
            }}>
            <Icon
              type={'FontAwesome'}
              name={'envelope'}
              style={{fontSize: 23, flex: 1, textAlign: 'center'}}
            />
            <Text style={{flex: 3}}>{data.email}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              margin: 5,
              width: '70%',
            }}>
            <Icon
              type={'FontAwesome'}
              name={'phone'}
              style={{fontSize: 23, flex: 1, textAlign: 'center'}}
            />
            <Text style={{flex: 3}}>{data.phone}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              margin: 5,
              width: '70%',
            }}>
            <Icon
              type={'FontAwesome'}
              name={'user'}
              style={{fontSize: 23, flex: 1, textAlign: 'center'}}
            />
            <Text style={{flex: 3}}>{data.status}</Text>
          </View>
          <View style={{margin: 30}}>
            <QRCode
              size={150}
              value={global.qr + this.state.nik}
              onError={error => console.log(error)}
            />
          </View>
          <Image
            source={require('../../assets/footer.png')}
            resizeMode="stretch"
            style={{width: '100%', height: 60}}
          />
        </View>
      </Content>
    );

    return (
      <Container>
        <HeaderCostum title="Bussiness Card" />
        {this.props.utilReducer.isFetching ? loadView : mainView}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    utilReducer: state.utilReducer,
    authReducer: state.authReducer,
    cardReducer: state.cardReducer,
  };
};

const mapDispatchToProps = {card};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Card);
