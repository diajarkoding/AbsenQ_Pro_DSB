import React, {Component} from 'react';
import {FlatList, Linking, RefreshControl, View} from 'react-native';
import {Container, Button, Text, Thumbnail} from 'native-base';
import Moment from 'moment';

import {connect} from 'react-redux';
import {
  absensiAllPerCompany,
  absensiAllPerCompanyRefresh,
} from '../../redux/actions/absensiAction';

import {styles} from '../styles';
import HeaderCostum from '../Components/HeaderCostum';
import {loadView, inputHandling, ehandling} from '../Components/Util';

class AllPerCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.absensiAllPerCompany().then(success => {
      if (!success) ehandling(this.props);
      // else this.setState({page: this.state.page + 1});
    });
  }

  openGps = (name, lat, lng) => {
    const scheme = Platform.OS === 'ios' ? 'maps:0,0?q=' : 'geo:0,0?q=';
    const latLng = `${lat},${lng}`;
    const url = Platform.select({
      ios: `${scheme}${name}@${latLng}`,
      android: `${scheme}${latLng}(${name})`,
    });

    if (lat == '-' || lng == '-' || lat == null || lng == null) {
      console.log('GPS not found');
      inputHandling('GPS not found');
    } else {
      Linking.openURL(url).catch(err => console.error('Linking error:', err));
    }
  };

  fetchMore = () => {
    console.log('yey');
    this.props.absensiAllPerCompany().then(success => {
      if (!success) ehandling(this.props);
    });
  };
  fetchRefresh = () => {
    console.log('yoy');
    this.props.absensiAllPerCompanyRefresh().then(success => {
      if (!success) ehandling(this.props);
    });
  };

  history_render = ({item: data, index: index}) => {
    return (
      <View style={{marginTop: 5}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: data.late ? 'red' : 'lightgrey',
          }}>
          <Text>{data.User.name}</Text>
          <Moment element={Text} format="DD-MM-YYYY">
            {data.createdAt}
          </Moment>
        </View>
        <View style={styles.containerDataFL}>
          <View style={styles.containerCenterFull}>
            <Thumbnail
              square
              large
              source={{uri: 'data:image/png;base64,' + data.photoIn}}
            />
            <Moment element={Text} format="HH:mm:ss">
              {data.createdAt}
            </Moment>
            <Button
              transparent
              style={{height: 8, alignSelf: 'center'}}
              onPress={() =>
                this.openGps(data.User.name, data.latIn, data.lonIn)
              }>
              <Text>GPS</Text>
            </Button>
          </View>
          {data.photoOut != '' ? (
            <View style={styles.containerCenterFull}>
              <Thumbnail
                square
                large
                source={{
                  uri:
                    data.photoOut != ''
                      ? 'data:image/png;base64,' + data.photoOut
                      : null,
                }}
              />
              <Moment element={Text} format="HH:mm:ss">
                {data.updatedAt}
              </Moment>
              <Button
                transparent
                style={{height: 8, alignSelf: 'center'}}
                onPress={() =>
                  this.openGps(data.User.name, data.latIn, data.lonIn)
                }>
                <Text>GPS</Text>
              </Button>
            </View>
          ) : (
            <View style={styles.containerCenterCenterFull}>
              <Text>Absent</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  render() {
    var {data_perCompany2, isLoading, isRefreshing} = this.props.absensiReducer;

    var loadd = <View style={styles.containerDataFL}>{loadView}</View>;
    var empty = <Text style={styles.textItalicCenter}>No selfie yet</Text>;

    const history = (
      <FlatList
        data={data_perCompany2}
        style={{width: '100%'}}
        ListHeaderComponent={() => {
          return (
            <View style={styles.containerDataFL}>
              <View style={styles.containerCenterFull}>
                <Text>In</Text>
              </View>
              <View style={styles.containerCenterFull}>
                <Text>Out</Text>
              </View>
            </View>
          );
        }}
        renderItem={this.history_render}
        ListEmptyComponent={isLoading ? null : empty}
        ListFooterComponent={isLoading ? loadd : null}
        keyExtractor={(item, index) => index}
        extraData={data_perCompany2}
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
        <HeaderCostum title="Report" />
        {this.props.utilReducer.isFetching ? loadView : mainView}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {utilReducer: state.utilReducer, absensiReducer: state.absensiReducer};
};

const mapDispatchToProps = {absensiAllPerCompany, absensiAllPerCompanyRefresh};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllPerCompany);
