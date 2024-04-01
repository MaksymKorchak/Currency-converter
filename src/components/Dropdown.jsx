/* eslint-disable react/prop-types */
import {HiOutlineStar, HiStar} from "react-icons/hi2";

export const CurrencyDropdown = ({
  currencies,
  currency,
  setCurrency,
  favorites,
  handleFavorite,
  title = "",
}) => {
  const isFavorite = (curr) => favorites.includes(curr);

  return (
    <div>

      <label htmlFor={title} className="block text-sm font-medium text-gray-700">
        {title}
      </label>

      <div className="mt-1 relative">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
        {/* Favorites */}
          {favorites?.map((currency) => {
            return (
              <option className="bg-gray-200" value={currency} key={currency}>
                {currency}
              </option>
            );
          })}
        {/* Favorites */}

          <hr/>

        {/* All Currencies */}
          {currencies?.filter((curr) => !favorites.includes(curr))
          .map((currency) => {
              return (
                <option value={currency} key={currency}>
                  {currency}
                </option>
              );
            })}
        {/* All Currencies */}
        </select>

        <button onClick={() => handleFavorite(currency)} className="absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5">
            {isFavorite(currency) 
                ? <HiStar className="text-yellow-500 w-5 h-5"/> 
                : <HiOutlineStar className="w-5 h-5"/>
            }
        </button>
      </div>
    </div>
  );
};
