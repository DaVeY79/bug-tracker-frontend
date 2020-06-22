// import React from "react";
import moment from "moment";

function Published({ time }) {
  let published = moment().diff(time, "h");
  if (published < 1) {
    let time2 = moment().diff(time, "minutes");
    return `${time2 <= 1 ? `${time2} minute` : `${time2} minutes`} ago`;
  } else if (published < 24) return `${published} hours ago`;

  published = moment(time).format("LL");
  return published;
}

export default Published;
