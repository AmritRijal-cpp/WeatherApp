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

export async function fetchAutoCom(text: string, setSuggestion: React.Dispatch<React.SetStateAction<{ id: string, name: string, country: string }[]>>) {
  console.log(text);
  
  if (text.length > 2) {
    try {
      const response = await fetch(`${baseURL}/search.json?key=${API_KEY}&q=${text}`);
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
  } catch (error) {
    console.error(error);
  }
}