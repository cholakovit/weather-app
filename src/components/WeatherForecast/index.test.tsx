import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { WeatherForecast } from './index';
import * as hooks from '../../helper/hooks';

// Explicitly declare the jest mocks with the correct types
jest.mock('../../helper/hooks', () => ({
  useGeolocation: jest.fn(),
  useWeatherForecast: jest.fn(),
}));

describe('WeatherForecast Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('displays forecast data correctly', () => {
    // Type assertion to inform TypeScript these are jest mocks
    const mockUseGeolocation = hooks.useGeolocation as jest.Mock;
    const mockUseWeatherForecast = hooks.useWeatherForecast as jest.Mock;

    // Mock the return value for useGeolocation
    mockUseGeolocation.mockReturnValue({
      location: { lat: 42.136097, lon: 24.742168 },
      error: null,
    });

    // Mock the return value for useWeatherForecast
    mockUseWeatherForecast.mockReturnValue({
      forecast: {
        city: { name: 'Test City' },
        list: [
          {
            dt_txt: "2023-04-01 12:00:00",
            main: { temp: 20 },
            weather: [{ main: "Clear", description: "clear sky" }],
          },
          // Add more mock forecast data as needed
        ],
      },
      isLoading: false,
      error: null,
    });

    render(
      <Router>
        <WeatherForecast />
      </Router>
    );

    // Assertions
    expect(screen.getByText(/5 Day Weather Forecast in Test City/i)).toBeInTheDocument();
    expect(screen.getByText(/Temperature: 20°C/i)).toBeInTheDocument();
    // Add more assertions as needed
  });

  // Add more tests (loading, error states, etc.) as needed
});








// import React from 'react';
// import { render, screen, waitFor } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
// import { WeatherForecast } from './index';
// import * as hooks from '../../helper/hooks';

// // Mock the custom hooks
// jest.mock('../../helper/hooks', () => ({
//   useGeolocation: jest.fn(),
//   useWeatherForecast: jest.fn(),
// }));

// describe('WeatherForecast Component', () => {
//   beforeEach(() => {
//     // Reset mocks before each test
//     jest.clearAllMocks();
//   });
  
//   it('displays loading state correctly', async () => {
//     hooks.useGeolocation.mockReturnValue({
//       location: { lat: 42.136097, lon: 24.742168 },
//       error: null,
//     });

//     hooks.useWeatherForecast.mockReturnValue({ forecast: null, isLoading: true, error: null });

//     render(
//       <BrowserRouter>
//         <WeatherForecast />
//       </BrowserRouter>
//     );

//     expect(screen.getByText(/loading forecast.../i)).toBeInTheDocument();
//   });

//   it('handles geolocation error correctly', () => {
//     hooks.useGeolocation.mockReturnValue({ location: { lat: null, lon: null }, error: 'Geolocation Error' });
//     hooks.useWeatherForecast.mockReturnValue({ forecast: null, isLoading: false, error: null });

//     render(
//       <BrowserRouter>
//         <WeatherForecast />
//       </BrowserRouter>
//     );

//     expect(screen.getByText(/geolocation error:/i)).toBeInTheDocument();
//   });

//   it('handles forecast error correctly', () => {
//     hooks.useGeolocation.mockReturnValue({ location: { lat: 42.136097, lon: 24.742168 }, error: null });
//     hooks.useWeatherForecast.mockReturnValue({ forecast: null, isLoading: false, error: 'Forecast Error' });

//     render(
//       <BrowserRouter>
//         <WeatherForecast />
//       </BrowserRouter>
//     );

//     expect(screen.getByText(/error:/i)).toBeInTheDocument();
//   });

//   it('displays forecast data correctly', () => {
//     hooks.useGeolocation.mockReturnValue({ location: { lat: 42.136097, lon: 24.742168 }, error: null });
//     hooks.useWeatherForecast.mockReturnValue({
//       forecast: {
//         city: { name: 'Test City' },
//         list: [
//           { dt_txt: '2020-04-01 12:00:00', main: { temp: 20 }, weather: [{ main: 'Clear', description: 'clear sky' }] },
//           // Add more forecast entries as needed
//         ],
//       },
//       isLoading: false,
//       error: null,
//     });

//     render(
//       <BrowserRouter>
//         <WeatherForecast />
//       </BrowserRouter>
//     );

//     expect(screen.getByText(/5 day weather forecast in test city/i)).toBeInTheDocument();
//     expect(screen.getByText(/temperature:/i)).toBeInTheDocument();
//     expect(screen.getByText(/condition:/i)).toBeInTheDocument();
//   });
// });
