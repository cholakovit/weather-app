// MUI Elements
import {
  MaterialUISwitch,
  WeatherFormControlLabel,
  WeatherAppBar,
  HeaderContainer,
  MetricUISwitch,
} from "./index.style";

// Hooks
import { useMetricSystem } from "@/helper/hooks";

const Header = () => {

  // Manages the metric system (Celsius or Fahrenheit) for temp display, allowing toggling between them 
  // and synchronizing this preference with  both localStorage and React Query's cache.
  const { metricSystem, toggleMetricSystem, colorMode } = useMetricSystem();

  return (
    <WeatherAppBar>
      <HeaderContainer>
        <WeatherFormControlLabel
          label=""
          onClick={colorMode.toggleColorMode}
          control={<MaterialUISwitch defaultChecked />}
          data-testid="material-ui-switch"
        />

        <WeatherFormControlLabel
          label=""
          onClick={toggleMetricSystem}
          control={<MetricUISwitch checked={metricSystem === "C"} />}
          data-testid="metric-ui-switch"
        />
      </HeaderContainer>
    </WeatherAppBar>
  );
};

export default Header;
