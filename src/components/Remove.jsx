import { IoCloseSharp } from "react-icons/io5";
import { useCountryContext } from "../context/CountryData";
import { Link } from "react-router-dom";

const Remove = ( {cityID} ) => {
  const { handleDeleteCity, handleRemove } = useCountryContext();

  const handleDeleteClick = () => {
    handleDeleteCity(cityID);
  };

  return (
    <div className="fixed right-0 top-0 z-20 flex h-full w-1/3 flex-col justify-between bg-white dark:bg-slate-700 bg-opacity-90  text-black p-4">
      <div className="flex flex-col relative h-full">
        <div className="flex flex-row justify-between mb-4">
          <h1 className="font-bold">Remove Advancetown City</h1>
          <button onClick={handleRemove}>
            <IoCloseSharp />
          </button>
        </div>
        <div className="flex items-center justify-center flex-grow">
          <h1>
            You have sure you want to remove <strong>Advancetown</strong>?
          </h1>
        </div>
        <div className="flex items-end justify-between rounded-lg font-semibold mt-auto">
          <Link to="/currentWeather">
            <button
              onClick={handleRemove}
              className="rounded-lg bg-red-500 px-3 py-2 hover:bg-red-700 hover:text-white"
            >
              No
            </button>
          </Link>

          <Link to="/currentWeather">
            <button
             onClick={handleDeleteClick}
             className="rounded-lg bg-blue-500 px-3 py-2 hover:bg-blue-700
              hover:text-white"
            >
              Yes
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Remove;
