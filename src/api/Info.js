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
