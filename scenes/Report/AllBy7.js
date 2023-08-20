import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import {Container, Text, Thumbnail} from 'native-base';
import Moment from 'moment';

import {connect} from 'react-redux';
import {absensiAllBy7} from '../../redux/actions/absensiAction';

import {styles} from '../styles';
import HeaderCostum from '../Components/HeaderCostum';
import {loadView, ehandling} from '../Components/Util';

class AllBy7 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.absensiAllBy7().then(success => {
      if (!success) ehandling(this.props);
    });
  }

  render() {
    var {data_allBy7} = this.props.absensiReducer;

    const history = (
      <FlatList
        data={data_allBy7}
        ItemSeparatorComponent={() => {
          return <View style={styles.containerSeparatorFL} />;
        }}
        style={{width: '100%'}}
        ListHeaderComponent={() => {
          return (
            <View style={styles.containerDataFL}>
              <View style={styles.containerCenterFull}>
                <Text>Date</Text>
              </View>
              <View style={styles.containerCenterFull}>
                <Text>In</Text>
              </View>
              <View style={styles.containerCenterFull}>
                <Text>Out</Text>
              </View>
            </View>
          );
        }}
        renderItem={({item: data, index: index}) => {
          return (
            <View style={styles.containerDataFL}>
              <View style={styles.containerCenterCenterFull}>
                <Moment element={Text} format="DD-MM-YYYY">
                  {data.createdAt}
                </Moment>
              </View>
              <View style={styles.containerCenterFull}>
                <Thumbnail
                  square
                  large
                  source={{uri: 'data:image/png;base64,' + data.photoIn}}
                />
                <Moment element={Text} format="HH:mm:ss">
                  {data.createdAt}
                </Moment>
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
                </View>
              ) : (
                <View style={styles.containerCenterCenterFull}>
                  <Text>Absent</Text>
                </View>
              )}
            </View>
          );
        }}
        ListEmptyComponent={() => {
          return (
            <Text style={styles.textItalicCenter}>You haven't selfie yet</Text>
          );
        }}
        keyExtractor={(item, index) => index}
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

const mapDispatchToProps = {absensiAllBy7};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllBy7);
