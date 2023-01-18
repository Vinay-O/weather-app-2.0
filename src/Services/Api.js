import { DateTime } from "luxon";
const API_KEY = "f381ec0a75285e84ee5b49e4e627ce7d";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeather = (infoType, searchParameter) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParameter, appid: API_KEY });
  return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
};

const getFormattedWeather = async (searchParameter) => {
  const formattedCurrentWeather = await getWeather(
    "weather",
    searchParameter
  ).then(formatCurrentWeather);
  return formattedCurrentWeather;
};

const formatLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy'| Local Time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconURL = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;

export { formatLocalTime, iconURL };
export default getFormattedWeather;
