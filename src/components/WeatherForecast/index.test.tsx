import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { WeatherForecast } from '.'; // Adjust the import path as necessary

// Mock the useWeatherForecast and usePrefetchWeatherData hooks
jest.mock("../../helper/hooks", () => ({
  useWeatherForecast: () => ({
    forecast: { city: { name: 'Plovdiv' }, list: [] },
    isLoading: false,
    error: null,
    metricSystem: 'C',
  }),
  usePrefetchWeatherData: jest.fn() // Add this line to mock usePrefetchWeatherData
}));

describe('WeatherForecast component', () => {
  it('checks if "5 Day Weather Forecast in" text exists', () => {
    // Render the WeatherForecast component
    render(<WeatherForecast />);

    // Assert that the expected text is in the document
    expect(screen.getByText(/5 Day Weather Forecast in/i)).toBeInTheDocument();
  });
});

