import React from "react";
import {
  WiThermometer,
  WiWindy,
  WiRaindrop,
  WiSunrise,
  WiSunset,
  WiDirectionUp,
  WiDirectionDown,
} from "react-icons/wi";
import { formatLocalTime, iconURL } from "../Services/Api";

function TempAndDetails({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
    timezone,
  },
}) {
  return (
    <div>
      <div className="flex items-center justify-center py-6 text-3xl text-cyan-200">
        <p>{details}</p>
      </div>
      <div className="flex flex-row items-center justify-between text-white py-5">
        <img src={iconURL(icon)} alt="" className="w-32" />
        <p className="text-8xl">{`${temp.toFixed()}°`}</p>
        <div className="flex flex-col space-y-2">
          <div className="flex font-light text-xl items-center justify-center">
            <WiThermometer size={35} className="my-0" />
            Real feel:{" "}
            <span className="font-medium ml-1">{`${feels_like.toFixed()}°`}</span>
          </div>
          <div className="flex font-light text-xl items-center justify-center">
            <WiRaindrop size={35} className="my-0" />
            Humidity: <span className="font-medium ml-1">{`${humidity}%`}</span>
          </div>
          <div className="flex font-light text-xl items-center justify-center">
            <WiWindy size={35} className="my-0" />
            Wind: <span className="font-medium ml-1">{`${speed}km/h`}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center space-x-1 text-white text-m py-5">
        <WiSunrise size={25} />
        <p className="font-light">
          Rise: <span className="font-medium ml-1">{formatLocalTime(sunrise,timezone,"hh:mm a")}</span>
        </p>
        <p className="font-light">|</p>
        <WiSunset size={25} />
        <p className="font-light">
          Set: <span className="font-medium ml-1">{formatLocalTime(sunset,timezone,"hh:mm a")}</span>
        </p>
        <p className="font-light">|</p>
        <WiDirectionUp size={25} />
        <p className="font-light">
          High: <span className="font-medium ml-1">{`${temp_max.toFixed()}°`}</span>
        </p>
        <p className="font-light">|</p>
        <WiDirectionDown size={37.5} />
        <p className="font-light">
          Low: <span className="font-medium ml-1">{`${temp_min.toFixed()}°`}</span>
        </p>
      </div>
    </div>
  );
}

export default TempAndDetails;
