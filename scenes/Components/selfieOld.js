import React, {Component} from 'react';
import {Button, Icon, Toast, Container} from 'native-base';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import ImageResizer from 'react-native-image-resizer';
import ImagePicker from 'react-native-image-crop-picker';

import {connect} from 'react-redux';

import {styles} from '../styles';
import {loadView, ehandling} from './Util';

class Selfie extends Component {
  state = {front: true};

  takePicture = async () => {
    if (this.camera) {
      const options = {
        quality: 0.5,
        base64: true,
        pauseAfterCapture: true,
      };
      try {
        var data = await this.camera.takePictureAsync(options);
        data = await ImageResizer.createResizedImage(
          data.uri,
          700,
          1000,
          'JPEG',
          35,
        );
        this.props.next(data);
      } catch (err) {
        console.log('Error; Selfie;', err);
        inputHandling('Error in selfie');
      }
    }
  };

  open = async () => {
    console.log(this.props.open);
    if (this.props.open) {
      await ImagePicker.openPicker({mediaType: 'photo'}).then(async data => {
        data = await ImageResizer.createResizedImage(
          data.path,
          700,
          1000,
          'JPEG',
          35,
        );
        this.props.next(data);
      });
    }
  };

  render() {
    const self = (
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.previewContainer}
          type={
            this.state.front
              ? RNCamera.Constants.Type.front
              : RNCamera.Constants.Type.back
          }
          flashMode={RNCamera.Constants.FlashMode.off}
          captureAudio={false}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}>
          {({camera, status}) => {
            return (
              <View style={styles.cameraButtonContainer}>
                <TouchableOpacity
                  onPress={() => this.setState({front: !this.state.front})}
                  style={styles.camera}>
                  <Icon
                    type="Ionicons"
                    name="md-camera-reverse"
                    size={30}
                    backgroundColor="None"
                    style={{color: 'grey'}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.takePicture(camera)}
                  style={styles.camera}>
                  <Icon
                    type="Ionicons"
                    name="md-camera"
                    size={30}
                    backgroundColor="None"
                    style={{color: 'black'}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.open()}
                  style={
                    this.props.open ? styles.camera : {width: 60, height: 60}
                  }>
                  {this.props.open ? (
                    <Icon
                      type="MaterialIcons"
                      name="perm-media"
                      size={30}
                      backgroundColor="None"
                      style={{color: 'black'}}
                    />
                  ) : null}
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
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
)(Selfie);
