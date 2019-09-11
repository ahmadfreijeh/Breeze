import React, {Component} from 'react';
import {
  View,
  ImageBackground,
  FlatList,
  Image,
  ActivityIndicator,
  Picker,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Modal,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Overlay, Text} from 'react-native-elements';
import {observer, inject} from 'mobx-react';
import countries from '../config/countries.json';
import {MainStyles as styles} from '../config/styles/MainStyles';

const icons = {
  'clear-day': require('../assets/images/clear-day.png'),
  'partly-cloudy-day': require('../assets/images/partly-cloudy-day.png'),
  'partly-cloudy-night': require('../assets/images/partly-cloudy-night.png'),
  'clear-night': require('../assets/images/rain.png'),
  rain: require('../assets/images/rain.png'),
  snow: require('../assets/images/snow.png'),
  sleet: require('../assets/images/sleet.png'),
  wind: require('../assets/images/wind.png'),
  fog: require('../assets/images/fog.png'),
  cloudy: require('../assets/images/cloudy.png'),
  'partly-cloudy-day': require('../assets/images/partly-cloudy-day.png'),
  'partly-cloudy-night': require('../assets/images/partly-cloudy-night.png'),
};

class Main extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      countryData: {},
      countries: countries,
      refreshing: false,
    };
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.props.weatherStore.getCoordinates();
  }

  fToCel(Temp) {
    let fTemp = Temp;
    let CelTemp = ((fTemp - 32) * 5) / 9;
    let roundedTemp = Math.round(CelTemp * 10) / 10;
    return roundedTemp + '\u2103';
  }
  currentTime() {
    var date = new Date();
    var days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    var dayName = days[date.getDay()];
    return (
      dayName + ', ' + parseInt(date.getMonth() + 1) + ', ' + date.getFullYear()
    );
  }
  onRefresh = () => {
    this.setState({refreshing: true});
    this.props.weatherStore.getCoordinates().then(() => {
      this.setState({refreshing: false});
    });
  };

  /**
   * Function that parts as components
   */
  countryListItems = () => {
    return this.state.countries.map((country, i) => {
      return <Picker.Item label={country.name} key={i} value={country} />;
    });
  };

  dailyForcastListItem = ({item}) => {
    return (
      <View style={{flexDirection: 'column', width: 80, alignItems: 'center'}}>
        <Text style={{color: '#ffffff'}}>{item.uvIndex}</Text>
        <Image style={{width: 30, height: 30}} source={icons[item.icon]} />
        <Text style={{color: '#ffffff'}}>
          {this.fToCel(item.apparentTemperatureHigh)}
        </Text>
      </View>
    );
  };

  render() {
    const {
      currentForcastData,
      dailyForcastData,
      countryInfo,
      loading,
      coordinatesDialog,
    } = this.props.weatherStore;

    return (
      <View>
        <Overlay
          isVisible={loading}
          fullScreen
          overlayStyle={{justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </Overlay>

        {!loading && (
          <ImageBackground
            source={require('../assets/images/main_background_1.jpg')}
            style={styles.backgroundImage}
            imageStyle={{opacity: 0.7}}>
            <View style={styles.mainWrapper}>
              <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                  />
                }>
                <View style={{alignItems: 'flex-end'}}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.weatherStore.setCoordinatesDialog(true)
                    }>
                    <Image
                      style={{width: 30, height: 30}}
                      source={require('../assets/images/earth.png')}
                    />
                  </TouchableOpacity>
                </View>
                <Animatable.View
                  animation="fadeInDown"
                  style={[styles.childWrapper, styles.topWrapper]}>
                  <Text style={styles.tempText}>
                    {this.fToCel(currentForcastData.apparentTemperature)}
                  </Text>
                  <Text style={styles.dateText}>{this.currentTime()}</Text>
                  <Image
                    style={{width: 80, height: 80}}
                    source={icons[currentForcastData.icon]}
                  />
                </Animatable.View>
                <View style={[styles.midWrapper]}>
                  <View style={{flex: 1}}>
                    <Text style={styles.countryText}>{countryInfo.name}</Text>
                    <Text style={styles.summaryText}>
                      {currentForcastData.summary}
                    </Text>
                  </View>
                </View>
                <View style={[styles.bottomWrapper]}>
                  <FlatList
                    horizontal={true}
                    data={dailyForcastData.data}
                    keyExtractor={item => item.time.toString()}
                    renderItem={this.dailyForcastListItem}
                  />
                </View>
              </ScrollView>
            </View>
          </ImageBackground>
        )}

        <Modal visible={coordinatesDialog} animationType="slide">
          <View style={styles.modalWrapper}>
            <Text h4>Choose Country</Text>
            <Picker
              selectedValue={this.state.countryData}
              style={styles.modalPicker}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({
                  countryData: itemValue,
                })
              }>
              {this.countryListItems()}
            </Picker>
            <View style={styles.modalActionsWrapper}>
              <TouchableOpacity
                onPress={() => this.props.weatherStore.getCoordinates()}>
                <Text style={styles.modalText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{paddingLeft: 10}}
                onPress={() =>
                  this.props.weatherStore.saveCoordinates(
                    this.state.countryData,
                  )
                }>
                <Text style={styles.modalText}>Choose</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default inject('weatherStore')(observer(Main));
