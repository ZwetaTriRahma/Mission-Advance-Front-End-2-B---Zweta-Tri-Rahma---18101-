import { useState } from "react";
import { FaPlay, FaCheck, FaChevronDown, FaStar } from "react-icons/fa";

const MovieCard = ({
  image,
  title,
  rating,
  duration = "16 Episode",
  genres = ["Drama", "Komedi", "Romantis"],
  ageRating = "13+",
  isPortrait = false,
  children,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative w-full cursor-pointer transition-all duration-600 ${isHovered ? "z-50" : "z-0"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tampilan normal */}
      <div className={`relative w-full h-full rounded-lg overflow-hidden transition-all duration-300 ${isHovered ? "invisible" : "visible"}`}>
        <img src={image} alt={title} className="w-full h-full object-cover" />
        {children}

        {!isPortrait && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 text-white font-medium flex flex-row justify-between w-full">
              <span className="font-medium text-sm lg:text-[18px] line-clamp-1">{title}</span>
              <div className="flex flex-row items-center text-sm lg:text-[18px] mt-1 gap-1">
                <FaStar className="text-yellow-500" />
                <span className="text-[14px]">{rating}</span>
              </div>
            </div>
          </>
        )}

        {isPortrait && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-2 text-white w-full">
              <span className="font-medium text-[10px] lg:text-sm line-clamp-1 block">{title}</span>
              <span className="text-[8px] lg:text-xs text-gray-300">{rating}</span>
            </div>
          </>
        )}
      </div>

      {/* Tampilan saat hover */}
      {isHovered && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#181A1C] rounded-lg shadow-2xl transition-all duration-500 transform scale-85 origin-center w-[240px] lg:w-[480px] z-[9999]">
          <div className="relative w-full h-[157px] lg:h-[270px] overflow-hidden rounded-t-lg">
            <img src={image} alt={title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#181A1C] via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 z-10">
              <h3 className="text-white font-bold text-lg drop-shadow-md">{title}</h3>
            </div>
          </div>
          <div className="p-4 bg-[#181A1C] rounded-b-lg flex flex-col gap-3 shadow-lg">
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row gap-2">
                <button className="lg:w-16 lg:h-16 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200">
                  <FaPlay className="ml-1 text-xs size-4 lg:size-6" />
                </button>
                <button className="lg:w-16 lg:h-16 w-8 h-8 border-2 border-gray-400 text-white rounded-full flex items-center justify-center hover:border-white">
                  <FaCheck className="text-xs size-4 lg:size-6" />
                </button>
              </div>
              <button className="lg:w-16 lg:h-16 w-8 h-8 border-2 border-gray-400 text-white rounded-full flex items-center justify-center hover:border-white">
                <FaChevronDown className="text-xs size-4 lg:size-2" />
              </button>
            </div>
            <div className="flex flex-row items-center gap-2 text-white text-[14px] lg:text-[18px] font-semibold">
              <span className="bg-[#2F3334] rounded-full px-2 py-0.5 text-gray-400">{ageRating}</span>
              <span>{duration}</span>
            </div>
            <div className="text-gray-400 line-clamp-1 w-full text-[10px] lg:text-[14px]">
              {genres.join(" • ")}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;