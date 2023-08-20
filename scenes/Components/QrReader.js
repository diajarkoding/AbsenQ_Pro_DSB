import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Camera } from 'react-native-vision-camera';
import { styles } from '../styles';
import { loadView, ehandling } from './Util';

const QrReader = ({ utilReducer, next }) => {
  const handleBarCodeRead = (event) => {
    if (event.barcodes && event.barcodes.length > 0) {
      const qrData = event.barcodes[0].data;
      console.log(qrData);
      next(qrData);
    }
  };

  const self = (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Camera
        style={styles.previewContainer}
        type={Camera.Constants.Type.back}
        flash={false}
        onBarCodeRead={handleBarCodeRead}
      />
    </View>
  );

  return utilReducer.isFetching ? loadView : self;
};

const mapStateToProps = (state) => ({
  utilReducer: state.utilReducer,
});

export default connect(mapStateToProps)(QrReader);
