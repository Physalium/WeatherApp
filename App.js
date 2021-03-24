import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { API_KEY } from '@env'
import Constants from 'expo-constants';

import Weather from './components/Weather';
const statusBarHeight = Constants.statusBarHeight
export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [temperature, setTemperature] = useState(0)
  const [sunset, setSunset] = useState(1551025128)
  const [sunrise, setSunrise] = useState(1550986740)
  const [pressure, setPressure] = useState(1004)
  const [wind, setWind] = useState(0)
  const [humidity, setHumidity] = useState(50)
  const [weatherCondition, setWeatherCondition] = useState(null)
  const [error, setError] = useState(null)




  function fetchWeather(city = "Gliwice") {
    console.log(`miasto: ${city}`)
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        console.log("pobrano dane");
        setSunrise(json.sys.sunrise * 1000)
        setSunset(json.sys.sunset * 1000)
        setTemperature(json.main.temp)
        setHumidity(json.main.humidity)
        setPressure(json.main.pressure)
        setWind(json.wind.speed)
        setWeatherCondition(json.weather[0].main)
        setIsLoading(false)

      }).catch(error => { alert("Nieprawidłowa nazwa") });
  }

  useEffect(() => {
    fetchWeather();
  }, [])

  return (
    <View style={styles.container}>


      {isLoading ? <Text style={
        { alignContent: 'center' }
      }>Pobieranie danych pogodowych</Text> : <Weather weather={weatherCondition} temperature={temperature} sunrise={sunrise} sunset={sunset} humidity={humidity} pressure={pressure} wind={wind}
        fetchWeather={fetchWeather} />}

    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: statusBarHeight
  }
});