/*
过滤特殊字符
*/
var validate = {};
validate.filterSpecial = function(s) {
  var pattern = new RegExp(
    // eslint-disable-next-line no-control-regex
    "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）—|{}【】‘；：”“'。，、？↵\r\n]"
  );
  var rs = "";
  for (var i = 0; i < s.length; i++) {
    rs = rs + s.substr(i, 1).replace(pattern, "");
  }
  return rs;
};
validate.email = function(s) {
  let reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  if (reg.test(s)) {
    return true;
  } else {
    return false;
  }
};
validate.password = function(s) {
  let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
  return reg.test(s);
};
validate.code = function(s) {
  let reg = /^[a-zA-Z]{6}$/;
  return reg.test(s);
};

export default validate;
