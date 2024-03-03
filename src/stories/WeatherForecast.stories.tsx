import { ComponentStory, Meta } from '@storybook/react';
import { WeatherForecast } from "../components/WeatherForecast/index";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default {
  title: 'Components/WeatherForecast',
  component: WeatherForecast,
  // Add decorators array
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
} as Meta;

const queryClient = new QueryClient();

const Template: ComponentStory<typeof WeatherForecast> = (args: any) => <WeatherForecast {...args} />;

export const Default = Template.bind({});
Default.args = {
  // your args here
};
