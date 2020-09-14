import service from "../utils/request";
export function addFirstCategory(data) {
  let d = {
    method: "post",
    url: "/news/addFirstCategory",
    data
  };
  return service.request(d);
}

export function getCategory() {
  let d = {
    method: "post",
    url: "/news/getCategory"
  };
  return service.request(d);
}

export function reviseCategory(data) {
  let d = {
    method: "post",
    url: "/news/reviseCategory",
    data
  };
  return service.request(d);
}
export function removeCategory(data) {
  let d = {
    method: "post",
    url: "/news/removeCategory",
    data
  };
  return service.request(d);
}

export function addInfo(data) {
  let d = {
    method: "post",
    url: "/news/add",
    data
  };
  return service.request(d);
}

export function getInfo(data) {
  let d = {
    method: "post",
    url: "/news/getInfo",
    data
  };
  return service.request(d);
}

export function removeInfo(data) {
  let d = {
    method: "post",
    url: "/news/removeInfo",
    data
  };
  return service.request(d);
}

export function reviseInfo(data) {
  let d = {
    method: "post",
    url: "/news/reviseInfo",
    data
  };
  return service.request(d);
}
