import React, { useState, useRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button, Icon, Toast, Container } from 'native-base';
import { styles } from '../styles';
import { connect } from 'react-redux';
import { loadView, ehandling } from './Util';
import { Camera } from 'react-native-vision-camera';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import ImagePicker from 'react-native-image-crop-picker';

const Selfie = ({ utilReducer }) => {
  const [front, setFront] = useState(true);
  const cameraRef = useRef(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const options = {
          quality: 0.5,
          base64: true,
        };
        const data = await cameraRef.current.takePictureAsync(options);
        const resizedData = await ImageResizer.createResizedImage(
          data.uri,
          700,
          1000,
          'JPEG',
          35
        );
        // Call your next action with resizedData
      } catch (err) {
        console.log('Error in selfie:', err);
        ehandling('Error in selfie');
      }
    }
  };

  const open = async () => {
    console.log('Open:', utilReducer.open);
    if (utilReducer.open) {
      try {
        const data = await ImagePicker.openPicker({ mediaType: 'photo' });
        const resizedData = await ImageResizer.createResizedImage(
          data.path,
          700,
          1000,
          'JPEG',
          35
        );
        // Call your next action with resizedData
      } catch (err) {
        console.log('Error in opening picker:', err);
        ehandling('Error in opening picker');
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Camera
        ref={cameraRef}
        style={styles.previewContainer}
        type={front ? 'front' : 'back'}
        flash={false}
        captureAudio={false}
      >
        {({ camera, status }) => (
          <View style={styles.cameraButtonContainer}>
            <TouchableOpacity
              onPress={() => setFront(!front)}
              style={styles.camera}
            >
              <Icon
                type="Ionicons"
                name="md-camera-reverse"
                size={30}
                backgroundColor="None"
                style={{ color: 'grey' }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={takePicture}
              style={styles.camera}
            >
              <Icon
                type="Ionicons"
                name="md-camera"
                size={30}
                backgroundColor="None"
                style={{ color: 'black' }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={open}
              style={utilReducer.open ? styles.camera : { width: 60, height: 60 }}
            >
              {utilReducer.open ? (
                <Icon
                  type="MaterialIcons"
                  name="perm-media"
                  size={30}
                  backgroundColor="None"
                  style={{ color: 'black' }}
                />
              ) : null}
            </TouchableOpacity>
          </View>
        )}
      </Camera>
    </View>
  );
};

const mapStateToProps = (state) => ({
  utilReducer: state.utilReducer,
});

export default connect(mapStateToProps)(Selfie);
