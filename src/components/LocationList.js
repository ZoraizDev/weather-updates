import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { MapPinIcon as MapIcon } from "react-native-heroicons/solid";

const LocationList = ({ locations, handelLocation }) => {
  return (
    <View
      className="absolute w-full top-16 rounded-3xl"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        borderBottomColor: "#f0f0f0",
        backdropFilter: "blur(6px)",
      }}
    >
      {locations.map((loc, index) => {
        let showBorder = index + 1 != locations.length;
        let borderClass = showBorder ? "border-b-2 border-b-gray-400" : "";
        return (
          <TouchableOpacity
            onPress={() => handelLocation(loc)}
            key={index}
            className={"flex-row items-center m-1 p-3  px-4 " + borderClass}
          >
            <MapIcon size={20} color={"black"} />
            <Text className="text-black font-bold text-lg ml-2">
              {loc?.name}, {loc?.country}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default LocationList;
