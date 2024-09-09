import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { MagnifyingGlassIcon as SearchIcon } from "react-native-heroicons/outline";
import { theme } from "../theme";

const SearchBar = ({ showSearchBar, handleDebounce, setShowSearchBar }) => {
  return (
    <View
      className="flex-row justify-end items-center rounded-full "
      style={{
        backgroundColor: showSearchBar ? theme.bgWhite(0.2) : "transparent",
        marginTop: 50,
      }}
    >
      {showSearchBar && (
        <TextInput
          onChangeText={handleDebounce}
          placeholder="Search City"
          placeholderTextColor={"white"}
          className="h-12 pl-4 text-xl pb-1 flex-1"
        />
      )}
      <TouchableOpacity
        onPress={() => setShowSearchBar(!showSearchBar)}
        style={{ backgroundColor: theme.bgWhite(0.3) }}
        className="p-3 rounded-full m-1"
      >
        <SearchIcon size={25} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
