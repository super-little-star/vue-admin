import service from "../utils/request";

export function GetSms(user) {
  let d = {
    method: "post",
    url: "/getSms",
    data: user
  };
  return service.request(d);
}

export function Register(data) {
  let d = {
    method: "post",
    url: "/register",
    data
  };
  return service.request(d);
}
