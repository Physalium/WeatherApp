import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { weatherAttributes } from '../utils/WeatherAttributes';
export default function WeatherAttr({ attribute, value, elderMode }) {

    return (
        <View style={[styles.attrContainer, elderMode ? { marginLeft: 0, marginRight: 0 } : {}]}>
            <MaterialCommunityIcons
                size={elderMode ? 46 : 40}
                name={weatherAttributes[attribute].icon}
                color={'#fff'}
            />
            <View style={styles.titleContainer}>
                <Text style={elderMode ? styles.attrElderModeTitle : styles.attrTitle}>{weatherAttributes[attribute].title}</Text>
            </View>
            <View
                style={{
                    flex: 0.1,
                }} >
                {elderMode ? null :
                    <View style={{
                        height: 27,
                        width: 1.5,
                        alignContent: 'center',
                        backgroundColor: 'white',
                    }} />
                }
            </View>
            <View style={[styles.valueContainer, elderMode ? { flex: 0.52, marginLeft: -30, marginRight: -7 } : {}]}>

                <Text style={elderMode ? styles.attrElderModeValue : styles.attrValue}>{value} {weatherAttributes[attribute].postfix}</Text>
            </View>
        </View >
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
        fontSize: 24,
        color: '#fff'
    },
    attrElderModeTitle: {
        fontSize: 32,
        color: '#fff',
    },
    attrValue: {
        fontSize: 24,
        color: '#fff',
        marginEnd: 5
    },
    attrElderModeValue: {
        fontSize: 32,
        color: '#fff',
        marginEnd: 5
    }
});
