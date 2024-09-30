import { API_KEY } from '@env';
import React from 'react';

const baseURL = "http://api.weatherapi.com/v1";

export async function fetchCurrentTemp(location: string = 'Itahari', tempUnit: string = 'temp_c', setCurrentTemp: React.Dispatch<React.SetStateAction<number | undefined>>) {
  try {
    const response = await fetch(`${baseURL}/current.json?key=${API_KEY}&q=${location}`);
    if (!response.ok) {
      throw new Error("Error occured during fetching data");
    }

    const data = await response.json();

    setCurrentTemp(data.current[tempUnit]);

  } catch (error) {
    console.error(error);
  }
}

export async function fetchAutoCom(searchQuery: string, setSuggestion: React.Dispatch<React.SetStateAction<{ id: string, name: string, country: string }[]>>) {
  if (searchQuery.length > 1) {
    try {
      const response = await fetch(`${baseURL}/search.json?key=${API_KEY}&q=${searchQuery}`);
      if (!response.ok) {
        throw new Error("Error occured during fetching location");
      }


      const data = await response.json();



      setSuggestion(data);
    } catch (error) {
      console.error(error);
    }
  } else {
    setSuggestion([]);
  }
}

export async function testQuery() {
  try {
    const response = await fetch(`${baseURL}/search.json?key=${API_KEY}&q=Ita`);
    if (!response.ok) {
      throw new Error("Error occured during fetching location");
    }
    const data = await response.json();
     console.log(data);
  } catch (error) {
    console.error(error);
  }
}