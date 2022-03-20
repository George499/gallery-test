import React, { useState } from "react";
import Card from "../Components/Card";

function Home(props) {
  const [countries, setCountries] = useState([]);
  const filterByRegion = async (region) => {
    if (region === "") return;
    const res = await fetch(`https://restcountries.com/v3.1/region/${region}`);
    const data = await res.json();
    await setCountries(data);
  };

  props = { ...props, filterByRegion, countries };
  return (
    <div className="container mx-auto py-10">
      <Card {...props} />
    </div>
  );
}

export default Home;
