// Styled Elements
import {
  MaterialUISwitch,
  WeatherFormControlLabel,
  WeatherAppBar,
  HeaderContainer
} from './index.style';

// Hooks
import React, { useContext } from 'react';

// Context for the Theme
import { ColorModeContext } from '../../helper/Context';
import { colorModeProps } from '../../types';


const Header = () => {
  const colorMode: colorModeProps = useContext(ColorModeContext) || {};

  return (
    <WeatherAppBar>
      <HeaderContainer>
        <WeatherFormControlLabel
          label=""
          onClick={colorMode.toggleColorMode}
          control={<MaterialUISwitch defaultChecked />}
          data-testid="button"
        />
      </HeaderContainer>
    </WeatherAppBar>
  );
};

export default Header;