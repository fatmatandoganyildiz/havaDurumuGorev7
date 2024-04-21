import { useState } from "react";
import { useCountryContext } from "../context/CountryData";
import { BsThreeDots } from "react-icons/bs";
import Image from "../assets/tom-barrett-hgGplX3PFBg-unsplash.jpg";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Remove from "../components/Remove";

const CurrentWeather = () => {
  const {
    selectedCurrent,
    handleSidebar,
    sidebarToggle,
    darkMode,
    removeBar,
    handleRemove,
  } = useCountryContext();
  const [openMenuIndex, setOpenMenuIndex] = useState(null);

  // useEffect(() => {
  //   handleIcon;
  // }, [openMenuIndex]);

  const handleIcon = (index) => {
    if (openMenuIndex === index) {
      setOpenMenuIndex(null);
    } else {
      setOpenMenuIndex(index);
    }
  };

  return (
    <>
      <div className={`${darkMode && "dark"}`}>
        <div className="relative flex h-80 w-full flex-col text-white">
          <div className="absolute left-0 top-10 z-10 flex h-full w-full flex-col items-center justify-center">
            <h1 className="text-4xl font-bold ">
              Şehir seçerek hava durumunu öğrenebilirsiniz.
            </h1>
            <h3 className="text-2xl font-bold">
              Şehirini seç ve hava durumunu öğren.
            </h3>
            <Link
              onClick={handleSidebar}
              className="mt-4 rounded-md bg-gray-200 px-3 py-2 font-semibold hover:bg-gray-300 text-black"
            >
              + Şehir Ekle
            </Link>
          </div>
          <img
            className="absolute left-0 top-0 h-full w-full object-cover"
            src={Image}
            alt="weather"
          />
        </div>

        <div className="flex flex-col flex-wrap justify-center ">
          <div className="w-full flex flex-row flex-wrap justify-center">
            {selectedCurrent?.map((city, index) => (
              <div
                key={index}
                className="relative left-0 top-0 mx-24 my-16 flex h-60 w-72 flex-col items-center justify-center rounded-md"
              >
                <div className="z-10 text-center text-white">
                  <h3 className="text-xl font-bold">
                    {city?.currentWeatherData && city?.currentWeatherData.name}
                  </h3>
                  <h6 className=" mb-2">
                    {city.currentWeatherData &&
                      city.currentWeatherData.main?.temp}{" "}
                    C
                  </h6>
                </div>
                <img
                  className="absolute h-60 w-72 rounded-md"
                  src={Image}
                  alt="forecast-pic"
                />
                <div className="absolute right-0 top-0 m-2">
                  <div className="relative">
                    <BsThreeDots
                      size={24}
                      color="white"
                      onClick={() => handleIcon(index)}
                    />
                    {openMenuIndex === index && (
                      <div className="absolute right-0 top-8 z-10 rounded-md bg-white p-2">
                        <div className="flex items-center">
                          <Link
                            to={`/currentWeather/${city?.currentWeatherData?.id}`}
                            className="ml-2 cursor-pointer rounded-md px-2 py-1 hover:bg-gray-200"
                          >
                            View Weather
                          </Link>
                        </div>
                        <div className="flex items-center">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleRemove();
                            }}
                            className="ml-2 cursor-pointer rounded-md px-2 py-1 hover:bg-gray-200"
                          >
                            Delete
                          </button>
                          {removeBar && (
                            <Remove cityID={city.currentWeatherData.id} />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-row justify-between rounded-lg bg-white p-4 opacity-55">
                  <div className="mr-1 flex flex-col items-center">
                    <p className="text-sm">Current Temp</p>
                    <p className="text-lg font-bold ">
                      {city.currentWeatherData &&
                        city.currentWeatherData.main?.temp}
                      °C
                    </p>
                  </div>
                  <div className="mr-1 flex flex-col items-center">
                    <p className="text-sm">Feels Like</p>
                    <p className="text-lg font-bold ">
                      {city.currentWeatherData &&
                        city.currentWeatherData.main?.feels_like}
                      °C
                    </p>
                  </div>
                  <div className="mr-1 flex flex-col items-center">
                    <p className="text-sm">Humidity</p>
                    <p className="text-lg font-bold ">
                      {city.currentWeatherData &&
                        city.currentWeatherData.main?.humidity}
                      %
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {sidebarToggle && <Sidebar />}
      </div>
    </>
  );
};

export default CurrentWeather;
