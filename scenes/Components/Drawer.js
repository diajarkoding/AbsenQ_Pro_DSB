import React, {Component} from 'react';
import {
  Button,
  Container,
  Icon,
  Text,
  Thumbnail,
  Toast,
  View,
} from 'native-base';
import {Image, TouchableOpacity} from 'react-native';
import {DrawerItems, SafeAreaView} from 'react-navigation';

import {connect} from 'react-redux';
import {fetchingLogout} from '../../redux/actions/loginAction';

import {
  styles,
  buttonColor,
  fontColor,
  headerColor,
  backGColor,
} from '../styles';

class Drawer_Master extends Component {
  _logout = () => {
    this.props.navigation.closeDrawer();
    this.props.fetchingLogout().then(() => {
      this.props.auth.login
        ? Toast.show({
            text: 'Error ' + this.props.util.errorMessage,
            buttonText: 'Ok',
            duration: 5000,
          })
        : this.props.navigation.navigate('Auth');
    });
  };

  _navigateToScreen = route => () => {
    this.props.navigation.closeDrawer();
    this.props.navigation.navigate(route);
  };

  render() {
    const pemodalView = (
      <View style={styles.navSectionStyle}>
        <Button
          iconLeft
          transparent
          onPress={this._navigateToScreen('Sahamku')}
          style={styles.navButtonStyle}>
          <Image
            source={require('../../images/legal.png')}
            style={styles.navImageStyle}
            tintColor="grey"
          />
          <Text uppercase={false} style={{color: fontColor}}>
            Sahamku
          </Text>
        </Button>
        <Button
          iconLeft
          transparent
          onPress={this._navigateToScreen('RiwayatTransaksi')}
          style={styles.navButtonStyle}>
          <Image
            source={require('../../images/finance.png')}
            style={styles.navImageStyle}
            tintColor="grey"
          />
          <Text uppercase={false} style={{color: fontColor}}>
            Riwayat Transaksi
          </Text>
        </Button>
      </View>
    );

    const userView = (
      <View style={styles.navSectionStyle}>
        <View style={styles.navSectionStyle}>
          <Button
            iconLeft
            transparent
            onPress={this._navigateToScreen('Pilih')}
            style={styles.navButtonStyle}>
            <Icon
              type="FontAwesome"
              name="drivers-license"
              style={styles.navIconStyle}
            />
            <Text uppercase={false} style={{color: fontColor}}>
              Upgrade Akun
            </Text>
          </Button>
        </View>
      </View>
    );

    return (
      <Container>
        <View style={styles.navContainer}>
          {/* <ScrollView> */}
          <View style={styles.navHeader}>
            <Button
              iconRight
              transparent
              onPress={this._navigateToScreen('Profile')}
              style={styles.navButtonStyleFlexEnd}>
              <Icon
                type="Feather"
                name="chevron-right"
                style={styles.navIconStyle}
              />
            </Button>
            <Thumbnail large source={require('../../images/profile.png')} />
            <Text style={{marginVertical: 5, color: fontColor, fontSize: 22}}>
              {this.props.profile.name}
            </Text>
            <Text style={{color: fontColor}}>{this.props.profile.email}</Text>
          </View>
          {this.props.auth.whatami == 'User' ? userView : null}
          {this.props.auth.pemodal ? pemodalView : null}
          <View style={styles.navSectionStyle}>
            <Button
              iconLeft
              transparent
              onPress={this._navigateToScreen('Profile')}
              style={styles.navButtonStyle}>
              <Icon
                type="Feather"
                name="settings"
                style={styles.navIconStyle}
              />
              <Text uppercase={false} style={{color: fontColor}}>
                Pengaturan
              </Text>
            </Button>
            <Button
              iconLeft
              transparent
              onPress={this._logout}
              style={styles.navButtonStyle}>
              <Icon type="Feather" name="log-out" style={styles.navIconStyle} />
              <Text uppercase={false} style={{color: fontColor}}>
                Keluar
              </Text>
            </Button>
          </View>
          {/* </ScrollView> */}
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    util: state.util,
    auth: state.auth,
    profile: state.profile,
  };
};

export default connect(
  mapStateToProps,
  {fetchingLogout},
)(Drawer_Master);
