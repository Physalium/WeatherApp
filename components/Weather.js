import React, { useState, useEffect, } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getMonthName, getWeekName } from '../utils/utils';
import PropTypes from 'prop-types';
import { weatherConditions } from '../utils/WeatherConditions';
import WeatherAttr from './WeatherAttr';

const Weather = ({ weather, temperature, sunset, sunrise, wind, humidity, pressure, fetchWeather }) => {
    const sunriseDate = convertUTCDateToLocalDate(new Date(sunrise))
    const sunsetDate = convertUTCDateToLocalDate(new Date(sunset))
    const [date, setDate] = useState(new Date(Date.now()))
    const [city, setCity] = useState("Gliwice")
    const [elderMode, setElderMode] = useState(false)
    useEffect(() => {
        setDate(convertUTCDateToLocalDate(new Date(Date.now())))

    }, [])


    useEffect(() => {
        fetchWeather(city)
    }, [city])
    return (
        <View
            style={[
                styles.weatherContainer,
                { backgroundColor: weatherConditions[weather].color }
            ]}
        >
            <View style={styles.cityContainer}>
                <MaterialCommunityIcons
                    size={47}
                    name={'map-marker'}
                    color={'#fff'}
                />
                <TextInput
                    style={styles.cityTextInput}
                    onSubmitEditing={(event) => {
                        setCity(event.nativeEvent.text)
                    }}
                    defaultValue="Gliwice"
                    maxLength={10}
                />
            </View>
            <View style={styles.headerContainer}>
                <MaterialCommunityIcons
                    size={103}
                    name={weatherConditions[weather].icon}
                    color={'#fff'}
                />
                <Text style={styles.tempText}>{temperature}˚</Text>

            </View>
            <View style={styles.datetimeContainer}>
                <Text style={[styles.datetimeText, { fontSize: 40, fontWeight: '500' }]}>  {`${date.getHours()}:${(date.getUTCMinutes() < 10 ? '0' : '') + date.getUTCMinutes()}`}</Text>
                <Text style={styles.datetimeText}>  {`${getWeekName(date.getUTCDay())}, ${date.getUTCDate()} ${getMonthName(date.getUTCMonth() + 1)}`}</Text>
            </View>
            <View style={styles.bodyContainer}>
                <Text style={styles.title}>{weatherConditions[weather].title}</Text>
                <WeatherAttr attribute="Sunrise" value={`${sunriseDate.getHours()}:${sunriseDate.getMinutes()}`} />
                <WeatherAttr attribute="Sunset" value={`${sunsetDate.getHours()}:${sunsetDate.getMinutes()}`} />
                <WeatherAttr attribute="Wind" value={wind} />
                <WeatherAttr attribute="Pressure" value={pressure} />
                <WeatherAttr attribute="Humidity" value={humidity} />
            </View>

            <TouchableOpacity
                onPress={() => setElderMode(elderMode ? false : true)}
                style={[styles.modeSwitchButton, { backgroundColor: 'white' }]}>
                <Text style={{ fontSize: 25, color: 'black' }}>{elderMode ? "Wyłącz" : "Włącz"} tryb seniora</Text>
            </TouchableOpacity>

        </View >
    );
};



function convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    var offset = -1
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
}

Weather.propTypes = {
    temperature: PropTypes.number.isRequired,
    weather: PropTypes.string,
};

const styles = StyleSheet.create({
    weatherContainer: {
        flex: 1,
        alignItems: 'center'
    },
    modeSwitchButton: {
        width: '96%',
        alignItems: 'center',
        height: 38,
        borderRadius: 10,
    },
    datetimeContainer: {
        flex: 0.5,
        flexDirection: 'column',
        alignItems: 'center',

    },
    headerContainer: {
        flex: 0.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    cityContainer: {
        alignItems: 'center',
        width: 260,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 15,
    },
    cityTextInput: {
        height: 40,
        width: 220,
        fontSize: 36,
        color: 'white',
        justifyContent: 'center',
    },
    tempText: {
        fontSize: 72,
        color: '#fff'
    },
    bodyContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        paddingLeft: 5,
        marginBottom: 30
    },
    title: {
        fontSize: 60,
        color: '#fff'
    },
    datetimeText: {
        fontSize: 24,
        color: '#fff'
    }
});

export default Weather;