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
import {guestMeeting} from '../../redux/actions/guestAction';

import {styles} from '../styles';
import {loadView, ehandling, shandling} from '../Components/Util';
import moment from 'moment';

// @refresh reset

class GuestResult extends Component {
  state = {};

  componentDidMount() {
    const tmp = this.props.guestReducer;
    var body = {id: tmp.guest_check};

    this.props.guestMeeting(body).then(success => {
      if (!success) ehandling(this.props);
    });
  }

  _nextButton() {
    this.props.navigation.navigate('Login');
  }

  render() {
    let daaa = moment(this.props.guestReducer.guest_meeting.date).format(
      'YYYY-MM-DD HH:mm',
    );

    const mainView = (
      <Content padder>
        <Image
          source={{
            uri:
              'data:image/png;base64,' +
              this.props.guestReducer.guest_meeting.photo,
          }}
          style={styles.containerSelfiePreview}
          resizeMode="contain"
        />
        <Item fixedLabel>
          <Label>Name</Label>
          <Input
            style={styles.textRight}
            disabled={true}
            multiline={true}
            defaultValue={this.props.guestReducer.guest_meeting.name}
          />
        </Item>
        <Item fixedLabel>
          <Label>Email</Label>
          <Input
            style={styles.textRight}
            disabled={true}
            multiline={true}
            defaultValue={this.props.guestReducer.guest_meeting.email}
          />
        </Item>
        <Item fixedLabel>
          <Label>Phone</Label>
          <Input
            style={styles.textRight}
            disabled={true}
            multiline={true}
            defaultValue={this.props.guestReducer.guest_meeting.phone}
          />
        </Item>
        <Item fixedLabel>
          <Label>Location</Label>
          <Input
            style={styles.textRight}
            disabled={true}
            multiline={true}
            defaultValue={this.props.guestReducer.guest_meeting.location}
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
            defaultValue={this.props.guestReducer.guest_meeting.purpose}
          />
        </Item>
        <Button
          onPress={() => this._nextButton()}
          style={styles.buttonGreenFullRadius}>
          <Text>Finish</Text>
        </Button>
      </Content>
    );

    return (
      <Container>
        <HeaderCostum title={'Meeting'} plain={true} />
        {this.props.utilReducer.isFetching ? loadView : mainView}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    utilReducer: state.utilReducer,
    guestReducer: state.guestReducer,
  };
};

const mapDispatchToProps = {guestMeeting};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GuestResult);
