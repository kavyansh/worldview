import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

import {
  fetchCity as fetchCityById,
  createCity as createNewCity,
  deleteCity as deleteCityById,
  fetchCities as getAllCities,
} from "../services/cities";

const CityContext = createContext();

const BASE_URL = "http://localhost:8000";

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unkown Action Type");
  }
}
// reducer needs to be pure functions.

const initialState = {
  cities: [],
  isLoading: true,
  currentCity: {},
  error: null,
};

function CitiesProvider({ children }) {
  const [{ error, cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const getCity = useCallback(
    function getCity(id) {
      if (Number(id) === currentCity.id) return;
      async function fetchCity() {
        try {
          dispatch({ type: "loading" });
          const data = await fetchCityById(id);
          console.log(data);
          dispatch({ type: "city/loaded", payload: data });
        } catch (err) {
          dispatch({
            type: "rejected",
            payload: "There was an error while fetching the city",
          });
        }
      }

      fetchCity();
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });
      const data = await createNewCity(newCity);
      dispatch({ type: "city/created", payload: data });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was an error creating city...",
      });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      const data = await deleteCityById(id);
      dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting city...",
      });
    }
  }

  useEffect(function () {
    async function fetchCities() {
      try {
        dispatch({ type: "loading" });
        const data = await getAllCities();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading data...",
        });
      }
    }
    fetchCities();
  }, []);

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        error,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

function useCities() {
  const context = useContext(CityContext);
  if (context === undefined)
    throw new Error("Cannot access CitiesContext outside CitiesProvider!");
  return context;
}

export { CitiesProvider, useCities };
