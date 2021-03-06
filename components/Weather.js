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
    const [cityText, setCityText] = useState("Gliwice")
    const [elderMode, setElderMode] = useState(false)
    useEffect(() => {
        setDate(convertUTCDateToLocalDate(new Date(Date.now())))

    }, [city])


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
                    size={elderMode ? 53 : 47}
                    name={'map-marker'}
                    color={'#fff'}
                />
                <TextInput
                    style={[styles.cityTextInput, { fontSize: elderMode ? 44 : 36, height: elderMode ? 60 : 40, width: elderMode ? 300 : 250, }]}
                    onSubmitEditing={(event) => {
                        setCity(event.nativeEvent.text)
                    }}
                    value={cityText}
                    onChangeText={text => setCityText(text)}
                    maxLength={12}
                />
            </View>
            <View style={styles.headerContainer}>
                <MaterialCommunityIcons
                    size={elderMode ? 95 : 80}
                    name={weatherConditions[weather].icon}
                    color={'#fff'}
                />
                <Text style={[styles.tempText, { marginLeft: 45, fontSize: elderMode ? 80 : 64 }]}>{temperature}??</Text>

            </View>
            <View style={styles.datetimeContainer}>
                <Text style={[styles.datetimeText, { fontSize: elderMode ? 55 : 40, fontWeight: '500' }]}>  {`${date.getHours()}:${(date.getUTCMinutes() < 10 ? '0' : '') + date.getUTCMinutes()}`}</Text>
                <Text style={[styles.datetimeText, { fontSize: elderMode ? 30 : 24 }]}>  {`${getWeekName(date.getUTCDay())}, ${date.getUTCDate()} ${getMonthName(date.getUTCMonth() + 1)}`}</Text>
            </View>
            <View style={[styles.bodyContainer, elderMode ? { paddingLeft: 0, } : {}]}>
                <Text style={[styles.title, elderMode ? { marginLeft: 4, fontSize: 56, } : {}]}>{weatherConditions[weather].title}</Text>
                <WeatherAttr attribute="Sunrise" elderMode={elderMode}
                    value={`${sunriseDate.getHours()}:${sunriseDate.getMinutes()}`} />
                <WeatherAttr attribute="Sunset" elderMode={elderMode}
                    value={`${sunsetDate.getHours()}:${sunsetDate.getMinutes()}`} />
                <WeatherAttr attribute="Wind" elderMode={elderMode}
                    value={wind} />
                <WeatherAttr attribute="Pressure" elderMode={elderMode}
                    value={pressure} />
                <WeatherAttr attribute="Humidity" elderMode={elderMode}
                    value={humidity} />
            </View>

            <TouchableOpacity
                onPress={() => setElderMode(elderMode ? false : true)}
                style={[styles.modeSwitchButton, { backgroundColor: 'white' }]}>
                <Text style={{ fontSize: 25, color: 'black' }}>{elderMode ? "Wy????cz" : "W????cz"} tryb seniora</Text>
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
        marginTop: 15,
        flexDirection: 'column',
        alignItems: 'center',

    },
    headerContainer: {
        flex: 0.4,
        flexDirection: 'row',
        alignItems: 'center',

        justifyContent: 'space-evenly'
    },
    cityContainer: {
        alignItems: 'center',

        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 15,
        backgroundColor: 'rgba(20, 20, 20,0.9)',
        borderRadius: 30,
        padding: 10,
        marginTop: 20
        , marginBottom: 20
    },
    cityTextInput: {

        width: 220,

        color: 'white',
        justifyContent: 'center',
    },
    tempText: {

        color: '#fff'
    },
    bodyContainer: {
        flex: 1.3,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        paddingLeft: 15,
        marginBottom: 30
    },
    title: {
        fontSize: 53,
        color: '#fff',
        marginLeft: -6
    },
    datetimeText: {

        color: '#fff'
    }
});

export default Weather;