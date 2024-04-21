import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useCountryContext } from "../context/CountryData";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [cities, setCities] = useState([]);

  const { handleSidebarClose, fetchWeatherData, setSelectedCity } =
    useCountryContext();

  useEffect(() => {
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
    fetchData();
  }, []);

  useEffect(() => {
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
    if (selectedCountry !== "") {
      fetchCities();
    }
  }, [selectedCountry, countries]);

  return (
    <div className="fixed right-0 top-0 z-20 flex h-full w-1/3 flex-col justify-between bg-white bg-opacity-90 p-4">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <h1 className="mb-4 font-bold">Sehir Ekle</h1>
          <button onClick={handleSidebarClose}>
            <IoCloseSharp />
          </button>
        </div>
        <div>
          <h1 className="mb-2 font-semibold ">Ulke</h1>
          <select
            className="w-full border-none"
            id="country"
            name="country"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="">Seçiniz</option>
            {countries.map((country, index) => (
              <option key={index} value={country.country}>
                {country.country}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h1 className="mb-2 mt-6 font-semibold">Sehir</h1>
          <select
            className="w-full border-none"
            id="cities"
            name="cities"
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex	items-end justify-between rounded-lg font-semibold">
        <button  onClick={handleSidebarClose} className="rounded-lg bg-red-500 px-3 py-2 hover:bg-red-700 hover:text-white">
          Cancel
        </button>
        <Link
          to="/currentWeather"
          onClick={fetchWeatherData}
          className="rounded-lg bg-blue-500 px-3 py-2 hover:bg-blue-700 hover:text-white"
        >
          Save
        </Link>
      </div>
    </div>
  );
};
export default Sidebar;
