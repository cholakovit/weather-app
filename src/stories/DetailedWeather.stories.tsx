// src/stories/DetailedWeather.stories.tsx
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { DetailedWeather } from '../components/DetailedWeather';
import { ThemeProvider } from '@mui/material/styles';
import { useWeatherTheme } from '../helper/weatherTheme'; // Adjust the import path as needed

// Mocks and Providers
const queryClient = new QueryClient();

export default {
  title: 'Components/DetailedWeather',
  component: DetailedWeather,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider theme={useWeatherTheme('light')}>
            <Story />
          </ThemeProvider>
        </BrowserRouter>
      </QueryClientProvider>
    ),
  ],
} as ComponentMeta<typeof DetailedWeather>;

const Template: ComponentStory<typeof DetailedWeather> = (args: any) => <DetailedWeather {...args} />;

export const Default = Template.bind({});
// Provide any necessary props or mock data here
Default.args = {};
