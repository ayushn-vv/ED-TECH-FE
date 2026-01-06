import get from "lodash/get";
import isRegExp from "lodash/isRegExp";
import { regName } from "../lib/constants";

/* ===============================
   Basic Validators
================================ */

export const checkName = (value: string): string => {
  if (!value) return "required";
  if (value.length < 3) return "Name should be between 3 to 50 characters";
  if (!regName.test(value)) return "enter valid name";
  return "";
};

// export const checkEmail = (value: string): string => {
//   if (!value) return "required";
//   if (!regEmail.test(value)) return "enter valid email";
//   return "";
// };

// export const checkMobile = (value: string): string => {
//   if (!value) return "required";
//   if (!regMobile.test(value)) return "enter valid mobile number";
//   return "";
// };

export const checkDob = (value: string): string => {
  if (!value) return "required";
  return "";
};

/* ===============================
   Custom Regex Validator
================================ */

export interface CustomRegexValidatorConfig {
  fieldName?: string;
  field?: string;
  errMsg?: string;
  regex?: RegExp;
  invert?: boolean; // true = reverse logic
}

export const customRegexValidator =
  (config: CustomRegexValidatorConfig = {}) =>
  (data: Record<string, unknown>): string | null => {
    const { fieldName, field, errMsg, regex, invert } = config;

    if (!regex || !isRegExp(regex)) return null;

    const value = get(data, field ?? "");
    if (!value) return null;

    const matches = regex.test(String(value));

    // Normal mode (invert = false)
    if (!invert) {
      return matches ? null : errMsg || `Invalid ${fieldName}`;
    }

    // Invert mode (fail if regex matches)
    return matches ? errMsg || `Invalid ${fieldName}` : null;
  };
