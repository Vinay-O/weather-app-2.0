import "./App.css";
import TopButton from "./components/TopButton";
import Input from "./components/Input";
import Time from "./components/Time";
import TempAndDetails from "./components/TempAndDetails";
import getFormattedWeather from "./Services/Api";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [query, setQuery] = useState({ q: "Bengaluru" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetChWeather = async () => {
      await getFormattedWeather({ ...query, units }).then((data) => {
        setWeather(data);
        console.log(data);
      });
    };
    fetChWeather();
  }, [query, units]);

  const background = () => {
    if (!weather) return "from-[#25cab7] to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-[#25cab7] to-blue-900";

    return "from-yellow-400 to-orange-900";
  };

  return (
    <div
      className={`mx-auto max-w-screen-md mt-4 py-5 px-28 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${background()}`}
    >
      <TopButton setQuery={setQuery} />
      <Input setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
        <div>
          <Time weather={weather} />
          <TempAndDetails weather={weather} />
        </div>
      )}
    </div>
  );
}

export default App;
