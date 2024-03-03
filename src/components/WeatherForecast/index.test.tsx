// Import necessary utilities from testing library
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { WeatherForecast } from '.'; // Adjust the import path as necessary
  
// Mock the useWeatherForecast hook
jest.mock("../../helper/hooks", () => ({
  useWeatherForecast: () => ({
    forecast: { city: { name: 'Sample City' }, list: [] },
    isLoading: false,
    error: null,
    metricSystem: 'C',
  })
}));

describe('WeatherForecast component', () => {
  it('checks if "5 Day Weather Forecast in" text exists', () => {
    // Render the WeatherForecast component
    render(<WeatherForecast />);

    // Assert that the expected text is in the document
    expect(screen.getByText(/5 Day Weather Forecast in/i)).toBeInTheDocument();
  });
});

