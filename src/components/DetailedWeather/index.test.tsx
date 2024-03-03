// DetailedWeather.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { DetailedWeather } from '.'; // Adjust the import path as needed
import * as hooks from '../../helper/hooks'; // Adjust the import path as needed

// Mock the entire module that exports useDetailedWeather
jest.mock('../../helper/hooks', () => ({
  useDetailedWeather: jest.fn(),
  // Mock other hooks or exports from this module as needed
}));

// TypeScript: Cast the mock to the correct type for better autocompletion
const mockUseDetailedWeather = hooks.useDetailedWeather as jest.Mock;

describe('DetailedWeather Component', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('displays loading state correctly', () => {
    // Set up the mock return value for this test case
    mockUseDetailedWeather.mockReturnValue({
      hourlyData: undefined,
      isLoading: true,
      error: null,
      metricSystem: 'C',
    });

    render(
      <BrowserRouter>
        <DetailedWeather />
      </BrowserRouter>
    );

    // Check for loading state
    const loadingElement = screen.getByText(/Detailed Weather for/i);
    expect(loadingElement).toBeInTheDocument();
  });

  // You can add more tests here to cover other states like error, displaying data, etc.
});
