import React, { useState } from "react";
import PropTypes from "prop-types";

const SearchContext = React.createContext();
const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [viewBar, setViewBar] = useState(true);
  const [result, setResult] = useState("");
  const [orderText, setOrderText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!search) {
        const res = await fetch(
          `${import.meta.env.VITE_REACT_HOST}/getexperiences?orderBy=votes&orderDirection=${orderText}`);

        if (res.ok) {
          const data = await res.json();
          setResult(data.data);
          return data;
        } else {
          const data = await res.json();
          console.log(data);
        }
      } else {
        const res = await fetch(
          `${import.meta.env.VITE_REACT_HOST}/getexperiences?orderBy=votes&orderDirection=${orderText}&search=${search}`
        );

        if (res.ok) {
          const data = await res.json();
          setResult(data.data);
          return data;
        } else {
          const data = await res.json();
          console.log(data.data);
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <SearchContext.Provider
      value={[
        search,
        setSearch,
        viewBar,
        setViewBar,
        handleSubmit,
        orderText,
        setOrderText,
        result,
        setResult,
      ]}
    >
      {children}
    </SearchContext.Provider>
  );
};
SearchProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export { SearchContext, SearchProvider };
