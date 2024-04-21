import { HiMiniQueueList } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useCountryContext } from "../context/CountryData";
import Mode from "./Mode";

const Header = () => {
  const { handleModeToggle, toggleOpen } = useCountryContext();
  return (
    <>
      <div className="dark">
        <div className="relative flex w-full flex-col">
          <div className="flex h-10 w-full flex-row items-center justify-between bg-gray-200 dark:bg-slate-800 dark:text-white">
            <Link to="/" className="font-semibold px-5 dark:text-white">
              Hava Durumu Sorgulama
            </Link>
            <div className="pr-5 dark:text-white">
              <button onClick={handleModeToggle}>
                <HiMiniQueueList />
              </button>
            </div>
          </div>
        </div>
        {toggleOpen && <Mode />}{" "}
      </div>
    </>
  );
};

export default Header;
