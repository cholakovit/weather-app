// MUI Elements
import { ButtonHolder, FormHolder, TextFieldHolder } from './index.style'
import SearchIcon from '@mui/icons-material/Search';

// Components
import { WeatherForecast } from '../WeatherForecast';

// Hooks
import { useSearchCity } from '@/helper/hooks';

// Constants
import { SEARCH } from '@/helper/constants';

export const SearhWeatherCity = () => {

  // Searching for a city's coordinates, updating localStorage, and React Query's cache with the fetched coordinates.
  const { inputRef, handleSearch } = useSearchCity();

  return (
    <div>
      <FormHolder>
        <TextFieldHolder
          inputRef={inputRef}
          id="filled-textarea"
          label="Enter City"
          placeholder=""
          multiline
          variant="filled"
        />
        <ButtonHolder variant="contained" endIcon={<SearchIcon />} onClick={handleSearch}>
          {SEARCH}
        </ButtonHolder>
      </FormHolder>
      <WeatherForecast />
    </div>
  )
}
