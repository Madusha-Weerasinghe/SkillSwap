import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./menuCard.css";
import { signin } from "../../service/signIn/signInService";
import { useNavigate } from "react-router-dom";

const MenuCard = ({ icon, title, path }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path); // Navigate to the passed path prop
  };

  return (
    <div className="menuCardContainer" onClick={handleClick}>
      <div className="cardPartOne">
        <FontAwesomeIcon
          icon={icon}
          style={{ fontSize: "18px", alignSelf: "center" }}
          className="icon"
        />
      </div>
      <div className="cardPartTwo">{title}</div>
    </div>
  );
};

export default MenuCard;
