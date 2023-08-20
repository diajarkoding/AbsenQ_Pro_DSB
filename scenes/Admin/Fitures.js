import React, {Component} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {
  Button,
  Card,
  CardItem,
  Container,
  CheckBox,
  Input,
  Item,
  Text,
} from 'native-base';

import {connect} from 'react-redux';
import {fitureSet, fitureGet} from '../../redux/actions/fitureAction';

import {styles} from '../styles';
import HeaderCostum from '../Components/HeaderCostum';
import {loadView, ehandling, shandling} from '../Components/Util';

class Fitures extends Component {
  constructor(props) {
    super(props);
    this.state = {fiture: []};
  }

  componentDidMount() {
    this.props.fitureGet().then(success => {
      const {fitures} = this.props.fitureReducer;
      if (!success) ehandling(this.props);
      else this.setState({fitures});
    });
  }

  save = index => {
    this.props.fitureSet(this.state.fitures[index]).then(success => {
      if (success) {
        shandling('SUCCESS Set feature');
        this.props.navigation.navigate('Home');
      } else ehandling(this.props);
    });
  };

  render() {
    const mainView = (
      <FlatList
        data={this.state.fitures}
        style={{flex: 1, padding: 10}}
        contentContainerStyle={{paddingBottom: 20}}
        renderItem={({item: data, index: index}) => {
          return (
            <Card
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <CardItem bordered>
                <Text style={{fontSize: 22}}>{data.name}</Text>
              </CardItem>
              {data.description ? (
                <CardItem bordered>
                  <Text>{data.description}</Text>
                </CardItem>
              ) : null}
              <View style={styles.comboboxContainer}>
                <Text style={{fontSize: 20}}>Status</Text>
                <CheckBox
                  checked={data.status}
                  onPress={async () => {
                    let fitures = [...this.state.fitures];
                    fitures[index] = {...fitures[index], status: !data.status};
                    await this.setState({fitures});
                  }}
                />
              </View>
              {data.status ? (
                data.type == 'FEATURE' ? (
                  <View style={styles.comboboxContainer}>
                    <Text style={{fontSize: 20}}>Mandatory</Text>
                    <CheckBox
                      checked={data.mandatory}
                      onPress={async () => {
                        let fitures = [...this.state.fitures];
                        fitures[index] = {
                          ...fitures[index],
                          mandatory: !data.mandatory,
                        };
                        await this.setState({fitures});
                      }}
                    />
                  </View>
                ) : (
                  <View style={{width: '100%', padding: 8}}>
                    <Text style={{fontSize: 20}}>Data</Text>
                    <Item regular style={styles.inputGrey}>
                      <Input
                        placeholder="Data"
                        defaultValue={data.value}
                        placeholderTextColor={'grey'}
                        onChangeText={async data1 => {
                          let fitures = [...this.state.fitures];
                          fitures[index] = {
                            ...fitures[index],
                            data1,
                          };
                          await this.setState({fitures});
                        }}
                      />
                    </Item>
                  </View>
                )
              ) : null}
              <View>
                <Button
                  style={{backgroundColor: 'green', marginVertical: 10}}
                  onPress={() => this.save(index)}>
                  <Text>save</Text>
                </Button>
              </View>
            </Card>
          );
        }}
        ListEmptyComponent={() => {
          return <Text style={styles.textItalicCenter}>No fitures yet</Text>;
        }}
        keyExtractor={(item, index) => index}
      />
    );

    return (
      <Container>
        <HeaderCostum title={'Features'} />
        {this.props.utilReducer.isFetching ? loadView : mainView}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {utilReducer: state.utilReducer, fitureReducer: state.fitureReducer};
};

const mapDispatchToProps = {fitureSet, fitureGet};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Fitures);
