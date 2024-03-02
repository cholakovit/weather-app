import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import * as hooks from '../../helper/hooks';

// Explicitly declare the jest mocks with the correct types
jest.mock('../../helper/hooks', () => ({
  useGeolocation: jest.fn(),
  useWeatherForecast: jest.fn(),
}));

describe('WeatherForecast Component', () => {

});