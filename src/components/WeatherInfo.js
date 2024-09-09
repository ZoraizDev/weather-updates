import React from "react";
import { View, Text, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { weatherImages } from "../constants";

const WeatherInfo = ({ current, location }) => {
  return (
    <>
      <View className="flex-row items-center justify-center">
        <Text className="text-white text-3xl font-bold items-center justify-center">
          {location?.name},
        </Text>
        <Text className="text-lg text-white font-semibold items-center justify-center">
          {" " + location?.country}
        </Text>
      </View>
      {/* IMAGE VIEW */}
      <View className="justify-center flex-row">
        <Image
          source={weatherImages[current?.condition?.text]}
          className="w-52 h-52"
        />
      </View>
      {/* TEMPERATURE CELCIUS */}
      <View className="">
        <Text className="text-center text-6xl text-white font-bold">
          {current?.temp_c}&#176;
        </Text>
        <Text className="text-center text-xl text-white tracking-widest">
          {current?.condition?.text}
        </Text>
      </View>
      {/* WEATHER CONDITIONS */}
      <View className="flex-row space-x-6 items-center ">
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
