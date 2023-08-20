import React, {Component} from 'react';
import {Body, Header, Icon, Text, Title, Toast, View} from 'native-base';
import {Alert, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';


import {connect} from 'react-redux';
import {logout} from '../../redux/actions/loginAction';

import {styles, backGBlueColor, fontAntiColor} from '../styles';

class HeaderCostum extends Component {
  constructor(props) {
    super(props);
  }

  forced() {
    Alert.alert(
      'Alert',
      "You can't leave this page, please continue. Thank you",
      [{text: 'OK', onPress: () => {}}],
      {cancelable: true},
    );
    return true;
  }

  render() {
    const nav = this.props.navigation;
    const title = (
      <Text style={{fontSize: 24, color: fontAntiColor}}>
        {this.props.title ? this.props.title : 'AbsenQ'}
      </Text>
    );

    const logoutBut = (
      <TouchableOpacity
        style={{paddingRight: 8}}
        onPress={() => {
          this.props.logout().then(flag => {
            if (flag) {
              this.props.navigation.navigate('Auth');
            } else {
              Toast.show({
                text: this.props.util.errorMessage,
                buttonText: 'Ok',
                type: 'danger',
                duration: 5000,
              });
            }
          });
        }}>
        <Icon
          type={'Entypo'}
          name={'log-out'}
          style={{fontSize: 21, color: fontAntiColor}}
        />
      </TouchableOpacity>
    );

    const backBut = (
      <TouchableOpacity
        style={{paddingLeft: 8}}
        onPress={() => {
          nav.pop();
        }}>
        <Icon
          type={'AntDesign'}
          name={'arrowleft'}
          style={{fontSize: 21, color: fontAntiColor}}
        />
      </TouchableOpacity>
    );

    const drawerBut = (
      <TouchableOpacity
        style={{paddingLeft: 8}}
        onPress={() => {
          this.props.forced ? this.forced() : nav.openDrawer();
        }}>
        <Icon
          type={'Entypo'}
          name={'menu'}
          style={{fontSize: 21, color: fontAntiColor}}
        />
      </TouchableOpacity>
    );

    return (
      <Header style={{backgroundColor: backGBlueColor}}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1}}>{this.props.back ? backBut : drawerBut}</View>
          <View style={{flex: 9, alignItems: 'center'}}>{title}</View>
          <View style={{flex: 1}}>{this.props.back ? null : logoutBut}</View>
        </View>
      </Header>
    );
  }
}

// export default

const Head = useNavigation(HeaderCostum);

const mapStateToProps = state => {
  return {util: state.utilReducer};
};

const mapDispatchToProps = {logout};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Head);
