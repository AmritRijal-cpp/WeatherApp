import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { fetchCurrentTemp, fetchAutoCom, testQuery } from './constant';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
import AntDesign from '@expo/vector-icons/AntDesign';
import * as Font from 'expo-font';
// import AppLoading from 'expo-app-loading';

export default function App() {

  const [fonts, setFonts] = useState<boolean>(false);
  useEffect(()=> {
    async function loadFonts() {
      await Font.loadAsync({
        'Noto-Sans-Light': require('./assets/fonts/NotoSans-Light.ttf'),
        // 'Noto-Sans-Regular': require('./assets/fonts/'),
        // 'Noto-Sans-Bold': require('./assets/fonts/'),
        // 'Noto-Sans-SemiBold': require('./assets/fonts/'),
        // 'Noto-Sans-ExtraBold': require('./assets/fonts/')
      });
      setFonts(true);
      
    }
    loadFonts();
  })


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
                      <Text style={{ fontFamily: 'NotoSans-Regular', fontSize:32 }} key={sug.id}>{sug.name}, {sug.country}</Text>
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
        <Text style={styles.temp}>
          {currentTemp}
          <Text style={{ fontWeight: '100' }}>°</Text>
          <Text style={{ fontWeight: '100' }}>
            {tempUnit == 'temp_c' ? 'c' : 'f'}
          </Text>
        </Text>
        <Text style={{ fontSize: 32, }}>{location}</Text>
      </View>
      <View style={styles.hourlyContainer}>
        <Text style={styles.text}>For Hourly</Text>
      </View>
      <View style={styles.dailyContainer}>
        <Text style={styles.text}>For Daily</Text>
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
    fontSize: 64,
  },
  text: {
    color: '#fff',
  }
});
