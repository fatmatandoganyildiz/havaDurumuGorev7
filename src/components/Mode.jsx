import { IoCloseSharp } from "react-icons/io5";
import { useCountryContext } from "../context/CountryData";
import { MdOutlineDarkMode } from "react-icons/md";

const Mode = () => {
  const { handleModeToggle, toggleDarkMode } = useCountryContext();

  return (
    <div>
      <div className="fixed right-0 top-0 z-20 flex h-full w-1/3 flex-col justify-between bg-white dark:bg-slate-800 bg-opacity-90 p-4">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <h1 className="mb-4 font-bold">Modu degistir!</h1>
            <button onClick={handleModeToggle}>
              <IoCloseSharp />
            </button>
          </div>
          <div className="flex mt-28  justify-center">
            <button
              onClick={toggleDarkMode}
              className="absolute w-16 h-16 bg-white rounded-full text-white dark:text-black font-semibold"
            >
              <MdOutlineDarkMode />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mode;
