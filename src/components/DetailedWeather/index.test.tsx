import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { DetailedWeather } from './index'; // Adjust the import path as necessary
import * as useDetailedWeatherHook from '../../helper/hooks'; // Adjust the import path as necessary
import * as ReactRouterDom from 'react-router-dom';

// Mock the useParams and useDetailedWeather hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Use actual implementations for non-hook parts
  useParams: jest.fn(), // Mock useParams
}));
  
jest.mock('../../helper/hooks'); // Mock your custom hook

describe('DetailedWeather Component', () => {
  it('displays detailed weather information correctly', () => {
    // Mock return values for hooks
    jest.spyOn(ReactRouterDom, 'useParams').mockReturnValue({ date: '2023-04-01' });
    // jest.spyOn(useDetailedWeatherHook, 'useDetailedWeather').mockReturnValue({
    //   weather: {
    //     dt: 1603965600, // Include the required `dt` property
    //     temp: { day: 20, night: 10 },
    //     feels_like: { day: 18, night: 8 },
    //     humidity: 60,
    //     wind_speed: 5,
    //     weather: [{ main: 'Clear', description: 'clear sky' }],
    //     clouds: 0,
    //     pressure: 1012,
    //     uvi: 5,
    //     sunrise: 1603965600,
    //     sunset: 1604008800,
    //   },
    //   isLoading: false,
    //   error: null,
    // });

    render(
      <BrowserRouter>
        <DetailedWeather />
      </BrowserRouter>
    );

    expect(screen.getByText(/detailed weather for/i)).toBeInTheDocument();
    expect(screen.getByText(/temperature:/i)).toBeInTheDocument();
    expect(screen.getByText(/humidity:/i)).toBeInTheDocument();
    // Add more assertions as needed
  });

  // it('displays error state correctly', () => {
  //   jest.spyOn(ReactRouterDom, 'useParams').mockReturnValue({ date: '2023-04-01' });
  //   jest.spyOn(useDetailedWeatherHook, 'useDetailedWeather').mockReturnValue({
  //     weather: null,
  //     isLoading: false,
  //     error: 'Error fetching weather data',
  //   });

  //   render(
  //     <BrowserRouter>
  //       <DetailedWeather />
  //     </BrowserRouter>
  //   );

  //   expect(screen.getByText(/error:/i)).toBeInTheDocument();
  // });
});
