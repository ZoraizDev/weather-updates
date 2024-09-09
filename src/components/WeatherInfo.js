import React, { useState } from "react";
import { View, Text, Image, Switch, TouchableOpacity, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { weatherImages } from "../constants";
import Icon from 'react-native-vector-icons/FontAwesome'; // Fallback icon library

const WeatherInfo = ({ current, location, favorites, toggleFavorite, handelSelectedLocation }) => {
  const [isCelsius, setIsCelsius] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const convertToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;

  const temperature = isCelsius
    ? current?.temp_c
    : convertToFahrenheit(current?.temp_c);

  const isFavorite = favorites.includes(location?.name);

  const handleFavoriteToggle = () => {
    toggleFavorite(location?.name);
  };



  return (
    <>
      <View className="flex-row items-center justify-center">
      <TouchableOpacity onPress={handleFavoriteToggle} className="mr-4">
          <Icon
            name={isFavorite ? "star" : "star-o"}
            size={30}
            color={isFavorite ? "gold" : "white"}
          />
        </TouchableOpacity>
        <Text className="text-white text-3xl font-bold items-center justify-center">
          {location?.name},
        </Text>
        <Text className="text-lg text-white font-semibold items-center justify-center">
          {" " + location?.country}
        </Text>
        <TouchableOpacity className="mr-4" onPress={() => setDropdownOpen(!dropdownOpen)} >
          <Feather name="chevron-down" size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      {/* Dropdown List */}
      {dropdownOpen && (
        <View className="absolute top-12 bg-black bg-opacity-70 rounded-lg shadow-lg">
          <FlatList
            data={favorites}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handelSelectedLocation(item)}
                className="p-2 border-b border-gray-700"
              >
                <Text className="text-white text-lg">{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {/* LOTTIE ANIMATION */}
      <View className="justify-center items-center">
        <LottieView
          source={require("../assets/lottie/clouds1.json")}
          autoPlay
          loop
          style={{ width: 200, height: 100 }}
        />
      </View>

      {/* IMAGE VIEW */}
      <View className="justify-center flex-row">
        <Image
          source={weatherImages[current?.condition?.text]}
          className="w-32 h-32"
        />
      </View>
      {/* TEMPERATURE */}
      <View className="">
        <Text className="text-center text-6xl text-white font-bold">
          {temperature.toFixed(1)}&#176; {isCelsius ? "C" : "F"}
        </Text>
        <Text className="text-center text-xl text-white tracking-widest">
          {current?.condition?.text}
        </Text>
      </View>
      {/* SWITCH BUTTON */}
      <View className="flex-row justify-center items-center mt-4">
        <Text className="text-lg text-white font-semibold mr-2">
          Celsius
        </Text>
        <Switch
          value={!isCelsius}
          onValueChange={toggleTemperatureUnit}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isCelsius ? "#f4f3f4" : "#f5dd4b"}
        />
        <Text className="text-lg text-white font-semibold ml-2">
          Fahrenheit
        </Text>
      </View>
      {/* WEATHER CONDITIONS */}
      <View className="flex-row space-x-6 items-center mt-4">
        <View className="ml-8 flex-row space-x-1 items-center">
          <Feather name="wind" size={30} color="white" />
          <Text className="items-center text-white text-lg font-semibold">
            {current?.wind_kph} km
          </Text>
        </View>
        <View className="ml-2 flex-row space-x-1 items-center">
          <Entypo name="drop" size={30} color="white" />
          <Text className="items-center text-white text-lg font-semibold">
            {current?.humidity}%
          </Text>
        </View>
        <View className="ml-2 flex-row space-x-1 items-center">
          <Feather name="sun" size={30} color="white" />
          <Text className="items-center text-white text-lg font-semibold">
            14km
          </Text>
        </View>
      </View>
    </>
  );
};

export default WeatherInfo;
