import React, {Component} from 'react';
import {AppState, FlatList, RefreshControl, View} from 'react-native';
import {Container, Text, Thumbnail} from 'native-base';

import {connect} from 'react-redux';
import {
  userPerCompany2,
  userPerCompanyAdmin,
  userPerCompanyRefresh,
} from '../../redux/actions/userAction';

import {styles} from '../styles';
import HeaderCostum from '../Components/HeaderCostum';
import {loadView, ehandling} from '../Components/Util';
import {fetchingRequest, validation} from '../../redux/actions/utilAction';

class HomeAdmin extends Component {
  constructor(props) {
    super(props);
    this.onEndReachedCalledDuringMomentum = true;
    this.state = {};
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    this.props.userPerCompanyAdmin().then(success => {
      if (!success) ehandling(this.props);
    });
    this.props.userPerCompany2().then(success => {
      if (!success) ehandling(this.props);
    });

    // this.props.navigation.navigate('RegistrasiPhoto');
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    if (nextAppState === 'active') {
      this.props.validation().then(success => {
        if (!success) ehandling(this.props);
      });
    } else if (nextAppState === 'background') this.props.fetchingRequest();
  };

  fetchMore = () => {
    console.log('yey');
    this.props.userPerCompany2().then(success => {
      if (!success) ehandling(this.props);
    });
  };
  fetchRefresh = () => {
    console.log('yoy');
    this.props.userPerCompanyRefresh().then(success => {
      if (!success) ehandling(this.props);
    });
  };

  employee = ({item: data, index: index}) => {
    return (
      <View style={{flexDirection: 'row', margin: 5}}>
        <View style={styles.containerCenterFull}>
          <Thumbnail
            square
            large
            source={{uri: 'data:image/png;base64,' + data.photo}}
          />
        </View>
        <View style={{flex: 2, justifyContent: 'center'}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{flex: 1}}>Name</Text>
            <Text style={{flex: 0.2}}>:</Text>
            <Text style={{flex: 2}}>{data.name}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{flex: 1}}>NIK</Text>
            <Text style={{flex: 0.2}}>:</Text>
            <Text style={{flex: 2}}>{data.nik}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{flex: 1}}>Email</Text>
            <Text style={{flex: 0.2}}>:</Text>
            <Text style={{flex: 2}}>{data.email}</Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const {
      admin,
      perCompany2,
      isLoading,
      isRefreshing,
      isLoadingAdmin,
    } = this.props.userReducer;

    var loadd = <View style={styles.containerDataFL}>{loadView}</View>;
    var emptyAdmin = <Text style={styles.textItalicCenter}>No admin yet</Text>;
    var empty = <Text style={styles.textItalicCenter}>No user yet</Text>;

    const adminView = (
      <FlatList
        data={admin}
        style={{width: '100%'}}
        ListHeaderComponent={() => {
          return <Text style={styles.textBigCenter}>Admin</Text>;
        }}
        renderItem={this.employee}
        ListEmptyComponent={isLoadingAdmin ? loadd : emptyAdmin}
        keyExtractor={(item, index) => index}
      />
    );

    const perCompanyView = (
      <FlatList
        data={perCompany2}
        ItemSeparatorComponent={() => {
          return <View style={styles.containerSeparatorFL} />;
        }}
        style={{width: '100%'}}
        ListHeaderComponent={() => {
          return (
            <>
              <Text style={styles.textBigCenter}>User</Text>
              {isRefreshing ? loadd : null}
            </>
          );
        }}
        renderItem={this.employee}
        ListEmptyComponent={isLoading ? null : empty}
        ListFooterComponent={isLoading ? loadd : null}
        keyExtractor={(item, index) => index}
        extraData={perCompany2}
        // onEndReached={() => this.fetchMore()}
        onEndReached={({distanceFromEnd}) => {
          if (!this.onEndReachedCalledDuringMomentum) {
            this.fetchMore();
            this.onEndReachedCalledDuringMomentum = true;
          }
        }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            colors={['#009688']}
            onRefresh={() => this.fetchRefresh()}
          />
        }
        bounces={false}
        onEndReachedThreshold={0.1}
        onMomentumScrollBegin={() => {
          this.onEndReachedCalledDuringMomentum = false;
        }}
      />
    );

    const mainView = (
      <View style={styles.container}>
        {adminView}
        {perCompanyView}
      </View>
    );

    return (
      <Container>
        <HeaderCostum />
        {this.props.utilReducer.isFetching ? loadView : mainView}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {utilReducer: state.utilReducer, userReducer: state.userReducer};
};

const mapDispatchToProps = {
  fetchingRequest,
  userPerCompany2,
  userPerCompanyAdmin,
  userPerCompanyRefresh,
  validation,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeAdmin);
