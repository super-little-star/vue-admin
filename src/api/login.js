import service from "../utils/request";

export function GetSms(user, callback) {
  let d = {
    method: "post",
    url: "/getSms",
    data: user
  };
  service.request(d).then(function(res) {
    callback(res);
  });
}

export function Register(data, callback) {
  let d = {
    method: "post",
    url: "/register",
    data
  };
  service.request(d).then(function(res) {
    callback(res);
  });
}
