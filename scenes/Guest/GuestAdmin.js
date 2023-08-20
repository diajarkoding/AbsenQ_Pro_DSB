import React, {Component} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import {Button, Container, Content, Text, Thumbnail} from 'native-base';
import Moment from 'moment';
import {NavigationActions, StackActions} from 'react-navigation';

import {connect} from 'react-redux';
import {
  guestAdmin,
  guestAdminRefresh,
  guestApproval,
  guestReject,
} from '../../redux/actions/guestAction';

import {styles} from '../styles';
import HeaderCostum from '../Components/HeaderCostum';
import {
  loadView,
  shandling,
  ehandling,
  inputHandling,
} from '../Components/Util';

class GuestAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.guestAdmin().then(success => {
      if (!success) ehandling(this.props);
    });
  }

  approveBut = data => {
    this.props.guestApproval(data).then(success => {
      if (success) {
        shandling('SUCCESS');
        this.props.navigation.navigate('Home');
        this.props.guestAdminRefresh().then(success => {
          if (!success) ehandling(this.props);
        });
      } else ehandling(this.props);
    });
  };

  rejectBut = data => {
    this.props.guestReject(data).then(success => {
      if (success) {
        shandling('SUCCESS');
        this.props.navigation.navigate('Home');
        this.props.guestAdminRefresh().then(success => {
          if (!success) ehandling(this.props);
        });
      } else ehandling(this.props);
    });
  };

  fetchMore = () => {
    console.log('moree');
    this.props.guestAdmin().then(success => {
      if (!success) ehandling(this.props);
    });
  };
  fetchRefresh = () => {
    console.log('refreshh');
    this.props.guestAdminRefresh().then(success => {
      if (!success) ehandling(this.props);
    });
  };

  guest = ({item: data, index: index}) => {
    var buts = (
      <View style={{flexDirection: 'row'}}>
        <Button
          onPress={() => this.rejectBut(data)}
          style={{
            flex: 1,
            margin: 10,
            borderRadius: 8,
            justifyContent: 'center',
            backgroundColor: 'red',
          }}>
          <Text>Reject</Text>
        </Button>
        <Button
          onPress={() => this.approveBut(data)}
          style={{
            flex: 1,
            margin: 10,
            borderRadius: 8,
            justifyContent: 'center',
            backgroundColor: 'green',
          }}>
          <Text>Approve</Text>
        </Button>
      </View>
    );

    return (
      <>
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
        {data.status == 'WAITING' ? buts : null}
      </>
    );
  };

  render() {
    var {guest_admin, isLoading, isRefreshing} = this.props.guestReducer;

    var loadd = <View style={styles.containerDataFL}>{loadView}</View>;
    var empty = <Text style={styles.textItalicCenter}>No guest yet</Text>;

    const history = (
      <FlatList
        data={guest_admin}
        ItemSeparatorComponent={() => {
          return <View style={styles.containerSeparatorFL} />;
        }}
        style={{width: '100%'}}
        ListHeaderComponent={() => {
          return (
            <>
              <Text style={styles.textBigCenter}>Guest</Text>
              {isRefreshing ? loadd : null}
            </>
          );
        }}
        renderItem={this.guest}
        ListEmptyComponent={isLoading ? null : empty}
        ListFooterComponent={isLoading ? loadd : null}
        keyExtractor={(item, index) => index}
        extraData={guest_admin}
        onEndReached={() => this.fetchMore()}
        refreshControl={
          <RefreshControl
            refreshing={false}
            colors={['#009688']}
            onRefresh={() => this.fetchRefresh()}
          />
        }
        bounces={false}
        onEndReachedThreshold={0.1}
      />
    );

    const mainView = <View style={styles.container}>{history}</View>;

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

const mapDispatchToProps = {
  guestAdmin,
  guestAdminRefresh,
  guestApproval,
  guestReject,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GuestAdmin);
