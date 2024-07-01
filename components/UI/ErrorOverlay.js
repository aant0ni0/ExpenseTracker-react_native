import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../constants/styles'

const ErrorOverlay = ({ message, onConfirm }) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.titile]}>An error has occurred</Text>
            <Text style={styles.text}>{message}</Text>
            <Button onPress={onConfirm}>Okay</Button>
        </View>
    )
}

export default ErrorOverlay

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
    },
    text: {
        color: 'white',
        textAlign: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    }
})