import {Dimensions, StyleSheet} from 'react-native';

global.mode = true;
// global.mode = false;

export const {width, height} = Dimensions.get('window');

var mode = true;

export var backGColor = 'whitesmoke';
export var backGsecondaryColor = '#ececec';
export var backGBlueColor = 'steelblue';
export var fontColor = 'black';
export var fontAntiColor = 'white';
export var fontSecondaryColor = '#8d8d8d';
export var buttonColor = '#1da1f2';

export const styles = StyleSheet.create({
  // container
  // loadView, AllBy7, HomeAdmin, AllPerCompany, Time,
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: backGColor,
  },
  // HomeUser,
  containerSpace: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: backGColor,
  },
  contentContainerStyle: {backgroundColor: backGColor},
  // Login,
  imageBackgroundContainer: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'space-between',
    padding: 15,
  },
  // Reset,
  imageBackgroundContainer1: {flex: 1, resizeMode: 'cover'},
  // selfie,
  previewContainer: {flex: 1, justifyContent: 'flex-end', alignItems: 'center'},
  // selfie,
  cameraButtonContainer: {
    flex: 0,
    flexDirection: 'row',
    width: '100%',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // RegistrasiPreview,
  containerSelfiePreview: {
    height: 150,
    width: 150,
    marginVertical: 5,
    alignSelf: 'center',
    backgroundColor: fontAntiColor,
  },
  // AllBy7, HomeAdmin,
  containerSeparatorFL: {backgroundColor: 'grey', height: 0.8},
  // AllBy7, AllPerCompany,
  containerDataFL: {
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  // AllBy7, HomeAdmin, AllPerCompany, Time,
  containerCenterFull: {flex: 1, alignItems: 'center'},
  // AllBy7, AllPerCompany,
  containerCenterCenterFull: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Fiture,
  comboboxContainer: {
    width: '100%',
    padding: 8,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  //logo, image
  // Login,
  iconQ: {width: 130, height: 130, alignSelf: 'center', resizeMode: 'cover'},
  // HomeUser,
  iconQButton: {flex: 1, alignSelf: 'center', resizeMode: 'contain'},
  // login,
  logoSmmaText: {
    width: 230,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  //text
  // Login, Registrasi, RegistrasiCompany, RegistrasiPreview, Reset,
  textWithShadow: {
    fontSize: 28,
    margin: 5,
    alignSelf: 'center',
    color: fontAntiColor,
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 15,
    fontWeight: 'bold',
  },
  // Login,
  textSmallUnder: {
    color: fontAntiColor,
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  textSmallUnderAnti: {
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  // Login,
  textSmallBold: {fontWeight: 'bold', fontSize: 13, color: fontAntiColor},
  // Registrasi, RegistrasiCompany,
  textWarn: {color: 'red', fontSize: 13, marginHorizontal: 13},
  // RegistrasiPreview,
  textWhiteRight: {color: fontAntiColor, textAlign: 'right'},
  // RegistrasiPreview,
  textRight: {textAlign: 'right'},
  // AllBy7, HomeAdmin,
  textItalicCenter: {fontStyle: 'italic', alignSelf: 'center'},
  // HomeAdmin,
  textBigCenter: {fontSize: 23, alignSelf: 'center'},
  //input
  // Login,
  inputSemiTransTop: {
    backgroundColor: 'rgba(207, 207, 207, 0.5)',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderColor: 'rgba(207, 207, 207, 0.3)',
    marginTop: 15,
  },
  // Login,
  inputSemiTransBot: {
    backgroundColor: 'rgba(207, 207, 207, 0.5)',
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderColor: 'rgba(207, 207, 207, 0.3)',
    marginBottom: 15,
  },
  // Registrasi, RegistrasiCompany, Reset,
  inputWhite: {
    backgroundColor: fontAntiColor,
    borderRadius: 8,
    borderColor: fontAntiColor,
    marginVertical: 5,
  },
  // ClearImei,
  inputGrey: {
    backgroundColor: fontAntiColor,
    borderRadius: 8,
    borderColor: 'grey',
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    marginVertical: 5,
  },
  // Registrasi, RegistrasiCompany,
  inputWhiteFalse: {
    backgroundColor: fontAntiColor,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'red',
    marginVertical: 5,
  },
  registerInput2: {
    backgroundColor: fontAntiColor,
    borderRadius: 8,
    borderColor: fontAntiColor,
    marginVertical: 5,
    paddingHorizontal: 3,
  },
  //button
  // Login,
  buttonGreenFull: {
    margin: 5,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  // Register, RegistrasiCompany, RegistrasiPreview, Reset, Fiture, Questionnaire health
  buttonGreenFullRadius: {
    width: '100%',
    marginVertical: 15,
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  // Register, RegistrasiCompany, RegistrasiPreview, Reset, Fiture,
  buttonGreyFullRadius: {
    width: '100%',
    marginVertical: 15,
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  // selfie,
  camera: {
    backgroundColor: 'whitesmoke',
    borderRadius: 5,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // HomeUser,
  buttonQ: {width: 180, height: 180},
});
