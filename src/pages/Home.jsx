import { Link } from "react-router-dom";
import { useState } from "react";
import Image from "../../public/tom-barrett-hgGplX3PFBg-unsplash.jpg";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative flex h-80 w-full flex-col">
      <div className="text-s absolute left-0 top-10 z-10 flex h-full w-full flex-col items-center justify-center">
        <h1 className="text-4xl font-bold  text-white">
          Şehir seçerek hava durumunu öğrenebilirsiniz.
        </h1>
        <h3 className="text-2xl font-bold  text-white">
          Şehirini seç ve hava durumunu öğren.
        </h3>
        <Link
          to="/"
          onClick={toggleSidebar}
          className="mt-4 rounded-md bg-gray-200 px-3 py-2 font-semibold hover:bg-gray-300 text-black"
        >
          + Şehir Ekle
        </Link>
      </div>
      <img
        className="absolute left-0 top-10 h-full w-full object-cover"
        src={Image}
        alt="weather"
      />
      {isSidebarOpen && <Sidebar />}
    </div>
  );
};

export default Home;
