// import jwtDecode from "jwt-decode";

const tokenKey = "authToken";

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

// export function getCurrentUser() {
//   try {
//     const jwt = localStorage.getItem(tokenKey);
//     return jwtDecode(jwt);
//   } catch (ex) {
//     return null;
//   }
// }

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function setUserId(userId) {
  localStorage.setItem("userId", userId);
}

export function getUserId(userId) {
  return localStorage.getItem("userId");
}

export default {
  loginWithJwt,
  logout,
  // getCurrentUser,
  getJwt,
};
