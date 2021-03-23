import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

import { API_KEY } from '@env'

import Weather from './components/Weather';

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




  function fetchWeather(lat = 50.29761, lon = 18.67658) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setSunrise(json.sys.sunrise * 1000)
        setSunset(json.sys.sunset * 1000)
        setTemperature(json.main.temp)
        setHumidity(json.main.humidity)
        setPressure(json.main.pressure)
        setWind(json.wind.speed)
        setWeatherCondition(json.weather[0].main)
        setIsLoading(false)

      });
  }

  useEffect(() => {

    console.log(`api key ${API_KEY}`)
    navigator.geolocation.getCurrentPosition(
      position => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => setError('Error Getting Weather Condtions')
    );
  }, [])

  return (
    <View style={styles.container}>
      {isLoading ? <Text>Pobieranie danych pogodowych</Text> : <Weather weather={weatherCondition} temperature={temperature} sunrise={sunrise} sunset={sunset} humidity={humidity} pressure={pressure} wind={wind} />}
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});