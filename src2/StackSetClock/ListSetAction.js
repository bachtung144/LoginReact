import React, {Component} from 'react';
import {Text, View,SafeAreaView,FlatList,StyleSheet,TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';


class Item extends React.Component{
  render(){
    let onPress = this.props.onPress;
    return (
        <TouchableOpacity style={styles.item} onPress={onPress}>
          <Text style={styles.title}>{this.props.ActionName}</Text>
          <Feather name={'chevron-right'} size={27}
                   style={{
                     alignItems:'center',justifyContent: 'center',marginTop:5}}/>
        </TouchableOpacity>
    );

  }
}
export default class ListSetAction extends Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    this.listAction = navigation.getParam('listAction', 'default value');
    this.DATA = this.initArrDATA()
  }

  initArrDATA(){
    let DATA = [];
    for (let i= 0;i < this.listAction.length;i++){
      let obj = {};
      obj.id = i;
      obj.ActionName = this.listAction[i];
      DATA.push(obj)
    }
    return DATA
  }

  checkNavigate(ActionName){
    if(ActionName === 'on-off') return 'ActionOnOffScreen';
    if (ActionName === 'change-color') return 'ActionChangeColorScreen'
  }
  render() {
    // console.warn(this.DATA);
    const {navigate} = this.props.navigation
    return (
        <SafeAreaView style={styles.container}>
          <FlatList
              data={this.DATA}
              renderItem={({ item }) => <Item ActionName={item.ActionName}
                                              onPress={() => navigate(this.checkNavigate(item.ActionName))}/>}
              keyExtractor={item => item.id}
          />
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: 'white',
    padding: 5,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius:5,
    borderWidth:0.5,
    borderColor:'gray',
    justifyContent:'space-between',
    flexDirection: 'row',
  },
  title: {
    fontSize: 25,
  },
});
