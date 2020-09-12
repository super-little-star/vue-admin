import cookie from "cookie_js";

const Key_token = "admin_token";
const Key_userEmail = "admin_userEmail";
const Key_userId = "admin_userId";

//Token
export function GetToken() {
  return cookie.get(Key_token);
}
export function SaveToken(token) {
  cookie.set(Key_token, token);
}
export function RemoveToken() {
  cookie.remove(Key_token);
}

//UserEmail
export function GetUserEmail() {
  return cookie.get(Key_userEmail);
}
export function SaveUserEmail(email) {
  cookie.set(Key_userEmail, email);
}
export function RemoveUserEmail(email) {
  cookie.remove(Key_userEmail);
}

//UserId
export function GetUserId() {
  return cookie.get(Key_userId);
}
export function SaveUserId(id) {
  cookie.set(Key_userId, id);
}
export function RemoveUserId() {
  cookie.set(Key_userId);
}

//UserData
export function SaveUserData(data) {
  SaveToken(data.token);
  SaveUserEmail(data.userEmail);
  SaveUserId(data.userId);
}
export function RemoeUserData() {
  RemoveToken();
  RemoveUserEmail();
  RemoveUserId();
}
