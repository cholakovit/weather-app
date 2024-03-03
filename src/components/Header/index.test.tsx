import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './'; // Adjust the import path accordingly
import * as hooks from '../../helper/hooks'; // Adjust the import path accordingly
import { UseMetricSystemReturn } from '../../types';

// Mocking the useMetricSystem hook
jest.mock('../../helper/hooks', () => ({
  useMetricSystem: jest.fn(),
}));

const mockedUseMetricSystem = hooks.useMetricSystem as jest.Mock<UseMetricSystemReturn>;

describe('Header Component', () => {
  beforeEach(() => {
    mockedUseMetricSystem.mockImplementation(() => ({
      metricSystem: 'C',
      toggleMetricSystem: jest.fn(),
      colorMode: { toggleColorMode: jest.fn() },
    }));
  });

  it('renders both switches', () => {
    render(<Header />);

    const materialUiSwitch = screen.getByTestId('material-ui-switch');
    const metricUiSwitch = screen.getByTestId('metric-ui-switch');

    expect(materialUiSwitch).toBeInTheDocument();
    expect(metricUiSwitch).toBeInTheDocument();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});