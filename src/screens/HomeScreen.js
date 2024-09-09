import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { debounce } from "lodash";
import * as Progress from "react-native-progress";
import * as Location from "expo-location";
import SearchBar from "../components/SearchBar";
import LocationList from "../components/LocationList";
import WeatherInfo from "../components/WeatherInfo";
import ForecastList from "../components/ForeCastList";
import { fetchLocations, fetchWeatherForecast, fetchCurrentLocations } from "../api/weather";

export default function HomeScreen() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  const handelLocation = (loc) => {
    setLocations([]);
    setShowSearchBar(false);
    setLoading(true);
    fetchWeatherForecast({
      cityName: loc.name,
      days: "7",
    }).then((data) => {
      setWeather(data);
      setLoading(false);
    });
  };
  const handelSelectedLocation = (name) => {
    setLocations([]);
    setShowSearchBar(false);
    setLoading(true);
    fetchWeatherForecast({
      cityName: name,
      days: "7",
    }).then((data) => {
      setWeather(data);
      setLoading(false);
    });
  };
  const handleSearch = (value) => {
    if (value.length > 2) {
      fetchLocations({ cityName: value }).then((data) => setLocations(data));
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    fetchMyWeatherData(latitude, longitude);
  };

  const fetchMyWeatherData = async (latitude, longitude) => {
    fetchCurrentLocations({ latLong: `${latitude},${longitude}`, days: "7" }).then((data) => {
      setWeather(data);
      setLoading(false);
    });
  };
  const toggleFavorite = (locationName) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(locationName)
        ? prevFavorites.filter((fav) => fav !== locationName)
        : [...prevFavorites, locationName]
    );
  };

  const handleDebounce = useCallback(debounce(handleSearch, 1000), []);
  const { current, location } = weather;

  return (
    <View className="h-[7] flex-1 relative">
      <StatusBar style="light" />
      <Image
        blurRadius={13}
        source={{
          uri: "https://i.pinimg.com/736x/cf/37/59/cf3759d8676ccb5f629c45e7d204fb05.jpg",
        }}
        className="h-full w-full absolute"
      />

      {loading ? (
        <View className="flex-1 flex-row justify-center items-center">
          <Progress.CircleSnail thickness={10} size={140} color="white" />
        </View>
      ) : (
        <SafeAreaView className="flex flex-1">
          <View className="mx-4 relative z-50">
            <SearchBar
              showSearchBar={showSearchBar}
              handleDebounce={handleDebounce}
              setShowSearchBar={setShowSearchBar}
            />
            {locations.length > 0 && showSearchBar && (
              <LocationList
                locations={locations}
                handelLocation={handelLocation}
              />
            )}
          </View>
          <View className="flex-1 flex justify-around mx-4 mb-2">
            <WeatherInfo current={current} location={location}favorites={favorites}
            toggleFavorite={toggleFavorite} handelSelectedLocation={handelSelectedLocation} />
            <ForecastList forecast={weather?.forecast} />
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}
