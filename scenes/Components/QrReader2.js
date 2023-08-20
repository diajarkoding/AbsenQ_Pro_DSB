import React, {Component} from 'react';
import {Button, Icon, Toast, Container} from 'native-base';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';

import {connect} from 'react-redux';

import {styles} from '../styles';
import {loadView, ehandling} from './Util';

class QrReader extends Component {
  render() {
    const self = (
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.previewContainer}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          captureAudio={false}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          onBarCodeRead={data => {
            console.log(data.data);
            this.props.next(data.data);
          }}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
      </View>
    );
    return this.props.utilReducer.isFetching ? loadView : self;
  }
}

const mapStateToProps = state => {
  return {utilReducer: state.utilReducer};
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QrReader);
