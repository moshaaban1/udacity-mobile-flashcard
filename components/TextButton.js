import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { white, gray2 } from '../utils/colors'

export default function TextButton ({ children, onPress, style = {} }) {
  return (
    <View style={styles.buttonSection}>
      <TouchableOpacity onPress={onPress}>
        <Text style={[styles.reset, style]}>{children}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  reset: {
    textAlign: 'center',
    color: white,
    backgroundColor: gray2,
    width: 200,
    justifyContent: 'center',
    fontSize: 18,
    fontWeight: '700',
  },
  buttonSection: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 15,
   }

})
