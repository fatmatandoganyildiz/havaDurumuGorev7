import { useEffect } from "react";
import { createContext, useContext } from "react";
import { useState } from "react";

const CountryContext = createContext();

export function CountryContextProvider({ children }) {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCurrent, setSelectedCurrent] = useState([]);
  const [selectedForecast, setSelectedForecast] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [removeBar, setRemoveBar] = useState(false);
  const [toggleOpen, setToggleOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  //Ulkeleri getirecek olan fonksiyon
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries"
      );
      const data = await response.json();
      if (data && data.data && data.data.length > 0) {
        setCountries(data.data);
      } else {
        console.error("Invalid data structure for countries");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCities();
  }, [selectedCountry]);

  //sehirleri getirecek olan fonksiyon
  const fetchCities = async () => {
    try {
      const selectedCountryData = countries.find(
        (country) => country.country === selectedCountry
      );
      if (selectedCountryData) {
        setCities(selectedCountryData.cities);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  // sidebari acma fonk
  const handleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };

  // carpiya basinca kapatcak olan fonk
  const handleSidebarClose = () => {
    setSidebarToggle(false);
  };

  //removeside i acacak olan fonk
  const handleRemove = () => {
    setRemoveBar(!removeBar);
  };

  //Weatherlari getirecek olan fonksiyon
  const fetchWeatherData = async () => {
    try {
      const currentWeatherFetch = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&units=metric&APPID=2c006b98e2ee5b157418ce7c4325967d`
      );
      const forecastFetch = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&units=metric&APPID=2c006b98e2ee5b157418ce7c4325967d`
      );

      const [currentWeatherResponse, forecastResponse] = await Promise.all([
        currentWeatherFetch,
        forecastFetch,
      ]);

      const currentWeatherData = await currentWeatherResponse.json();
      const forecastData = await forecastResponse.json();

      setSelectedCurrent((prev) => [...prev, { currentWeatherData }]);
      {
        console.log(selectedCurrent);
      }
      setSelectedForecast((prev) => [...prev, { forecastData }]);

      handleSidebarClose();
    } catch (error) {
      console.log(error);
    }
  };

  //mode componenti toggle i
  const handleModeToggle = () => {
    setToggleOpen(!toggleOpen);
    console.log(toggleOpen)
  };

  //cityi silecek olan fonk
  const handleDeleteCity = (id) => {
    handleRemove();
    console.log(id);
    setSelectedCurrent((prevCities) =>
      prevCities.filter((city) => city?.currentWeatherData?.id !== id)
    );
    setSelectedForecast((prevForecast) =>
      prevForecast.filter((forecast) => forecast?.forecastData?.city?.id !== id)
    );
    window.alert("Secili sehir silindi!");
  };
 
  //dark mode toogle
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    console.log(darkMode)
  }
  
  return (
    <CountryContext.Provider
      value={{
        selectedCurrent,
        selectedForecast,
        sidebarToggle,
        cities,
        countries,
        removeBar,
        toggleOpen,
        darkMode,
        toggleDarkMode,
        setToggleOpen,
        setCities,
        setSelectedCity,
        fetchData,
        fetchCities,
        setSelectedCountry,
        fetchWeatherData,
        handleSidebarClose,
        handleSidebar,
        setSidebarToggle,
        setCountries,
        handleRemove,
        handleModeToggle,
        handleDeleteCity,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
}

export const useCountryContext = () => useContext(CountryContext);
