import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { weatherAttributes } from '../utils/WeatherAttributes';
export default function WeatherAttr({ attribute, value }) {

    return (
        <View style={styles.attrContainer}>
            <MaterialCommunityIcons
                size={40}
                name={weatherAttributes[attribute].icon}
                color={'#fff'}
            />
            <View style={styles.titleContainer}>
                <Text style={styles.attrTitle}>{weatherAttributes[attribute].title}</Text>
            </View>
            <View
                style={{
                    flex: 0.1,
                }} >
                <View style={{
                    height: 30,
                    width: 3,
                    alignContent: 'center',
                    backgroundColor: 'white',
                }} />
            </View>
            <View style={styles.valueContainer}>

                <Text style={styles.attrValue}>{value} {weatherAttributes[attribute].postfix}</Text>
            </View>
        </View>
    )


}
const styles = StyleSheet.create({

    attrContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        justifyContent: 'space-evenly',
        marginStart: 4,
        marginEnd: 8,
    },
    valueContainer: {
        flex: 0.4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleContainer: {
        flex: 0.5,
        marginLeft: 15

    },
    attrTitle: {
        fontSize: 25,
        color: '#fff'
    },
    attrValue: {
        fontSize: 25,
        color: '#fff',
        marginEnd: 5
    }
});
