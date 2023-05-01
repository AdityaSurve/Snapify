import React, { useContext, useState, useEffect } from "react";
import "../styling/Chats.css";

const Chatnav = (props) => {
  const { user, imagesrc } = props;
  return (
    <div className="chatnav">
      <div
        id="usernav"
        style={{ display: "flex", flexDirection: "row", gap: "10px" }}
      >
        <img src={imagesrc} alt="" id="navimg" />
        <span> {user.displayName} </span>
      </div>
    </div>
  );
};

export default Chatnav;
