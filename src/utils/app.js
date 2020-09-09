import cookie from "cookie_js";

export function GetToken() {
  return cookie.get("admin_token");
}
