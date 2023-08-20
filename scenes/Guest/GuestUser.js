import React, {Component} from 'react';
import {FlatList, Image, View} from 'react-native';
import {
  Button,
  Container,
  Content,
  Input,
  Item,
  Text,
  Thumbnail,
} from 'native-base';
import Moment from 'moment';

import {connect} from 'react-redux';
import {guestUser} from '../../redux/actions/guestAction';

import {styles} from '../styles';
import HeaderCostum from '../Components/HeaderCostum';
import {loadView, ehandling, inputHandling} from '../Components/Util';

class GuestUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.guestUser().then(success => {
      if (!success) ehandling(this.props);
    });

    // this.props.navigation.navigate('RegisGuest');
  }

  render() {
    var {guest_user} = this.props.guestReducer;

    const addBut = (
      <Button
        onPress={() => this.props.navigation.navigate('RegisGuest')}
        style={styles.buttonGreenFullRadius}>
        <Text>Register</Text>
      </Button>
    );

    const history = (
      <FlatList
        data={guest_user}
        ItemSeparatorComponent={() => {
          return <View style={styles.containerSeparatorFL} />;
        }}
        style={{width: '100%'}}
        ListHeaderComponent={() => {
          return (
            <View style={styles.containerDataFL}>
              <View style={styles.containerCenterFull}>
                <Text>Your Guest</Text>
              </View>
            </View>
          );
        }}
        renderItem={({item: data, index: index}) => {
          return (
            <View style={styles.containerDataFL}>
              <View
                style={{
                  justifyContent: 'center',
                  ...styles.containerCenterFull,
                }}>
                <Thumbnail
                  square
                  large
                  source={{uri: 'data:image/png;base64,' + data.photo}}
                />
              </View>
              <View style={{flex: 2.5, justifyContent: 'center'}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{flex: 1}}>Booked</Text>
                  <Text style={{flex: 0.2}}>:</Text>
                  <Moment
                    element={Text}
                    format="DD-MM-YYYY HH:mm"
                    style={{flex: 2}}>
                    {data.createdAt}
                  </Moment>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{flex: 1}}>Meeting</Text>
                  <Text style={{flex: 0.2}}>:</Text>
                  <Moment
                    element={Text}
                    format="DD-MM-YYYY HH:mm"
                    style={{flex: 2}}>
                    {data.date}
                  </Moment>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{flex: 1}}>Purpose</Text>
                  <Text style={{flex: 0.2}}>:</Text>
                  <Text style={{flex: 2}}>{data.purpose}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{flex: 1}}>Status</Text>
                  <Text style={{flex: 0.2}}>:</Text>
                  <Text style={{flex: 2}}>{data.status}</Text>
                </View>
                {data.guests.map((data1, i) => (
                  <>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{flex: 1}}>Name {i + 1}</Text>
                      <Text style={{flex: 0.2}}>:</Text>
                      <Text style={{flex: 2}}>{data1.name}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{flex: 1}}>Email {i + 1}</Text>
                      <Text style={{flex: 0.2}}>:</Text>
                      <Text style={{flex: 2}}>{data1.email}</Text>
                    </View>
                  </>
                ))}
              </View>
            </View>
          );
        }}
        ListEmptyComponent={() => {
          return (
            <Text style={styles.textItalicCenter}>
              You haven't add a guest yet
            </Text>
          );
        }}
        keyExtractor={(item, index) => index}
      />
    );

    const mainView = (
      <Content padder>
        {history}
        {addBut}
      </Content>
    );

    return (
      <Container>
        <HeaderCostum title="Guest" />
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

const mapDispatchToProps = {guestUser};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GuestUser);
