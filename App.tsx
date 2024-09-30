import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SetStateAction, useEffect, useState } from 'react';
import { fetchCurrentTemp, fetchAutoCom, testQuery } from './constant';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const temp = 25;

export default function App() {

  const [tempUnit, setTempUnit] = useState<string>('temp_c');
  const [currentTemp, setCurrentTemp] = useState<number | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [suggestion, setSuggestion] = useState<{ id: string, name: string, country: string }[]>([]);
  const [location, setLocation] = useState<string>('Itahari');

  const handleChange = (text: string) => {
    setSearchQuery(text);
    fetchAutoCom(searchQuery, setSuggestion);
  }

  const changeTemp = (locationName: string) => {
    setLocation(locationName);
    fetchCurrentTemp(location, tempUnit, setCurrentTemp);
  }

  useEffect(() => {
    fetchCurrentTemp(location, tempUnit, setCurrentTemp);
  }, [currentTemp]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.currentContainer}>
        <TextInput
          style={styles.input}
          placeholder='location'
          onChangeText={handleChange}
        />
        <ScrollView contentContainerStyle={styles.suggestions}>
          {suggestion.map((sug) => (
            <Pressable
              key={sug.id}
              onPress={() => {
                changeTemp(sug.name);
              }}>
              <Text style={styles.row} key={sug.id}>{sug.name}, {sug.country}</Text>
            </Pressable>
          ))}
        </ScrollView>
        <Text style={styles.temp}>{currentTemp}°</Text>
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
  input: {
    backgroundColor: '#fff',
    width: '100%',
    textAlign: 'center',

  },
  suggestions: {
    backgroundColor: '#fff',
    borderBottomColor: '#747373',
    borderBottomWidth: 1,
  },
  row: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#747373',
    minWidth: screenWidth * 0.8,
  },
  currentContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  temp: {
    fontSize: 64,
  },
  hourlyContainer: {
    flex: 2,
    // height: screenHeight * 0.4,
    backgroundColor: '#000',
    borderRadius: 20,
  },
  dailyContainer: {
    flex: 2,
    backgroundColor: '#000',
    borderRadius: 20,
  },
  text: {
    color: '#fff',
  }
});
