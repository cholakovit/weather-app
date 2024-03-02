// Styled Elements
import {
  MaterialUISwitch,
  WeatherFormControlLabel,
  WeatherAppBar,
  HeaderContainer,
  MetricUISwitch
} from './index.style';

import { useMetricSystem } from '../../helper/hooks';

const Header = () => {
  const { metricSystem, toggleMetricSystem, colorMode } = useMetricSystem();

  return (
    <WeatherAppBar>
      <HeaderContainer>
        <WeatherFormControlLabel
          label=""
          onClick={colorMode.toggleColorMode}
          control={<MaterialUISwitch defaultChecked />}
          data-testid="button"
        />

        <WeatherFormControlLabel
          label=""
          onClick={toggleMetricSystem}
          control={<MetricUISwitch checked={metricSystem === 'C'} />}
          data-testid="button"
        />
      </HeaderContainer>
    </WeatherAppBar>
  );
};

export default Header;