import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCountryContext } from "../context/CountryData";
import Image from "../assets/tom-barrett-hgGplX3PFBg-unsplash.jpg";
import Modal from "../components/Modal";
import Remove from "../components/Remove";

const WEEK_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const WeatherDetail = () => {
  const { id } = useParams();

  const { selectedForecast, handleRemove, removeBar } = useCountryContext();
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  const selectedCityForecast = selectedForecast.find(
    (f) => f?.forecastData?.city?.id
  );

  const forecastList = selectedCityForecast?.forecastData.list;

  const handleOpenModal = (index) => {
    setSelectedDayIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    console.log("Modal is closing...");
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="relative mx-6 flex h-80 w-full flex-col text-white">
        <div className="text-s absolute left-0 top-10 z-10 flex h-full w-full flex-col items-center justify-center">
          <h3 className="text-2xl font-bold">
            Weather for the next <b>7 days</b>
          </h3>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleRemove();
            }}
            className="mt-4 rounded-md bg-gray-200 px-3 py-2 font-semibold hover:bg-gray-300 text-black"
          >
            Remove City
          </button>
          {removeBar && (
            <Remove cityID={selectedCityForecast?.forecastData?.city?.id} />
          )}
        </div>
        <img
          className="absolute left-0 top-10 h-full w-full object-cover"
          src={Image}
          alt="weather"
        />
      </div>

      <div className="flex justify-center">
        {forecastList?.slice(0, 1).map((item, idx) => (
          <div
            key={idx}
            className="relative left-0 top-0 mx-20 my-12 flex h-60 w-72 flex-col items-center justify-center rounded-md"
          >
            <div className="z-10 text-center text-white">
              <label className="day z-10 mb-1 block text-center text-lg font-semibold">
                {forecastDays[idx]}
              </label>
              <h3 className="text-xl font-bold">{item.name}</h3>
              <label className="description mb-1 block text-center text-white">
                {item.weather[0].description}
              </label>
              <h6 className=" mb-2">{item.main?.temp} °C</h6>
            </div>
            <img
              className="absolute h-60 w-72 rounded-md"
              src={Image}
              alt="forecast-pic"
            />

            <div className="flex flex-row justify-between rounded-lg bg-white p-4 opacity-55">
              <div className="mr-1 flex flex-col items-center">
                <p className="text-sm">Current Temp</p>
                <p className="text-lg font-bold ">{item.main?.temp}°C</p>
              </div>
              <div className="mr-1 flex flex-col items-center">
                <p className="text-sm">Feels Like</p>
                <p className="text-lg font-bold ">
                  {item.main.feels_like}
                  °C
                </p>
              </div>
              <div className="mr-1 flex flex-col items-center">
                <p className="text-sm">Humidity</p>
                <p className="text-lg font-bold ">{item.main.humidity}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h1 className="flex justify-center">
        <strong>Note:</strong> for further details of a specific day, click on
        the card
      </h1>

      <div className="flex flex-auto mt-6 justify-evenly">
        {forecastList?.slice(1, 7).map((item, idx) => (
          <div
            key={idx}
            className="mt-2 p-1 cursor-pointer"
            onClick={() => handleOpenModal(idx)}
          >
            <div className="forecast-card relative mb-8 rounded-lg hover:cursor-pointer bg-stone-200 hover:bg-stone-300 p-2 shadow-md">
              <label className="day z-10 mb-1 block text-center text-lg font-semibold">
                {forecastDays[idx + 1]}
              </label>
              <label className="description mb-1 block text-center text-black">
                {item.weather[0].description}
              </label>
              <div className="mt-1 text-center">
                <label className="temperature text-xs font-semibold">
                  {Math.round(item.main.temp_min)}°C /{" "}
                  {Math.round(item.main.temp_max)}°C
                </label>
              </div>
              <div className="mt-1 grid grid-cols-2 gap-1">
                <div className="text-xs text-gray-600">
                  <label className="font-semibold">Humidity:</label>
                  <label>{item.main.humidity}%</label>
                </div>
                <div className="text-xs text-gray-600">
                  <label className="font-semibold">Feels Like:</label>
                  <label>{item.main.feels_like} m</label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} handleCloseModal={handleCloseModal}>
          {selectedDayIndex !== null && (
            <div className="mt-3">
              <h2 className="flex justify-center font-semibold mb-2">
                Weather info from{" "}
                {forecastList[selectedDayIndex].dt_txt.split(" ")[0]}
              </h2>
              <div className="flex flex-row items-center gap-3">
                <div className="forecast-card relative mb-8 rounded-lg hover:cursor-pointer bg-stone-200 hover:bg-stone-300 p-2 shadow-md">
                  <label className="description mb-1 block text-center text-black">
                    {forecastList[selectedDayIndex].weather[0].description}
                  </label>
                  <div className="mt-1 text-center">
                    <label className="temperature text-xs font-semibold">
                      {Math.round(forecastList[selectedDayIndex].main.temp_min)}
                      °C /{" "}
                      {Math.round(forecastList[selectedDayIndex].main.temp_max)}
                      °C
                    </label>
                  </div>
                  <div className="mt-1 grid grid-cols-2 gap-1">
                    <div className="text-xs text-gray-600">
                      <label className="font-semibold">Humidity:</label>
                      <label>
                        {forecastList[selectedDayIndex].main.humidity}%
                      </label>
                    </div>
                    <div className="text-xs text-gray-600">
                      <label className="font-semibold">Feels Like:</label>
                      <label>
                        {forecastList[selectedDayIndex].main.feels_like} m
                      </label>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols gap-4">
                  <div className="text-xs text-gray-600">
                    <p className="font-semibold">Clouds</p>
                    <p>
                      Percentage: {forecastList[selectedDayIndex].clouds.all} %
                    </p>
                  </div>
                  <div className="text-xs text-gray-600">
                    <p className="font-semibold">Rain</p>
                    <p>
                      Percentage:{" "}
                      {forecastList[selectedDayIndex].rain
                        ? `${forecastList[selectedDayIndex].rain["1h"]} mm`
                        : "0 mm"}
                    </p>
                  </div>
                  <div className="text-xs text-gray-600">
                    <p className="font-semibold">Wind</p>
                    <p>
                      Velocity: {forecastList[selectedDayIndex].wind.speed} km/h
                    </p>
                    <p>Direction: {forecastList[selectedDayIndex].wind.deg}°</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal>
      )}
    </>
  );
};

export default WeatherDetail;
