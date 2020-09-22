export var Key = {
  token: "admin_token",
  userEmail: "admin_userEmail",
  userId: "admin_userId",
  category: "admin_category",
  infoData: "admin_infoData"
};

export function GetData(key) {
  return sessionStorage.getItem(key);
}
export function SaveData(key, value) {
  if (value == null) value = [];
  sessionStorage.setItem(key, JSON.stringify(value));
}
export function RemoveData(key) {
  sessionStorage.removeItem(key);
}
export function RemoveAllData() {
  for (let k in Key) {
    sessionStorage.removeItem(Key[k]);
  }
}
export function SaveAllData(data) {
  for (let k in Key) {
    sessionStorage.setItem(Key[k], data[k]);
  }
}
