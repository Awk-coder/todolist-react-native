import React from "react";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const d = new Date();
const month = months[d.getMonth()];
const day = d.getDate();
const year = d.getFullYear();
const dateToday = `${month} ${day}, ${year}`;

export const CurrentDate = () => {
  return <div className="yellow">{dateToday}</div>;
};
