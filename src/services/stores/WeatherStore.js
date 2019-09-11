import {observable, action} from 'mobx'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

// apparentTemperatureHigh: 67.41 apparentTemperatureHighTime: 1567810800
// apparentTemperatureLow: 58.46 apparentTemperatureLowTime: 1567868400
// apparentTemperatureMax: 67.41 apparentTemperatureMaxTime: 1567810800
// apparentTemperatureMin: 58.09 apparentTemperatureMinTime: 1567778400
// cloudCover: 0.47 dewPoint: 58.3 humidity: 0.89 icon: "partly-cloudy-day"
// moonPhase: 0.28 ozone: 278 precipIntensity: 0.0006 precipIntensityMax: 0.0018
// precipIntensityMaxTime: 1567796400 precipProbability: 0.06 precipType: "rain"
// pressure: 1018.29 summary: "Mostly cloudy throughout the day." sunriseTime:
// 1567777528 sunsetTime: 1567823613 temperatureHigh: 67.41 temperatureHighTime:
// 1567810800 temperatureLow: 58.24 temperatureLowTime: 1567868400
// temperatureMax: 67.41 temperatureMaxTime: 1567810800 temperatureMin: 57.9
// temperatureMinTime: 1567778400 time: 1567753200 uvIndex: 7 uvIndexTime:
// 1567800000 visibility: 9.825 windBearing: 249 windGust: 17.14 windGustTime:
// 1567814400 windSpeed: 7.8
class WeatherStore {

    @observable currentForcastData = {}
    @observable dailyForcastData = []
    @observable loading = true
    @observable coordinatesDialog = false
    @observable countryInfo = {}
    @observable randomWallpaperNum = Math.floor(Math.random() * Math.floor(3))

    async fetchData() {
        axios.get('https://api.darksky.net/forecast/3514960c5ca5627624b465dccee692e4/' + this.countryInfo.latlng[0] + ',' + this.countryInfo.latlng[1]).then((response) => {
            this.currentForcastData = response.data.currently,
            this.dailyForcastData = response.data.daily,
            this.coordinatesDialog = false,
            this.loading = false
        }).catch(function (error) {
            console.log(error);
        });
    }

    getCoordinates = async() => {
        try {
            const info = await AsyncStorage.getItem('@countryInfo')
            if (info !== null) {
                let c = JSON.parse(info);
                this.countryInfo = c
                this.fetchData()
            } else {
                this.loading = false
                this.coordinatesDialog = true
            }
        } catch (e) {
            console.log(e)
        }
    }

    saveCoordinates= async (data) => {
        try {
            this.loading = true
            await AsyncStorage.setItem('@countryInfo', JSON.stringify(data))
            this.getCoordinates();
        } catch (e) {
          console.log(e)
        }
    }

    @action setCoordinatesDialog(value){
        this.coordinatesDialog = value
    }


}

const weatherStore = new WeatherStore();
export default weatherStore;