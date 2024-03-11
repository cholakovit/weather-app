import { ButtonHolder, FormHolder, TextFieldHolder } from './index.style'
import SearchIcon from '@mui/icons-material/Search';
import { useHandleSearchCityForm } from '@/helper/hooks';
import { WeatherForecast } from '../WeatherForecast';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { fetchCoordinatesForCity } from '@/helper/fn';
import { GEOLOCATION, WEATHER_FORCAST } from '@/constants/common';
import { LocationState } from '@/types';

export const SearhWeatherCity = () => {
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [cachedLocation, setCachedLocation] = useState<any>()

  const handleSearch = async () => {
    const cityName = inputRef.current?.value;
    if (cityName) {
      try {
        const fetchedCoordinates = await fetchCoordinatesForCity(cityName);
        if (fetchedCoordinates) {
          // Using React Query's queryClient to set global state
          queryClient.setQueryData<LocationState>([GEOLOCATION], { lat: fetchedCoordinates?.lat, lon: fetchedCoordinates?.lon });
          console.log('Fetched coordinates:', fetchedCoordinates);

          setCachedLocation(queryClient.getQueryData<any>([GEOLOCATION]))
          console.log('Fetched coordinates2:', cachedLocation);
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    }
  };

  return (
    <div>
      <FormHolder>
        <TextFieldHolder
          inputRef={inputRef}
          id="filled-textarea"
          label="Enter City"
          placeholder=""
          multiline
          variant="filled"
        />
        <ButtonHolder variant="contained" endIcon={<SearchIcon />} onClick={handleSearch}>
          Search
        </ButtonHolder>
      </FormHolder>
      <WeatherForecast />
    </div>
  )
}
