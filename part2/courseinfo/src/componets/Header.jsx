import React from "react";

const Header = ({title}) => {
  console.log("Soy la propiedad del Course.",title)
  return <h1>{title}</h1>;
};

export default Header;
