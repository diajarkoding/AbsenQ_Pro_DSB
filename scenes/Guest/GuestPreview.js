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
import {regisGuest} from '../../redux/actions/guestAction';

import {styles} from '../styles';
import {loadView, ehandling, shandling} from '../Components/Util';

import moment from 'moment';

// @refresh reset

class GuestPreview extends Component {
  state = {};

  componentDidMount() {}

  _nextButton = () => {
    const tmp = this.props.tmpGuestReducer;
    var body = {
      date: tmp.date,
      location: tmp.location,
      photo: tmp.photo,
      purpose: tmp.purpose,
      guests: tmp.listt,
      // name: tmp.name,
      // email: tmp.email,
      // phone: tmp.phone,
    };

    this.props.regisGuest(body).then(success => {
      if (success) {
        shandling('SUCCESS Guest');
        this.props.navigation.navigate('Auth');
      } else ehandling(this.props);
    });
  };

  guest = () => {
    return this.props.tmpGuestReducer.listt.map((data, i) => (
      <>
        <Item fixedLabel>
          <Label>Name</Label>
          <Input
            style={styles.textRight}
            disabled={true}
            multiline={true}
            defaultValue={data.name}
          />
        </Item>
        <Item fixedLabel>
          <Label>Email</Label>
          <Input
            style={styles.textRight}
            disabled={true}
            multiline={true}
            defaultValue={data.email}
          />
        </Item>
        <Item fixedLabel>
          <Label>Phone</Label>
          <Input
            style={styles.textRight}
            disabled={true}
            multiline={true}
            defaultValue={data.phone}
          />
        </Item>
      </>
    ));
  };

  render() {
    let daaa = moment(this.props.tmpGuestReducer.date).format(
      'YYYY-MM-DD HH:mm',
    );

    const mainView = (
      <Content padder>
        <Image
          source={{uri: this.props.tmpGuestReducer.photo}}
          style={styles.containerSelfiePreview}
          resizeMode="contain"
        />
        <Item fixedLabel>
          <Label>Location</Label>
          <Input
            style={styles.textRight}
            disabled={true}
            multiline={true}
            defaultValue={this.props.tmpGuestReducer.location}
          />
        </Item>
        <Item fixedLabel>
          <Label>Date</Label>
          <Input
            style={styles.textRight}
            disabled={true}
            multiline={true}
            defaultValue={daaa}
          />
        </Item>
        <Item fixedLabel>
          <Label>Purpose</Label>
          <Input
            style={styles.textRight}
            disabled={true}
            multiline={true}
            defaultValue={this.props.tmpGuestReducer.purpose}
          />
        </Item>
        {this.guest()}
        <Button
          onPress={() => this._nextButton()}
          style={styles.buttonGreenFullRadius}>
          <Text>Finish</Text>
        </Button>
      </Content>
    );

    return (
      <Container>
        <HeaderCostum title={'Guest'} />
        {this.props.utilReducer.isFetching ? loadView : mainView}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    utilReducer: state.utilReducer,
    tmpGuestReducer: state.tmpGuestReducer,
  };
};

const mapDispatchToProps = {regisGuest};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GuestPreview);
