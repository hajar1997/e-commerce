import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Results from "../components/Results/Results";

const SearchResults = () => {
  const colorsEndpoint = "http://localhost:8001/colors";
  const phonesEndpoint = "http://localhost:8001/smartphones";

  return (
    <div>
      <Header />
      <Results
        colorsEndpoint={colorsEndpoint}
        phonesEndpoint={phonesEndpoint}
      />
      <Footer />
    </div>
  );
};

export default SearchResults;
