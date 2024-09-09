import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const IntroScreen = ({ navigation }) => {
  return (
    <View className="flex-1 justify-center items-center bg-blue-100 p-4">
      <Text className="text-2xl font-bold text-gray-800 mb-4">
        Welcome to WeatherNow
      </Text>
      <Text className="text-lg text-gray-600 text-center mb-8">
        Get real-time weather updates for your current location or search any city to see the weather details.
      </Text>
      <TouchableOpacity
        className="bg-blue-500 rounded-lg p-4"
        onPress={() => navigation.navigate('Home')} // Ensure you are navigating to 'Home'
      >
        <Text className="text-white text-lg font-semibold">Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default IntroScreen;
