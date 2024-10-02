import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { fetchCurrentTemp, fetchAutoCom } from './constants/CustomFunctions';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as SplashScreen from 'expo-splash-screen';
import { ThemedText } from './constants/ThemedText';

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [tempUnit, setTempUnit] = useState<string>("temp_c");
  const [currentTemp, setCurrentTemp] = useState<number | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debounceSearchQuery, setDebounceSearchQuery] = useState<string>("");
  const [suggestion, setSuggestion] = useState<{ id: string, name: string, country: string }[]>([]);
  const [location, setLocation] = useState<string>("Itahari");
  const [searchBar, setSearchBar] = useState<boolean>(false);

  const handleChange = (text: string) => {
    setSearchQuery(text);
  }

  const changeTemp = (locationName: string) => {
    setLocation(locationName);
    fetchCurrentTemp(location, tempUnit, setCurrentTemp);
  }

  useEffect(() => {
    fetchCurrentTemp(location, tempUnit, setCurrentTemp);
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchAutoCom(searchQuery, setSuggestion);
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchQuery]);



  return (
    <View style={styles.mainContainer}>
      <View style={styles.searchBarContainer}>
        {
          searchBar ? (
            <View style={styles.search}>
              <TextInput
                style={styles.input}
                placeholder='location'
                onChangeText={(text) => handleChange(text)}
              />
              <View style={styles.suggestions}>
                {suggestion.map((sug) => (
                  <Pressable
                    key={sug.id}
                    style={{ width: '100%' }}
                    onPress={() => {
                      changeTemp(sug.name);
                      setSearchBar(false);
                    }}>
                    <View style={styles.row}>
                      <ThemedText style={{ fontSize: 32 }} key={sug.id}>{sug.name}, {sug.country}</ThemedText>
                    </View>
                  </Pressable>
                ))}
              </View>
            </View>
          ) : (
            <View style={styles.search}>
              <Pressable onPress={() => {
                setSearchBar(true);
                setSuggestion([]);
              }}
                style={{ width: 24 }} >
                <AntDesign name="search1" size={24} color="black" />
              </Pressable>
            </View>
          )
        }
      </View>
      <View style={styles.currentContainer}>
        <View style={styles.temp}>
          <ThemedText type='default' style={{ fontSize: 64,}}>
            {currentTemp}
          </ThemedText>
          <ThemedText type='thin' style={{ fontSize: 64, fontWeight: '100' }}>°</ThemedText>
          <ThemedText style={{ fontSize: 64, fontWeight: '100' }}>
            {tempUnit == 'temp_c' ? 'c' : 'f'}
          </ThemedText>
        </View>
        <ThemedText style={{ fontSize: 32, textAlign: 'center' }}>{location}</ThemedText>
      </View>
      <View style={styles.hourlyContainer}>
        <ThemedText style={styles.text}>For Hourly</ThemedText>
      </View>
      <View style={styles.dailyContainer}>
        <ThemedText style={styles.text}>For Daily</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    flex: 1,
    backgroundColor: '#00dfff',
    padding: 15,
    paddingTop: 50,
    justifyContent: 'space-evenly',
    gap: 10
  },
  searchBarContainer: {
    flex: 2,
    width: '100%',
  },
  currentContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hourlyContainer: {
    flex: 4,
    // height: screenHeight * 0.4,
    backgroundColor: '#000',
    borderRadius: 20,
  },
  dailyContainer: {
    flex: 4,
    backgroundColor: '#000',
    borderRadius: 20,
  },
  search: {
    alignContent: 'flex-start',
    alignSelf: 'flex-start',
    width: '100%',
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    textAlign: 'center',
    minHeight: 35,
    borderRadius: 10,
    marginBottom: 5
  },
  suggestions: {
    backgroundColor: '#fff',
    borderRadius: 10,
    zIndex: 1000,
  },
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'hsla(0, 0.00%, 65.90%, 0.47)',
    minWidth: '100%',
    minHeight: 35,
    borderRadius: 10
  },
  temp: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    color: '#fff',
  }
});
