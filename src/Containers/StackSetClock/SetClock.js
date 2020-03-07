import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Dimensions,
  FlatList,
  Button,
  ScrollView,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import ButtonSave from './ComponentSetClock/ButtonSave';
import CheckModel from './FunctionSetClock/CheckModelForNavigate';
import {StyleSetClockScreen} from './StyleSetClock/StyleSetClock';
import {AddListAlarm} from '../../Redux/Action/ActionListDevice';
import {connect} from 'react-redux';
import GoBackButton from '../../Components/GoBackButton';
const days = [
  {id: 1, name: 'Thứ hai', value: 2},
  {id: 2, name: 'Thứ ba', value: 3},
  {id: 3, name: 'Thứ tư', value: 4},
  {id: 4, name: 'Thứ năm', value: 5},
  {id: 5, name: 'Thứ sáu', value: 6},
  {id: 6, name: 'Thứ bảy', value: 7},
  {id: 7, name: 'Chủ Nhật', value: 8},
  {id: 8, name: 'Hàng ngày', value: 9},
];
const screenWidth = Math.round(Dimensions.get('window').width);

function ItemDay({day, onPress}) {
  const [isSelected, setSelection] = React.useState(false);
  const onSelect = () => {
    setSelection(!isSelected);
    if (onPress) {
      !isSelected
        ? onPress({...day, status: 'success'})
        : onPress({...day, status: 'fail'});
    }
  };

  return (
    <TouchableOpacity
      onPress={onSelect}
      style={[
        StyleSetClockScreen.containerItem,
        {backgroundColor: isSelected ? '#1291b6' : 'gray'},
        {borderColor: isSelected ? '#1291b6' : 'gray'},
      ]}>
      <Text style={StyleSetClockScreen.textItemDay}>{day.name}</Text>
    </TouchableOpacity>
  );
}

class SetClock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      mode: 'date',
      show: false,
      optionLoop: 1,
      nameClock: '',
      listPickedDay: [],
    };
    const {navigation} = this.props;
    this.deviceModel = navigation.getParam('deviceModel', 'default value');
    this.roomId = navigation.getParam('roomId', 'default value');
    this.deviceName = navigation.getParam('deviceName', 'default value');
    this.index = navigation.getParam('index', 'default value');
    this.id = navigation.getParam('id', 'default value');
  }

  SaveSetting = async () => {
    const {navigation} = this.props;
    const {navigate} = this.props.navigation;
    let obj = {
      id: Math.floor(Math.random() * 100),
      hour: this.state.date.getHours(),
      minute: this.state.date.getMinutes(),
      nameClock: this.state.nameClock,
      optionOnOff: navigation.getParam('option', 'default value'),
    };
    await this.props.AddListAlarm(this.roomId, this.id, obj);
    await navigate('ListSettingClockScreen');
  };
  onChangeDate = value => {
    this.setState({
      date: value,
    });
  };

  render() {
    const {navigation} = this.props;
    const {navigate} = this.props.navigation;
    const termNavigate = CheckModel(this.deviceModel);

    return (
      <ScrollView>
        <View
          style={StyleSetClockScreen.header}>
          <GoBackButton
            onPress={() =>
              navigate(navigation.getParam('LastRouteName', 'default value'))
            }
          />
          <ButtonSave onPress={this.SaveSetting} />
        </View>
        <View>
          <TextInput
            placeholder={'Nhập tên hẹn giờ'}
            style={StyleSetClockScreen.nameTextInput}
            value={this.state.nameClock}
            onChangeText={nameClock => this.setState({nameClock: nameClock})}
          />
          <View style={StyleSetClockScreen.containerButton}>
            <TouchableOpacity
              onPress={() => {
                this.setState({optionLoop: 0});
              }}
              style={[
                StyleSetClockScreen.touchButtonLoop,
                {
                  backgroundColor:
                    this.state.optionLoop === 0 ? 'white' : '#A9A9A9',
                },
              ]}>
              <Text
                style={[
                  StyleSetClockScreen.textButtonLoop,
                  {color: this.state.optionLoop === 0 ? 'black' : 'white'},
                ]}>
                Lặp lại
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({optionLoop: 1});
              }}
              style={[
                StyleSetClockScreen.touchButtonLoop,
                {
                  backgroundColor:
                    this.state.optionLoop === 0 ? '#A9A9A9' : 'white',
                },
              ]}>
              <Text
                style={[
                  StyleSetClockScreen.textButtonLoop,
                  {color: this.state.optionLoop === 0 ? 'white' : 'black'},
                ]}>
                Một lần
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/*khu flat list day*/}
        <View>
          <FlatList
            data={days}
            numColumns={Math.floor(screenWidth / 120)}
            renderItem={({item}) => (
              <ItemDay key={item.id} onPress={this.onSelect} day={item} />
            )}
            style={StyleSetClockScreen.containerFlatList}
          />
          <View style={StyleSetClockScreen.containerDatePicker}>
            <DatePicker
              date={this.state.date}
              onDateChange={this.onChangeDate}
              mode={'time'}
            />
          </View>
        </View>

        {/*khu time*/}

        {/*khu list action*/}
        <View style={StyleSetClockScreen.ContainerButtonAddAction}>
          <TouchableOpacity
            onPress={() =>
              navigate(termNavigate, {
                deviceModel: this.deviceModel,
                roomId: this.roomId,
                deviceName: this.deviceName,
                index: this.index,
                id: this.id,
              })
            }
            style={StyleSetClockScreen.containerTouch}>
            <Text style={StyleSetClockScreen.textAddAction}>Trạng Thái</Text>
            {navigation.getParam('option', 'default value') === 1 ? (
              <Text>Bật</Text>
            ) : (
              <Text>Tắt</Text>
            )}
          </TouchableOpacity>
        </View>
        {/*<Button*/}
        {/*  title={'test'}*/}
        {/*  onPress={() => console.warn(this.option)}*/}
        {/*/>*/}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  DATA: state.ListDevice.ListDevice1,
});
const mapDispatchToProps = dispatch => ({
  AddListAlarm: (roomId, id, newSetClock: {}) =>
    dispatch(AddListAlarm(roomId, id, newSetClock)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SetClock);
