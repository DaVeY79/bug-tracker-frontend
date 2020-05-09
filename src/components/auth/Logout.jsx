import React from "react";

export default function Logout() {
  React.useEffect(() => {
    console.log("logging out...");
    window.location = "/";
  }, []);

  return null;
}
