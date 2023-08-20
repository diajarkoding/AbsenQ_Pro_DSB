export const NotNull = async (data, len = 3) => {
  if (data != null && data.length >= len) return true;
  else return false;
};
export const NotNullnExact = async (data, len) => {
  if (data != null && data.length == len) return true;
  else return false;
};
export const NotNullOnly = async (data, len) => {
  if (data != null) return true;
  else return false;
};
export const Email = async data => {
  let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // if (reg.test(data) === true && data.includes('@smma.co.id')) return true;
  if (reg.test(data) === true) return true;
  else return false;
};
export const Email1 = async data => {
  let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (reg.test(data) === true) return true;
  else return false;
};
export const Ktp = async data => {
  if (data.length == 16) {
    // && this.state.lahir != null
    // var day = this.state.lahir.getDate().toString();
    // var month = this.state.lahir.getMonth();
    // var year = this.state.lahir.getFullYear();
    //
    // if (day.length === 1) day = "0" + day;
    //
    // month = (month + 1).toString();
    // if (month.length === 1) month = "0" + month;
    //
    // year = year.toString().substr(-2);
    //
    // ktpDay = data.substring(6, 8);
    // if (ktpDay.charAt(0) >= "4" && ktpDay.charAt(0) <= "7") {
    //   ktpDay = ktpDay.charAt(0) - "4" + ktpDay.charAt(1);
    // }
    // ktpMonth = data.substring(8, 10);
    // ktpYear = data.substring(10, 12);
    //
    // if (ktpDay == day && ktpMonth == month && ktpYear == year) {
    return true;
    // } else await this.setState({ ktpFail: true });
  } else return false;
};
export const Otp = async data => {
  const regExp = /^([0-9]*$)/;
  if (data != null && data.length == 6 && regExp.test(data)) return true;
  else return false;
};
export const Nik = async data => {
  const regExp = /^([0-9]*$)/;
  if (data != null && data.length <= 16 && regExp.test(data)) return true;
  else return false;
};

export const Nik1 = async data => {
  const regExp = /^([,-9]*$)/;
  if (data != null && data.length <= 16 && regExp.test(data)) return true;
  else return false;
};

export const Hp = async data => {
  const regExp = /^([0-9]*$)/;
  if (
    data != null &&
    data.length >= 10 &&
    data.length <= 14 &&
    regExp.test(data)
  ) {
    if (data.charAt(0) === '0' && data.charAt(1) === '8') {
      return true;
    } else return false;
  } else return false;
};
export const Password = async data => {
  let regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
  if (data != null && regExp.test(data) && data.length >= 8) return true;
  // if (data.length != 0) return true;
  else return false;
};
export const Number = async data => {
  const regExp = /^([0-9]*$)/;
  if (regExp.test(data) === true) return true;
  else return false;
};

export const Temper = async data => {
  const regExp = /^([3-4]{1}[0-9]{1}([.][0-9]{1,2}))?$/;
  if (regExp.test(data) === true && data != '' && data != null) return true;
  else return false;
};
export const Text = async data => {
  const regExp = /^(?=.*[0-9])/;
  if (regExp.test(data) === true) return true;
  else return false;
};
export const RePassword = async (data, redata) => {
  if (redata != null && data === redata)
    if (redata.length != 0) return true;
    else return false;
  else return false;
};
