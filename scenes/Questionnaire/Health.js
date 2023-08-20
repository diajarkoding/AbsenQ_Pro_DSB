import React, {Component} from 'react';
import {Alert, BackHandler, TouchableOpacity, View} from 'react-native';
import {
  Button,
  Container,
  Content,
  Input,
  Item,
  Radio,
  Text,
} from 'native-base';

import {connect} from 'react-redux';
import {healthQ} from '../../redux/actions/questionnaireAction';

import {styles} from '../styles';
import HeaderCostum from '../Components/HeaderCostum';
import {
  loadView,
  shandling,
  ehandling,
  inputHandling,
} from '../Components/Util';
import * as Check from '../verif';

class Health extends Component {
  state = {
    temper: null,
    temperSuccess: true,
    condit: null,
    conditSuccess: true,
    status: 'HOME',
    statusSuccess: true,
    force: false,
  };

  componentDidMount() {
    const {active} = this.props.fitureReducer;
    for (var i = 0; i < active.length; i++) {
      if (
        active[i].name == 'Health Questionnaire' &&
        active[i].status &&
        active[i].mandatory &&
        !active[i].done
      ) {
        this.setState({force: true});
        BackHandler.addEventListener('hardwareBackPress', this.forced);
      }
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.forced);
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

  _save = async () => {
    let flag = await this.check();
    flag
      ? this.props.healthQ(this.state).then(success => {
          if (success) {
            shandling('SUCCESS');
            this.props.navigation.navigate('Auth');
          } else ehandling(this.props);
        })
      : inputHandling('Please correct your input(s)');
  };

  async check() {
    var temperSuccess = await Check.Temper(this.state.temper);
    var conditSuccess = await Check.NotNullOnly(this.state.condit);
    // var statusSuccess = await Check.NotNullOnly(this.state.status);

    this.setState({temperSuccess, conditSuccess});

    let flag = false;
    if (temperSuccess && conditSuccess) flag = true;

    return flag;
  }

  render() {
    const {temperSuccess, conditSuccess, statusSuccess} = this.state;

    const wf = (
      <>
        <Text style={{margin: 5, fontSize: 18}}>Status</Text>
        <View style={{margin: 5, flexDirection: 'row'}}>
          <Radio
            selected={this.state.status == 'OFFICE' ? true : false}
            onPress={() =>
              this.setState({status: 'OFFICE', statusSuccess: true})
            }
          />
          <TouchableOpacity
            onPress={() =>
              this.setState({status: 'OFFICE', statusSuccess: true})
            }>
            <Text style={{fontSize: 18, marginHorizontal: 10}}>WFO</Text>
          </TouchableOpacity>
        </View>
        <View style={{margin: 5, flexDirection: 'row'}}>
          <Radio
            selected={this.state.status == 'HOME' ? true : false}
            onPress={() => this.setState({status: 'HOME', statusSuccess: true})}
          />
          <TouchableOpacity
            onPress={() =>
              this.setState({status: 'HOME', statusSuccess: true})
            }>
            <Text style={{fontSize: 18, marginHorizontal: 10}}>WFH</Text>{' '}
          </TouchableOpacity>
        </View>
        {statusSuccess ? null : (
          <Text style={styles.textWarn}>*please choose one</Text>
        )}
      </>
    );

    const formUser = (
      <View>
        <Text style={{margin: 5, fontSize: 18}}>Body temperature (°C)</Text>
        <Item
          regular
          style={temperSuccess ? styles.inputGrey : styles.inputWhiteFalse}>
          <Input
            placeholder="ex. 35.0"
            keyboardType="numeric"
            placeholderTextColor={'grey'}
            onChangeText={temper =>
              this.setState({temper, temperSuccess: true})
            }
            defaultValue={this.state.temper}
          />
        </Item>
        {temperSuccess ? null : (
          <Text style={styles.textWarn}>
            *please input the correct temperature, in decimal, ex 35.0
          </Text>
        )}
        <Text style={{margin: 5, fontSize: 18}}>Body condition</Text>
        <View style={{margin: 5, flexDirection: 'row'}}>
          <Radio
            selected={this.state.condit}
            onPress={() => this.setState({condit: true, conditSuccess: true})}
          />
          <TouchableOpacity
            onPress={() => this.setState({condit: true, conditSuccess: true})}>
            <Text style={{fontSize: 18, marginHorizontal: 10}}>Healthy</Text>
          </TouchableOpacity>
        </View>
        <View style={{margin: 5, flexDirection: 'row'}}>
          <Radio
            selected={this.state.condit == false ? true : false}
            onPress={() => this.setState({condit: false, conditSuccess: true})}
          />
          <TouchableOpacity
            onPress={() => this.setState({condit: false, conditSuccess: true})}>
            <Text style={{fontSize: 18, marginHorizontal: 10}}>Others</Text>
          </TouchableOpacity>
        </View>
        {conditSuccess ? null : (
          <Text style={styles.textWarn}>*please choose one</Text>
        )}
        <Button
          onPress={() => this._save()}
          style={styles.buttonGreenFullRadius}>
          <Text>save</Text>
        </Button>
      </View>
    );

    const mainView = <Content padder>{formUser}</Content>;

    return (
      <Container>
        <HeaderCostum
          title={'Health Questionnaire'}
          forced={this.state.force}
        />
        {this.props.utilReducer.isFetching ? loadView : mainView}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {utilReducer: state.utilReducer, fitureReducer: state.fitureReducer};
};

const mapDispatchToProps = {healthQ};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Health);
