import React from "react";
import auth from "../../services/authService";

export default function Logout() {
  React.useEffect(() => {
    auth.logout();
    window.location = "/";
  }, []);

  return null;
}
