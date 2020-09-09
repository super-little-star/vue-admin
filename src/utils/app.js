import cookie from "cookie_js";

const Key_token = "admin_token";
const Key_userEmail = "admin_userEmail";

export function GetToken() {
  return cookie.get(Key_token);
}

export function SaveToken(token) {
  cookie.set(Key_token, token);
}

export function RemoeToken() {
  cookie.remove(Key_token);
}
export function SaveUserEmail(email) {
  cookie.set(Key_userEmail, email);
}
export function GetUserEmail() {
  return cookie.get(Key_userEmail);
}
