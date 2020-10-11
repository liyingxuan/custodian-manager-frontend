import * as validates from "./validate";

export function validateAccount(rule, value, callback) {
  if (!validates.validateEmail(value)) {
    callback(new Error("Email doesn't look correct"));
  } else {
    callback();
  }
}

export function validatePassword(rule, value, callback) {
  if (!validates.validatePassword(value)) {
    callback(
      new Error(
        "Password has minimum of 8 characters, comprising at least 1 number, 1 text and 1 special character",
      ),
    );
  } else {
    callback();
  }
}

export function validateYear(rule, value, callback) {
  if (value >= 0 && value <= 99) {
    callback();
  }
  callback(new Error(`The value must be between 0 and 99`));
}

export function validateChecked(rule, value, callback) {
  if (value === false) {
    callback(new Error("Please accept"));
  } else {
    callback();
  }
}
