import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { theme } from "../theme";


const ForecastList = ({ forecast }) => {
  return (
    <>
      <View className="flex-row items-center ml-2">
    
        <Text className="text-white font-semibold ml-3 text-lg">
          Daily Forecast
        </Text>
      </View>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {forecast?.forecastday?.map((days, index) => {
            let date = new Date(days.date);
            let options = { weekday: "long" };
            let dayName = date.toLocaleDateString("en-US", options);
            // const imageSource = weatherImg[days?.day?.condition?.text];
            return (
              <View
                key={index}
                className=" w-32 rounded-3xl py-4 px-5 ml-3"
                style={{ backgroundColor: theme.bgWhite(0.3) }}
              >
                <Image
                    source={{ uri: `https:${days?.day?.condition?.icon}` }}
                  className="w-12 h-12 ml-5"
                />
                 
                <Text className="text-slate-300 font-semibold text-center py-1">
                  {dayName}
                </Text>
                <Text className="text-white font-semibold text-lg text-center">
                  {days?.day?.avgtemp_c}&#176;
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </>
  );
};

export default ForecastList;
