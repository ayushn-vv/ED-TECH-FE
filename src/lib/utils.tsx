// /* eslint-disable no-useless-catch */
// /* eslint-disable no-restricted-syntax */
// import axios from 'axios';
// import dayjs from 'dayjs';
// import { PhoneNumberUtil } from 'google-libphonenumber';
// import hTMLEntities from 'he';
// import startCase from 'lodash/startCase';
// import moment from 'moment';
// import {
//   BASE_URL,
//   DECRYPT_RESPONSE_KEY,
//   REACT_APP_COLLECTJS_API_KEY,
// } from '../api/constants';
// import { getDecryptedParams } from '../utils/decryption/Decryption.jsx';
// import { customRegexValidator } from 'src/utils/inputValidation';
// import { v4 as uuid } from 'uuid';
// import {
//   copyMessage,
//   dateFormats,
//   durationUnit,
//   genders,
//   patientPrescriptionFrequency,
//   roleTypes,
//   shipAndPayee,
// } from './constants';
// import Events from './events';
// import { UI_ROUTES } from './routeConstants';
// import sortBy from 'lodash/sortBy';
// import isEqual from 'lodash/isEqual';
// import map from 'lodash/map';
// import isObject from 'lodash/isObject';

// import { serverDownload } from '../api/server';
// import { encrypt } from './encryption';
// import { generatePath } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode';
// import { parsePhoneNumberFromString } from 'libphonenumber-js';
// import { useEffect, useState } from 'react';

// const setUserTimezone = (timezone) => {
//   // eslint-disable-next-line no-param-reassign
//   timezone = timezone || dayjs.tz.guess();
//   localStorage.setItem('userTimezone', timezone);
// };

// const setUserRole = (role) => {
//   localStorage.setItem('userRole', role);
// };

// const getUserRole = () => localStorage.getItem('userRole');

// const userRole = getUserRole();

// const getUserTimezone = () => {
//   const userTimeZone = localStorage.getItem('userTimezone');
//   return userRole === roleTypes.patient || !userTimeZone
//     ? dayjs.tz.guess()
//     : userTimeZone;
// };

// const closeDrawer = () => {
//   // Events.trigger('toggleAppDrawer', false);
// };

// const openDrawer = () => {
//   Events.trigger('toggleAppDrawer');
// };

// const triggerEvents = (event, message = {}) => {
//   Events.trigger(event, message);
// };

// const showSnackbar = (message) => {
//   Events.trigger('showSnackbar', message);
// };

// const showConfirmDialog = ({ data, confirmAction, message = '' }) => {
//   Events.trigger('showConfirmDialog', {
//     data,
//     confirmAction,
//     message,
//   });
// };

// const dateFormatter = (date, format = 'll') => moment(date).format(format);

// const getDateDiff = (startDate, endDate, { unit }) => {
//   const start = moment.utc(startDate);
//   const end = moment.utc(endDate);
//   return end.diff(start, unit);
// };

// function formatDateWithToday(date) {
//   if (moment(date).isSame(moment(), 'day')) {
//     return `Today, ${moment(date).format('h:mm A')}`;
//   } else {
//     return moment(date).format('MMMM D, h:mm A');
//   }
// }

// const dateFormatterDayjs = (date, format = 'll') => dayjs(date).format(format);

// const convertWithTimezone = (
//   utcTimestamp,
//   { timezone, format, requiredPlain = false } = {}
// ) => {
//   // eslint-disable-next-line no-param-reassign
//   timezone = timezone || getUserTimezone();
//   const newDate = dayjs.utc(utcTimestamp).tz(timezone);
//   if (format) {
//     return newDate.format(format);
//   }
//   if (requiredPlain) {
//     return newDate;
//   }
//   return newDate.toDate();
// };

// const getUTCDateTime = (
//   date,
//   { hour = '12', minute = '00', meridien = 'AM' } = {}
// ) => {
//   const dateString = `${dateFormatterDayjs(
//     date,
//     dateFormats.MMDDYYYY
//   )} ${hour}:${minute} ${meridien}`;

//   return convertToUtc(dateString, { format: dateFormats.MMDDYYYYhhmmA });
// };

// const getNewDate = (date, { timezone } = {}) => {
//   // eslint-disable-next-line no-param-reassign
//   timezone = timezone || getUserTimezone();
//   return dayjs(date).tz(timezone);
// };

// const getTimezoneAbbreviation = (timezone) =>
//   moment.tz(timezone.toString()).format('z');

// const getEndOfTheDate = (
//   date,
//   { unit = 'day', format = dateFormats.YYYYMMDD } = {}
// ) => dayjs(date).endOf(unit).format(format);
// const getStartOfTheDate = (
//   date,
//   { unit = 'day', format = dateFormats.YYYYMMDD } = {}
// ) => dayjs(date).startOf(unit).format(format);
// const to24Hours = (ampm) => {
//   const hours = ampm ? dayjs(`${ampm}`).format('HH') : ampm;
//   const minutes = ampm ? dayjs(`${ampm}`).format('mm') : ampm;
//   return `${hours}:${minutes}`;
// };

// const time12hr = (time24hr) => moment(time24hr, 'HH:mm').format('h:mm A');

// const combinedDateTime = (inputDate, inputTime) =>
//   moment(`${inputDate} ${inputTime}`, 'YYYY-MM-DD h:mm A').toISOString();

// function decodeHtml(html) {
//   const decodedHtml = hTMLEntities.decode(html);
//   return decodedHtml;
// }
// const getStartCase = (str) => startCase(str);

// const getDirtyFieldsValue = (modifiedData = {}, dirtyFields = {}) => {
//   const diffData = {};
//   for (const key in dirtyFields) {
//     if (Object.hasOwn(dirtyFields, key)) {
//       diffData[key] = modifiedData[key];
//     }
//   }
//   return diffData;
// };

// const getUpdatedFieldsValue = (newObj, preObj) => {
//   if (!newObj || Object.keys(newObj).length < 1) return {};

//   const diffValue = Object.keys(newObj).reduce((diff, key) => {
//     if (preObj?.[key] === newObj?.[key]) return diff;
//     return {
//       ...diff,
//       [key]: newObj?.[key],
//     };
//   }, {});
//   return diffValue;
// };

// const getUpdatedFieldsValues = (newObj, preObj) => {
//   if (!newObj || Object.keys(newObj).length < 1) return {};

//   return Object.keys(newObj).reduce((diff, key) => {
//     const newValue = newObj[key];
//     const preValue = preObj[key];

//     if (moment.isMoment(newValue) && moment.isMoment(preValue)) {
//       if (!newValue.isSame(preValue)) {
//         return { ...diff, [key]: newValue };
//       }
//       return diff;
//     }
//     if (Array.isArray(newValue) && Array.isArray(preValue)) {
//       if (!isEqual(newValue, preValue)) {
//         return { ...diff, [key]: newValue };
//       }
//       return diff;
//     }
//     if (isObject(newValue) && isObject(preValue)) {
//       if (!isEqual(newValue, preValue)) {
//         return { ...diff, [key]: newValue };
//       }
//       return diff;
//     }
//     if (newValue !== preValue) {
//       return { ...diff, [key]: newValue };
//     }
//     return diff;
//   }, {});
// };

// const updateFormFields = (formGroup, fields, key, value) => {
//   const updatedFormGroups = formGroup.map((obj) => {
//     if (fields?.includes(obj.name)) {
//       const temp = obj;
//       temp[key] = value;
//       return temp;
//     }
//     return obj;
//   });
//   return updatedFormGroups;
// };

// const getGendersForm = () => {
//   const gender = Object.keys(genders);
//   const genderForm = [];
//   gender.forEach((key) => {
//     genderForm.push({ label: genders[key].label, value: genders[key].value });
//   });
//   return genderForm;
// };

// const getFormattedAddressNew = (result) => {
//   // Parse the JSON response
//   const addressComponents = result.address_components;
//   // Extract addressLine1, addressLine2, city, state, country, postalCode, and countryCode
//   const streetNumber = addressComponents.find((component) =>
//     component.types.includes('street_number')
//   );
//   const route = addressComponents.find((component) =>
//     component.types.includes('route')
//   );
//   const sublocality =
//     addressComponents.find((component) =>
//       component.types.includes('sublocality_level_1')
//     ) ||
//     addressComponents.find((component) =>
//       component.types.includes('sublocality')
//     ) ||
//     addressComponents.find((component) =>
//       component.types.includes('sublocality_level_1')
//     );
//   const subpremise = addressComponents.find((component) =>
//     component.types.includes('subpremise')
//   );
//   const locality = addressComponents.find((component) =>
//     component.types.includes('locality')
//   );
//   const stateComponent = addressComponents.find((component) =>
//     component.types.includes('administrative_area_level_1')
//   );
//   const countryComponent = addressComponents.find((component) =>
//     component.types.includes('country')
//   );
//   const postalCodeComponent = addressComponents.find((component) =>
//     component.types.includes('postal_code')
//   );

//   return {
//     addressLine1:
//       streetNumber?.long_name && route?.long_name
//         ? `${streetNumber.long_name} ${route.long_name} `
//         : '',
//     addressLine2: `${subpremise ? subpremise.long_name : ''} ${
//       sublocality ? sublocality.long_name : ''
//     }`,
//     locality: `${locality ? locality.long_name : ''}`,
//     state: stateComponent?.long_name,
//     stateCode: stateComponent?.short_name,
//     country: `${countryComponent ? countryComponent.long_name : ''}`,
//     countryCode: `${countryComponent ? countryComponent.short_name : ''}`,
//     postalCode: `${postalCodeComponent ? postalCodeComponent.long_name : ''}`,
//     description: result?.formatted_address,
//     latitude: result?.geometry?.location?.lat(),
//     longitude: result?.geometry?.location?.lng(),
//     placeId: result?.place_id,
//   };
// };

// const getFormattedAddress = (address) => {
//   const formattedAddress = {};
//   formattedAddress.description = address?.formatted_address;
//   formattedAddress.latitude = address?.geometry?.location?.lat();
//   formattedAddress.longitude = address?.geometry?.location?.lng();
//   formattedAddress.place_id = address?.place_id;

//   for (const component of address?.address_components || []) {
//     const componentType = component?.types?.[0];
//     switch (componentType) {
//       case 'locality': {
//         formattedAddress.locality = `${component?.long_name}`;
//         break;
//       }
//       case 'administrative_area_level_3': {
//         formattedAddress.city = `${component?.long_name}`;
//         break;
//       }
//       case 'administrative_area_level_1': {
//         formattedAddress.state = component?.long_name;
//         break;
//       }
//       case 'country': {
//         formattedAddress.country = component?.long_name;
//         formattedAddress.country_code = component?.short_name;
//         break;
//       }
//       case 'postal_code': {
//         formattedAddress.postal_code = component?.short_name;
//         break;
//       }
//       default:
//         break;
//     }
//   }
//   return formattedAddress;
// };

// const passwordValidation = (formData) => [
//   {
//     condition: 'At least 1 uppercase character',
//     satisfied: formData?.password
//       ? !customRegexValidator({
//           field: 'password',
//           regex: /[A-Z]/g,
//         })(formData)
//       : false,
//   },
//   {
//     condition: 'At least 1 lowercase character',
//     satisfied: formData?.password
//       ? !customRegexValidator({
//           field: 'password',
//           regex: /[a-z]/g,
//         })(formData)
//       : false,
//   },
//   {
//     condition: 'At least 1 number',
//     satisfied: formData?.password
//       ? !customRegexValidator({
//           field: 'password',
//           regex: /[0-9]/,
//         })(formData)
//       : false,
//   },
//   {
//     condition: 'At least 1 special character',
//     satisfied: formData?.password
//       ? !customRegexValidator({
//           field: 'password',
//           regex: /(?=.[!@#$%^&()_{}\-[\];:'"<>,./?\\|+=])/,
//         })(formData)
//       : false,
//   },
//   {
//     condition: 'At least 8 characters',
//     satisfied: formData?.password?.length >= 8,
//   },
//   {
//     condition: 'Password must match with confirm password',
//     satisfied:
//       formData?.password?.length &&
//       formData?.password === formData?.repeatPassword,
//   },
// ];

// const generateUniqueId = () => uuid();

// // Image Upload
// // eslint-disable-next-line consistent-return
// const uploadImage = async (file, options = {}, isThumbnailRequired = false) => {
//   const name = `${file.name.replace(/[&/\\#,^@!+()$~%" "'":*?<>{}-]/g, '_')}`;
//   const formData = new FormData();
//   if (file?.fileInfo?.patient) {
//     formData.append('patient', file?.fileInfo?.patient);
//   }
//   if (file?.fileInfo?.isPublic || options?.isPublic) {
//     formData.append('isPublic', 'true');
//   }
//   // eslint-disable-next-line no-param-reassign
//   file = new File([file], name, { type: file.type });
//   const { uri = 'upload' } = options;
//   formData.append('', file);
//   formData.append('thumbnail', isThumbnailRequired);
//   const accessToken = localStorage.getItem('access_token');
//   try {
//     const res = await axios.post(`${BASE_URL}${uri}`, formData, {
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     let result = getDecryptedParams(res?.data, DECRYPT_RESPONSE_KEY) || {};
//     result = result && result.length ? result[0] : result;
//     return result;
//   } catch (error) {
//     throw error.response.data.message;
//   }
// };

// // Image download
// const getImageUrl = (file, { isPublicURI = false } = {}) => {
//   if (!file) {
//     return;
//   }
//   let imageUrl = isPublicURI
//     ? `${BASE_URL}download/public?fileName=${file}`
//     : `${BASE_URL}download?fileName=${file}`;
//   // eslint-disable-next-line consistent-return
//   return imageUrl;
// };

// const downloadFile = (file, fileName) => {
//   const isPatientFile = file?.patient;
//   const imageUrl = getImageUrl(fileName, { isPatientFile });
//   fetch(imageUrl)
//     .then((response) => response.blob())
//     .then((responseAsBlob) => {
//       const downloadURL = window.URL.createObjectURL(responseAsBlob);
//       const a = document.createElement('a');
//       a.href = downloadURL;
//       a.download = fileName;
//       a.click();
//     });
// };

// const downloadPdf = (url, fileName = 'invoice.pdf') => {
//   const accessToken = localStorage.getItem('access_token');

//   serverDownload({
//     url,
//     method: 'GET',
//     responseType: 'blob',
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   }).then((response) => {
//     const contentDisposition =
//       response.headers.get('Content-Disposition') || '';
//     const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(
//       contentDisposition
//     );
//     const filename = matches && matches[1] ? matches[1] : fileName;
//     const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
//     const link = document.createElement('a');
//     link.href = downloadUrl;
//     link.setAttribute('download', filename);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   });
// };

// const getZplToPdfUrl = (label) => {
//   const byteCharacters = atob(label);
//   const data = new FormData();
//   data.append('file', byteCharacters);
//   // eslint-disable-next-line no-undef
//   const reqUrl = process.env.REACT_APP_LABELARY_URL;

//   return fetch(reqUrl, {
//     method: 'POST',
//     body: data,
//     headers: { Accept: 'application/pdf' },
//   })
//     .then((response) => response.blob())
//     .then((blob) => window.URL.createObjectURL(blob));
// };

// const DEVICE_DIMENSION = {
//   width: window.innerWidth,
//   height: window.innerHeight,
// };

// const BASE_DIMENSION = {
//   width: 1366,
//   height: 728,
// };

// const normalizedWidth = (size) => {
//   return (DEVICE_DIMENSION.width / BASE_DIMENSION.width) * size;
// };
// const normalizedHeight = (size) =>
//   (DEVICE_DIMENSION.height / BASE_DIMENSION.height) * size;

// const scale = (size) => size || normalizedWidth(size);
// const verticalScale = (size) => size || normalizedHeight(size);
// const horizontalScale = (size) => normalizedWidth(size);
// const lineHeightScale = (fontSize, factor = 1.2) =>
//   Math.ceil(normalizedHeight(fontSize * factor));

// // const getScheduleForTheDay = (schedules, practiceTimezone, selectedDate) => {
// //   console.log('CheckScheduleDate------------------------->',schedules);
// //   console.log('selectedDate------------------------->',selectedDate);

// //   const selectedDay = dayjs(selectedDate)
// //     .tz(getUserTimezone())
// //     .format(dateFormats.YYYYMMDD);
// //   const selectedDayOfWeek = dayjs(selectedDate)
// //     .tz(getUserTimezone())
// //     .format('dddd')
// //     .toLowerCase();

// //   const dayBefore = dayjs(selectedDate)
// //     .tz(getUserTimezone())
// //     .subtract(1, 'day')
// //     .format('dddd')
// //     .toLowerCase();
// //   const dayAfter = dayjs(selectedDate)
// //     .tz(getUserTimezone())
// //     .add(1, 'day')
// //     .format('dddd')
// //     .toLowerCase();

// //   const relevantSchedules = schedules.filter((s) =>
// //     [dayBefore, selectedDayOfWeek, dayAfter].includes(s.day)
// //   );

// //   const schedulesForTheDay = relevantSchedules.reduce((result, schedule) => {
// //     if (schedule.isClosed) {
// //       return result;
// //     }
// //     let scheduleDay =
// //       schedule.day === dayBefore
// //         ? dayjs(selectedDate)
// //             .tz(getUserTimezone())
// //             .subtract(1, 'day')
// //             .format(dateFormats.YYYYMMDD)
// //         : selectedDay;
// //     if (schedule.day === dayBefore) {
// //       scheduleDay = dayjs(selectedDate)
// //         .tz(getUserTimezone())
// //         .subtract(1, 'day')
// //         .format(dateFormats.YYYYMMDD);
// //     } else if (schedule.day === dayAfter) {
// //       scheduleDay = dayjs(selectedDate)
// //         .tz(getUserTimezone())
// //         .add(1, 'day')
// //         .format(dateFormats.YYYYMMDD);
// //     }

// //     // convert the start and end hours to the browser's timezone
// //     const startHrs = dayjs
// //       .tz(`${scheduleDay}T${schedule.startHrs}`, practiceTimezone)
// //       .tz(getUserTimezone());
// //     const endHrs = dayjs
// //       .tz(`${scheduleDay}T${schedule.endHrs}`, practiceTimezone)
// //       .tz(getUserTimezone());

// //     // check if the schedule is on the selected day
// //     const startDay = startHrs.format(dateFormats.YYYYMMDD);
// //     const endDay = endHrs.format(dateFormats.YYYYMMDD);

// //     if (startDay === selectedDay && endDay !== selectedDay) {
// //       result.push({
// //         day: startHrs.format('dddd').toLowerCase(),
// //         startHrs: startHrs.format('HH:mm'),
// //         endHrs: '23:59',
// //         isClosed: schedule.isClosed,
// //       });
// //     } else if (startDay !== selectedDay && endDay === selectedDay) {
// //       result.push({
// //         day: endHrs.format('dddd').toLowerCase(),
// //         startHrs: '00:00',
// //         endHrs: endHrs.format('HH:mm'),
// //         isClosed: schedule.isClosed,
// //       });
// //     } else if (startDay === selectedDay && endDay === selectedDay) {
// //       result.push({
// //         day: startHrs.format('dddd').toLowerCase(),
// //         startHrs: startHrs.format('HH:mm'),
// //         endHrs: endHrs.format('HH:mm'),
// //         isClosed: schedule.isClosed,
// //       });
// //     }

// //     return result;
// //   }, []);

// //   return schedulesForTheDay.length > 0 ? schedulesForTheDay : null;
// // };

// const getScheduleForTheDay = (
//   schedules,
//   practiceTimezone,
//   selectedDate,
//   isCalendarSchedule
// ) => {
//   if (!schedules || schedules.length === 0) return [];

//   const selectedDay = dayjs(selectedDate)
//     .tz(getUserTimezone())
//     .format(dateFormats.YYYYMMDD);
//   const selectedDayOfWeek = dayjs(selectedDate)
//     .tz(getUserTimezone())
//     .format('dddd')
//     .toLowerCase();

//   const dayBefore = dayjs(selectedDate)
//     .tz(getUserTimezone())
//     .subtract(1, 'day')
//     .format('dddd')
//     .toLowerCase();
//   const dayAfter = dayjs(selectedDate)
//     .tz(getUserTimezone())
//     .add(1, 'day')
//     .format('dddd')
//     .toLowerCase();

//   // Filter schedules based on either `date` or `day`
//   const relevantSchedules = schedules.filter((schedule) => {
//     // if (schedule.date) {
//     //   // If the schedule has a specific date, check against selectedDate
//     //   const scheduleDate = dayjs(schedule.date)
//     //     .tz(getUserTimezone())
//     //     .format(dateFormats.YYYYMMDD);
//     //   return scheduleDate === selectedDay;
//     // } else {
//     // Otherwise, fallback to checking the day (before, current, after)
//     return [dayBefore, selectedDayOfWeek, dayAfter].includes(schedule.day);
//     // }
//   });

//   const schedulesForTheDay = relevantSchedules.reduce((result, schedule) => {
//     if (schedule.isClosed) {
//       return result;
//     }
//     if (isCalendarSchedule && !schedule?.existingPatient) {
//       return result;
//     }
//     // Use the specific date if available, otherwise use day comparison
//     let scheduleDay = schedule.date
//       ? schedule.date.format(dateFormats.YYYYMMDD)
//       : selectedDay;

//     // Adjust scheduleDay for previous or next day based on schedule.day
//     if (!schedule.date) {
//       if (schedule.day === dayBefore) {
//         scheduleDay = dayjs(selectedDate)
//           .tz(getUserTimezone())
//           .subtract(1, 'day')
//           .format(dateFormats.YYYYMMDD);
//       } else if (schedule.day === dayAfter) {
//         scheduleDay = dayjs(selectedDate)
//           .tz(getUserTimezone())
//           .add(1, 'day')
//           .format(dateFormats.YYYYMMDD);
//       }
//     }

//     // Convert start and end hours to the user's timezone
//     const startHrs = dayjs
//       .tz(`${scheduleDay}T${schedule.startHrs}`, practiceTimezone)
//       .tz(getUserTimezone());
//     const endHrs = dayjs
//       .tz(`${scheduleDay}T${schedule.endHrs}`, practiceTimezone)
//       .tz(getUserTimezone());

//     // Determine if the schedule is on the selected day
//     const startDay = startHrs.format(dateFormats.YYYYMMDD);
//     const endDay = endHrs.format(dateFormats.YYYYMMDD);

//     // Handle cases where the schedule spans multiple days
//     if (startDay === selectedDay && endDay !== selectedDay) {
//       result.push({
//         day: startHrs.format('dddd').toLowerCase(),
//         startHrs: startHrs.format('HH:mm'),
//         endHrs: '23:59',
//         isClosed: schedule.isClosed,
//       });
//     } else if (startDay !== selectedDay && endDay === selectedDay) {
//       result.push({
//         day: endHrs.format('dddd').toLowerCase(),
//         startHrs: '00:00',
//         endHrs: endHrs.format('HH:mm'),
//         isClosed: schedule.isClosed,
//       });
//     } else if (startDay === selectedDay && endDay === selectedDay) {
//       result.push({
//         day: startHrs.format('dddd').toLowerCase(),
//         startHrs: startHrs.format('HH:mm'),
//         endHrs: endHrs.format('HH:mm'),
//         isClosed: schedule.isClosed,
//       });
//     }

//     return result;
//   }, []);

//   return schedulesForTheDay.length > 0 ? schedulesForTheDay : null;
// };

// const generateTimeSlots = (
//   schedule,
//   appointmentInterval,
//   leadTime,
//   leadDays,
//   selectedDate
// ) => {
//   const format = 'HH:mm';
//   const slots = [];
//   const intervalArray = appointmentInterval?.split('_');
//   let interval = intervalArray?.[0];
//   if (interval === '0') {
//     interval = 1;
//   }
//   const selectedDay = dayjs(selectedDate)
//     .tz(getUserTimezone())
//     .format(dateFormats.YYYYMMDD);
//   const today = dayjs().tz(getUserTimezone()).format(dateFormats.YYYYMMDD);
//   const presentTime = dayjs()
//     .tz(getUserTimezone())
//     .add(leadTime, 'minute')
//     .format('HH:mm');
//   schedule?.forEach((s) => {
//     let start = dayjs(s?.startHrs, format);
//     const end = dayjs(s?.endHrs, format);

//     if (
//       leadDays === '0' &&
//       today === selectedDay &&
//       start.format('HH:mm') < presentTime
//     ) {
//       start = dayjs(presentTime, format);
//     }

//     while (start.isBefore(end)) {
//       slots.push(start.format(format));
//       start = start.add(interval, 'minute');
//     }
//   });
//   return slots;
// };

// const bytesToMB = (bytes) => {
//   const megabytes = bytes / (1024 * 1024);
//   return megabytes.toFixed(2);
// };

// const getFileType = (file) => {
//   if (file?.mimetype?.startsWith('image/')) {
//     return 'image';
//   }
//   if (file?.mimetype === 'application/pdf') {
//     return 'pdf';
//   }
//   return 'unknown';
// };
// const calculateIdealWeight = (patientHeight, gender) => {
//   let baseWeight;
//   if (gender === genders.male.value) {
//     baseWeight = 110;
//   } else {
//     baseWeight = 100;
//   }
//   return patientHeight >= 152
//     ? `${Math.floor(baseWeight + 2.0 * (patientHeight - 152))} lbs`
//     : '';
// };
// const calculateBMI = (heightInCm, weightInLbs) => {
//   const heightInMeters = heightInCm / 100;
//   const weightInKg = weightInLbs * 0.453592;
//   let bmi;
//   if (heightInMeters === 0) bmi = 0;
//   else bmi = weightInKg / (heightInMeters * heightInMeters);
//   const roundedBMI = parseFloat(bmi.toFixed(2));
//   let category = '';

//   if (roundedBMI < 18.5) {
//     category = 'Underweight';
//   } else if (roundedBMI >= 18.5 && roundedBMI <= 24.9) {
//     category = 'Normal';
//   } else if (roundedBMI >= 24.9 && roundedBMI <= 29.9) {
//     category = 'Overweight';
//   } else if (roundedBMI >= 29.9) {
//     category = 'Obesity';
//   }

//   return {
//     bmi: roundedBMI,
//     category,
//   };
// };
// const feetInchesToCM = (feet, inches) =>
//   Number(feet) * 30.48 + Number(inches) * 2.54;

// const cmToFeetInches = (cm) => {
//   const feet = parseInt(Number(cm) / 2.54 / 12, 10);
//   const inches = (Number(cm) / 2.54) % 12;
//   return { feet, inches };
// };

// const mlToLtr = (totalValue) => {
//   if (!totalValue) return '';
//   const value =
//     totalValue >= 1000 ? `${totalValue / 1000} L` : `${totalValue} ml`;
//   return value || '';
// };

// const getShipAndPayeeForm = () => {
//   const shipAndPay = Object.keys(shipAndPayee);
//   const shipAndPayForm = [];
//   shipAndPay.forEach((key) => {
//     shipAndPayForm.push({
//       label: shipAndPayee[key].label,
//       value: shipAndPayee[key].value,
//     });
//   });
//   return shipAndPayForm;
// };

// const copyWidgetLink = (url) => {
//   navigator.clipboard
//     .writeText(url)
//     .then(() => {
//       showSnackbar({
//         message: copyMessage.copied,
//         severity: 'success',
//       });
//     })
//     .catch(() => {
//       showSnackbar({
//         message: copyMessage.error,
//         severity: 'error',
//       });
//     });
// };

// const patientFilterParser = (filter) => {
//   const appliedFilter = { ...filter };
//   if (appliedFilter?.patientId?.id) {
//     appliedFilter.patientId = appliedFilter.patientId.id;
//   } else {
//     delete appliedFilter.patientId;
//   }
//   return appliedFilter;
// };
// const practiceLocationFilterParser = (filter) => {
//   const appliedFilter = { ...filter };
//   if (appliedFilter?.locationId?.id) {
//     appliedFilter.locationId = appliedFilter.locationId.id;
//   } else {
//     delete appliedFilter.locationId;
//   }
//   return appliedFilter;
// };
// const procedureCodeFilterParser = (filter) => {
//   const appliedFilter = { ...filter };
//   if (appliedFilter?.procedureCodeId?.id) {
//     appliedFilter.procedureCodeId = appliedFilter.procedureCodeId.id;
//   } else {
//     delete appliedFilter.procedureCodeId;
//   }
//   return appliedFilter;
// };
// const dateRangeFilterParser = (filter) => {
//   const appliedFilter = { ...filter };

//   if (appliedFilter?.dateRangePicker) {
//     appliedFilter.from = appliedFilter.dateRangePicker.from;
//     appliedFilter.to = appliedFilter.dateRangePicker.to;
//     delete appliedFilter?.dateRangePicker;
//   } else {
//     delete appliedFilter?.dateRangePicker;
//   }
//   return appliedFilter;
// };

// const staffNameFilterParser = (filter) => {
//   const appliedFilter = { ...filter };
//   if (appliedFilter?.id?.id) {
//     appliedFilter.id = appliedFilter?.id?.id;
//   } else {
//     delete appliedFilter.id;
//   }
//   return appliedFilter;
// };
// const claimPractitionerFilterParser = (filter) => {
//   const appliedFilter = { ...filter };
//   if (appliedFilter?.practitionerId?.id) {
//     appliedFilter.practitionerId = appliedFilter?.practitionerId?.id;
//   } else {
//     delete appliedFilter.id;
//   }
//   return appliedFilter;
// };
// const invoicePractitionerFilterParser = (filter) => {
//   const appliedFilter = { ...filter };
//   if (appliedFilter?.practitionerId?.id) {
//     appliedFilter.practitionerId = appliedFilter?.practitionerId?.id;
//   } else {
//     delete appliedFilter.id;
//   }
//   return appliedFilter;
// };
// const assignedToIdFilterParser = (filter) => {
//   const appliedFilter = { ...filter };
//   if (appliedFilter?.assignedToId?.id) {
//     appliedFilter.assignedToId = appliedFilter?.assignedToId?.id;
//   } else {
//     delete appliedFilter.id;
//   }
//   return appliedFilter;
// };
// const claimReportStatusFilterParser = (filter) => {
//   const appliedFilter = { ...filter };
//   if (appliedFilter?.claimStatus?.code) {
//     appliedFilter.claimStatus = appliedFilter?.claimStatus?.code;
//   } else {
//     delete appliedFilter.claimStatus;
//   }
//   return appliedFilter;
// };

// const encounterTypeFilterParser = (filter) => {
//   const appliedFilter = { ...filter };
//   if (appliedFilter?.encounterTypeCode === 'ALL') {
//     delete appliedFilter.encounterTypeCode;
//   }
//   return appliedFilter;
// };

// const roleFilterParser = (filter) => {
//   const appliedFilter = { ...filter };
//   if (appliedFilter?.role === 'ALL') {
//     delete appliedFilter.role;
//   }
//   return appliedFilter;
// };

// const filtersParser = (filter) => {
//   const appliedFilter = { ...filter };
//   if (appliedFilter?.filters === 'ALL') {
//     delete appliedFilter.filters;
//   }
//   return appliedFilter;
// };
// const practitionerFilterParser = (filter) => {
//   const appliedFilter = { ...filter };
//   if (appliedFilter?.practitionerId === 'ALL') {
//     delete appliedFilter.practitionerId;
//   }
//   return appliedFilter;
// };
// const appointmentTypeFilterParser = (filter) => {
//   const appliedFilter = { ...filter };
//   if (appliedFilter?.typeCode === 'ALL') {
//     delete appliedFilter.typeCode;
//   }
//   return appliedFilter;
// };
// const claimStatusFilterParser = (filter) => {
//   const appliedFilter = { ...filter };
//   if (appliedFilter?.claimStatus === 'ALL') {
//     delete appliedFilter.claimStatus;
//   }
//   return appliedFilter;
// };
// const appointmenStatusFilterParser = (filter) => {
//   const appliedFilter = { ...filter };
//   if (appliedFilter?.statusCode === 'ALL') {
//     delete appliedFilter.statusCode;
//   }
//   return appliedFilter;
// };
// const statusFilterParser = (filter) => {
//   const appliedFilter = { ...filter };
//   if (appliedFilter?.status === 'ALL') {
//     delete appliedFilter.status;
//   }
//   return appliedFilter;
// };

// const globalCategoryFilterParser = (filter) => {
//   const appliedFilter = { ...filter };
//   if (appliedFilter?.globalCategoryTypeCode?.code) {
//     appliedFilter.globalCategoryTypeCode =
//       appliedFilter.globalCategoryTypeCode?.code;
//   } else {
//     delete appliedFilter.globalCategoryTypeCode;
//   }
//   return appliedFilter;
// };

// const staffFilterParser = (filter) => {
//   const appliedFilter = { ...filter };
//   if (appliedFilter?.roleCode?.code) {
//     appliedFilter.roleCode = appliedFilter.roleCode?.code;
//   } else {
//     delete appliedFilter.roleCode;
//   }
//   return appliedFilter;
// };

// const medicineFrequency = (frequency) => {
//   switch (frequency) {
//     case patientPrescriptionFrequency.DAILY:
//       return 'daily';
//     case patientPrescriptionFrequency.WEEKLY:
//       return 'once a week';
//     case patientPrescriptionFrequency.TWICE_WEEK:
//       return 'twice a week';
//     case patientPrescriptionFrequency.THRICE_WEEK:
//       return 'three times a week';
//     case patientPrescriptionFrequency.BI_WEEKLY:
//       return 'once in two week';
//     case patientPrescriptionFrequency.MONTHLY:
//       return 'once a month';
//     default:
//       return null;
//   }
// };

// const medicineDuration = (duration, durationValue) => {
//   switch (durationValue) {
//     case durationUnit.DAILY:
//       if (duration > 1) return `${duration} ${durationValue}`;
//       return `${duration} day`;
//     case durationUnit.WEEKLY:
//       if (duration > 1) return `${duration} ${durationValue}`;
//       return `${duration} week`;
//     case durationUnit.MONTHLY:
//       if (duration > 1) return `${duration} ${durationValue}`;
//       return `${duration} month`;
//     default:
//       return null;
//   }
// };

// const loadCollectJSScript = () =>
//   new Promise((resolve) => {
//     const head = document.querySelector('head');
//     const script = document.createElement('script');
//     script.setAttribute(
//       'src',
//       'https://secure.safewebservices.com/token/Collect.js'
//     );
//     script.setAttribute('data-tokenization-key', REACT_APP_COLLECTJS_API_KEY);
//     // script.setAttribute('data-validation-callback', errorValidationCallback);
//     script.setAttribute('data-placeholder-css', '{"color":"#9D9D9D"}');
//     script.setAttribute(
//       'data-invalid-css',
//       '{"background-color":"white","color":"red","border-color": "red"}'
//     );
//     script.setAttribute('data-field-ccnumber-enable-card-brand-previews', true);

//     script.onload = () => {
//       resolve(true);
//     };
//     script.onerror = () => {
//       resolve(false);
//     };
//     head.appendChild(script);
//   });
// const isValidNumber = (number) => {
//   const phoneUtil = PhoneNumberUtil.getInstance();
//   const contact = `+${number}`;
//   try {
//     const regionCode = phoneUtil.getRegionCodeForNumber(
//       phoneUtil.parseAndKeepRawInput(contact)
//     );
//     if (!regionCode || regionCode === null) {
//       return false;
//     }
//     const parsedNumber = phoneUtil.parse(number, regionCode);
//     const isValid = phoneUtil.isValidNumber(parsedNumber);
//     if (!isValid) {
//       return false;
//     }
//   } catch (err) {
//     return false;
//   }
//   return true;
// };

// const getFormValidations = (item = {}) => {
//   const validation = {};
//   if (item.inputType === 'date') {
//     if (item.disableFuture && item.minDate) {
//       validation.validateDate = (date) => {
//         if (date > getNewDate()) return "You can't select future date.";
//         if (date < item.minDate || date?.$d?.toString() === 'Invalid Date')
//           return 'Invalid date selected';
//         return true;
//       };
//     } else {
//       if (item.disableFuture) {
//         validation.validateDate = (date) =>
//           date > getNewDate() ? "You can't select future date." : true;
//       }
//       if (item.minDate) {
//         validation.validateDate = (date) => {
//           const selectedDate = new Date(date);
//           const minDate = new Date(item.minDate);

//           selectedDate.setHours(0, 0, 0, 0);
//           minDate.setHours(0, 0, 0, 0);

//           return selectedDate < minDate ? 'Invalid date' : true;
//         };
//       }
//     }
//   } else if (item.inputType === 'phoneInput') {
//     return {
//       validatePhoneNumber: (num) => {
//         if (!num || isValidNumber(num)) {
//           return true;
//         }
//         return 'Invalid Number';
//       },
//     };
//   } else if (
//     item?.required?.value &&
//     item.inputType === 'addressAutoComplete'
//   ) {
//     validation.hasDescription = (value) => {
//       return (
//         !!value?.description ||
//         `${item?.label || 'Address description'} is required`
//       );
//     };
//   }
//   return validation;
// };

// const onNotificationClick = {
//   appointmentDetail: (data, navigate, isPatient) => {
//     const { appointmentId } = data || {};
//     if (appointmentId) {
//       if (isPatient) {
//         navigate(UI_ROUTES.patientBooking);
//       } else {
//         navigate(UI_ROUTES.scheduling, {
//           replace: true,
//           state: {
//             appointmentId,
//             showModal: true,
//           },
//         });
//       }
//     }
//   },
//   medicationDetail: (data, navigate, isPatient) => {
//     const { medicationId } = data || {};
//     if (medicationId) {
//       navigate(
//         generatePath(
//           isPatient
//             ? UI_ROUTES.patientViewMedication
//             : UI_ROUTES.editPatientMedication,
//           {
//             medicationId: encrypt(String(medicationId)),
//           }
//         ),
//         { replace: true }
//       );
//     }
//   },
//   labRadiologyDetail: (data, navigate, isPatient) => {
//     const { labRadiologyId } = data || {};
//     if (labRadiologyId) {
//       navigate(
//         isPatient
//           ? UI_ROUTES.patientLabRadiologyData
//           : UI_ROUTES.editPatientMedication,
//         { replace: true }
//       );
//     }
//   },
//   messageDetail: (data, navigate, isPatient) => {
//     navigate(isPatient ? UI_ROUTES.patientMssages : UI_ROUTES.messages, {
//       replace: true,
//     });
//   },
//   zoomSession: (data) => {
//     if (data?.sessionId) {
//       const sessionUrl = generatePath(UI_ROUTES.zoomSession, {
//         sessionId: encrypt(String(data?.sessionId)),
//       });

//       // Open the URL in a new tab
//       window.open(sessionUrl, '_blank');
//     }
//   },
// };

// function formatRouteName(route) {
//   // Remove leading slash
//   let formattedName = route.startsWith('/') ? route.slice(1) : route;

//   // Replace hyphens with spaces
//   formattedName = formattedName.replace(/-/g, ' ');

//   // Capitalize each word
//   formattedName = formattedName
//     .split(' ')
//     .map((word) => {
//       return word.charAt(0).toUpperCase() + word.slice(1);
//     })
//     .join(' ');

//   return formattedName;
// }
// const getRouteName = (pathname) => {
//   if (pathname.includes('/patient/detail')) {
//     return formatRouteName(pathname.split('/')[4]);
//   }
//   if (pathname.includes('patient/add')) {
//     return formatRouteName(pathname.split('/')[3]);
//   }
//   return formatRouteName(pathname.split('/')[1]);
// };
// const getFullName = (data) => {
//   if (!data) return 'N/A';

//   const {
//     title,
//     otherTitle,
//     firstName = '',
//     lastName = '',
//     middleName = '',
//   } = data || {};

//   let fullName = '';

//   if (title && title.code === 'name_prefixes_other' && otherTitle) {
//     fullName = `${otherTitle} ${firstName} ${
//       middleName ? `${middleName} ` : ''
//     }${lastName}`;
//   } else if (title) {
//     fullName = `${title.name} ${firstName} ${
//       middleName ? `${middleName} ` : ''
//     }${lastName}`;
//   } else {
//     fullName = `${firstName} ${middleName ? `${middleName} ` : ''}${lastName}`;
//   }

//   return fullName.trim(); // Trim any extra spaces at the beginning or end
// };

// const getMedicineName = (data) => {
//   const {
//     genericDrug = {},
//     brandNameDrug = {},
//     doseForm = {},
//     amount,
//     unit = {},
//   } = data || {};
//   return `${genericDrug}(${brandNameDrug}) ${amount} ${unit?.name} ${doseForm?.name}`;
// };

// const getGender = (data = {}) => {
//   let displayText = '';

//   if (data?.genderIdentityCode) {
//     if (data.genderIdentityCode === 'another_gender_identity') {
//       displayText = data?.anotherGenderIdentity || data?.genderIdentity?.name;
//     } else {
//       displayText = data?.genderIdentity?.name;
//     }
//   } else {
//     displayText =
//       data?.sexAtBirthCode === 'gender_at_birth_other'
//         ? data?.otherSexAtBirth || data?.sexAtBirth?.name
//         : data?.sexAtBirth?.name;
//   }

//   return displayText || 'N/A';
// };
// const getInsurance = (array) => {
//   const insurance = array?.find((item) => item?.insuranceType === '1');
//   return insurance?.insuranceCompanyName;
// };

// const getCurrentMeridien = (date = new Date()) => {
//   const now = dayjs(date);
//   const hour = now.format('hh'); // 12-hour format
//   const minute = now.format('mm');
//   const meridien = now.format('A'); // AM or PM
//   return { now, hour, minute, meridien };
// };

// const getDateTimeString = ({
//   hour,
//   minute,
//   meridien,
//   date = new Date(),
// } = {}) => {
//   const datetimeString = `${dateFormatterDayjs(
//     date,
//     dateFormats.MMDDYYYY
//   )} ${hour}:${minute} ${meridien}`;
//   const datetime = moment(datetimeString, 'MM/DD/YYYY hh:mm A');
//   return datetime;
// };
// const formatPatientNames = (patients) => {
//   if (patients && Array.isArray(patients)) {
//     return patients.map((patient) => getFullName(patient)).join(', ');
//   }
//   return '';
// };

// const getAge = (dob) => {
//   return getDateDiff(dob, new Date(), { unit: 'years' });
// };

// const isEqualById = (arr1, arr2) => {
//   const ids1 = map(arr1, 'id');
//   const ids2 = map(arr2, 'id');

//   return isEqual(sortBy(ids1), sortBy(ids2));
// };

// const formatAppointmentSchedules = (scheduleArray = [], practionerTimeZone) => {
//   if (scheduleArray?.length === 0) return {};
//   const shortScheduleArray = sortSchedulesByStartDateTime(scheduleArray);
//   const firstStartDate = convertWithTimezone(
//     shortScheduleArray[0]?.startDateTime,
//     {
//       timezone: practionerTimeZone,
//     }
//   );
//   const totalDays = scheduleArray.length;

//   const schedules = scheduleArray.flatMap((item) => {
//     const startDate = convertWithTimezone(item.startDateTime, {
//       timezone: practionerTimeZone,
//       requiredPlain: true,
//     });
//     const endDate = convertWithTimezone(item.endDateTime, {
//       timezone: practionerTimeZone,
//       requiredPlain: true,
//     });

//     const startDayOfWeek = startDate.format('dddd').toLowerCase();
//     const endDayOfWeek = endDate.format('dddd').toLowerCase();

//     const startHrs = startDate.format('HH:mm');
//     const endHrs = endDate.format('HH:mm');

//     // If the schedule crosses into the next day
//     if (startDayOfWeek !== endDayOfWeek) {
//       const endOfFirstDay = startDate.clone().endOf('day'); // End of the start day
//       const startOfNextDay = endDate.clone().startOf('day'); // Beginning of the next day

//       return [
//         {
//           day: startDayOfWeek,
//           startHrs: startHrs,
//           endHrs: endOfFirstDay.format('HH:mm'),
//           isClosed: false,
//           date: endDate,
//           endDateTime: item.endDateTime,
//           startDateTime: item.startDateTime,
//           existingPatient: item?.existingPatient,
//         },
//         {
//           day: endDayOfWeek,
//           startHrs: startOfNextDay.format('HH:mm'),
//           endHrs: endHrs,
//           isClosed: false,
//           date: endDate,
//           endDateTime: item.endDateTime,
//           startDateTime: item.startDateTime,
//           existingPatient: item?.existingPatient,
//         },
//       ];
//     } else {
//       // If the schedule stays within the same day
//       return {
//         day: startDayOfWeek,
//         startHrs: startHrs,
//         endHrs: endHrs,
//         isClosed: false,
//         date: startDate,
//         endDateTime: item.endDateTime,
//         startDateTime: item.startDateTime,
//         existingPatient: item?.existingPatient,
//       };
//     }
//   });

//   return {
//     firstStartDate: firstStartDate,
//     totalDays: totalDays,
//     schedules: schedules,
//   };
// };

// const convertToUtc = (
//   date,
//   { timezone, format = 'YYYY-MM-DDTHH:mm:ssZ' } = {}
// ) => {
//   timezone = timezone || getUserTimezone();
//   return moment.tz(date, format, timezone).utc();
// };

// const validateZoomSessionToken = (sessionToken) => {
//   const decodedToken = jwtDecode(sessionToken);

//   // Extract issued at (iat) and expiration (exp) times from token
//   const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

//   if (decodedToken.exp && decodedToken.exp < currentTime) {
//     return false;
//   }

//   if (decodedToken.iat && decodedToken.iat > currentTime) {
//     return false;
//   }

//   return true;
// };
// const sortSchedulesByStartDateTime = (scheduleArray = []) => {
//   return scheduleArray.sort(
//     (a, b) => new Date(a.startDateTime) - new Date(b.startDateTime)
//   );
// };
// const timeToMinutes = (hour, minute, meridien) =>
//   (parseInt(hour, 10) % 12) * 60 +
//   parseInt(minute, 10) +
//   (meridien === 'PM' ? 720 : 0);

// const canculateEmarTimePeriod = (actionCode, date, slotDate) => {
//   const MINUTES_TO_MS = 60 * 1000;
//   const TIME_WINDOW = 30;
//   const timeDifference = (new Date(date) - new Date(slotDate)) / MINUTES_TO_MS;
//   let timePeriod = null;
//   if (actionCode === 'taken') {
//     if (Math.abs(timeDifference) <= TIME_WINDOW) {
//       timePeriod = 'On Time';
//     } else if (timeDifference > TIME_WINDOW) {
//       timePeriod = 'Delayed';
//     } else {
//       timePeriod = 'Before Time';
//     }
//   }
//   return timePeriod;
// };
// const formatPhoneNumber = (phoneNumber) => {
//   if (!phoneNumber) return '';

//   const formattedInput = phoneNumber.startsWith('+')
//     ? phoneNumber
//     : `+${phoneNumber}`;

//   const parsedNumber = parsePhoneNumberFromString(formattedInput);

//   if (!parsedNumber) return phoneNumber; // Return original if parsing fails

//   if (parsedNumber.country === 'IN') {
//     const nationalNumber = parsedNumber.nationalNumber.slice(-10); // Ensure last 10 digits
//     return `91 ${nationalNumber.substring(0, 5)}-${nationalNumber.substring(
//       5
//     )}`;
//   }

//   // Default national format for other countries
//   return `${parsedNumber.countryCallingCode} ${parsedNumber.formatNational()}`;
// };
// const formatDuration = (seconds) => {
//   const hrs = Math.floor(seconds / 3600);
//   const mins = Math.floor((seconds % 3600) / 60);
//   const secs = seconds % 60;

//   const formattedHrs = hrs > 0 ? String(hrs).padStart(2, '0') + ':' : '';
//   const formattedMins = String(mins).padStart(2, '0');
//   const formattedSecs = String(secs).padStart(2, '0');

//   return `${formattedHrs}${formattedMins}:${formattedSecs}`;
// };

// const calculateCSATPercentage = (callRecordings, maxRating = 5) => {
//   const ratings = callRecordings
//     ?.map((call) => call?.csatForm?.rating)
//     ?.filter((rating) => typeof rating === 'number');

//   if (ratings?.length === 0) return 0;

//   const totalRating = ratings?.reduce((sum, rating) => sum + rating, 0);
//   const csatPercentage = (totalRating / (ratings?.length * maxRating)) * 100;

//   return Math.round(csatPercentage); // return as whole number percentage
// };

// const getCSATDrillPercentage = (agents) => {
//   if (!Array.isArray(agents)) {
//     console.warn('Expected an array but got:', agents);
//     return 0;
//   }

//   const allCalls = agents.map((agent) => agent.calls || []);
//   const ratings = allCalls
//     .map((call) => {
//       const r = call[0]?.csatRating;
//       const n = Number(r);
//       return isNaN(n) ? null : n;
//     })
//     .filter((rating) => rating !== null);
//   if (ratings.length === 0) return 0;

//   const totalRating = ratings.reduce((sum, rating) => sum + rating, 0);
//   const maxRating = 5;

//   const csatPercentage = (totalRating / (ratings.length * maxRating)) * 100;
//   return Math.round(csatPercentage);
// };

// const calculateTotalCSATRating = (callRecordings) => {
//   const ratings = callRecordings
//     ?.map((call) => call?.csatForm?.rating)
//     ?.filter((rating) => typeof rating === 'number');

//   if (ratings?.length === 0) return 0;

//   const totalRating = ratings?.reduce((sum, rating) => sum + rating, 0);
//   return totalRating; // return the sum of ratings
// };
// const convertSecondsToHours = (seconds) => {
//   if (!seconds || isNaN(seconds)) return '0.00';
//   const hours = seconds / 3600;
//   return hours?.toFixed(2); // Returns as string like "1.50"
// };

// const formatSeconds = (seconds) => {
//   const h = Math?.floor(seconds / 3600);
//   const m = Math?.floor((seconds % 3600) / 60);
//   const s = Math?.floor(seconds % 60);
//   return `${h}h ${m}m ${s}s`;
// };

// const calculateAverageHandleTime = (record) => {
//   const totalDuration = Number(record?.totalDuration ?? 0);
//   const totalCalls = Number(record?.totalCalls ?? 0);

//   if (totalCalls === 0) return '0h 0m 0s';

//   const averageSeconds = totalDuration / totalCalls;
//   return formatSeconds(averageSeconds);
// };
// const calculateSatisfactionMetrics = (callRecordings) => {
//   const totalCalls = callRecordings?.length;

//   if (totalCalls === 0 || !totalCalls) {
//     return {
//       satisfactionMeter: 0,
//       disatisfactionMeter: 0,
//     };
//   }

//   let satisfiedCalls = 0;
//   let dissatisfiedCalls = 0;

//   callRecordings?.forEach((call) => {
//     const rating = call?.csatForm?.rating; // Optional chaining for safer access

//     if (rating !== undefined && rating !== null) {
//       // Check for both undefined and null
//       if (rating > 2) {
//         satisfiedCalls++;
//       } else if (rating < 3) {
//         dissatisfiedCalls++;
//       }
//     }
//   });

//   const satisfactionMeter = (satisfiedCalls / totalCalls) * 100;
//   const dissatisfactionMeter = (dissatisfiedCalls / totalCalls) * 100;

//   return {
//     satisfactionMeter: parseFloat(satisfactionMeter.toFixed(2)),
//     disatisfactionMeter: parseFloat(dissatisfactionMeter.toFixed(2)),
//   };
// };
// const calculateGraphCSATPercentage = (ratings, maxRating = 5) => {
//   const validRatings = ratings
//     ?.map((r) => r?.rating)
//     .filter((r) => typeof r === 'number');
//   if (!validRatings?.length) return 0;

//   const total = validRatings.reduce((sum, r) => sum + r, 0);
//   return Math.round((total / (validRatings?.length * maxRating)) * 100);
// };

// const calculateGraphDashboardPercentage = (rating, maxRating = 5) => {
//   const ratingsArray = Array.isArray(rating)
//     ? rating
//     : rating != null
//     ? [rating]
//     : [];

//   const validRatings = ratingsArray
//     .map((r) => r?.rating ?? r)
//     .filter((r) => typeof r === 'number');

//   if (!validRatings?.length) return 0;

//   const total = validRatings.reduce((sum, r) => sum + r, 0);

//   return Math.round((total / (validRatings.length * maxRating)) * 100);
// };

// const generateChartData = (callData = []) => {
//   const labels =
//     callData
//       ?.map((item) =>
//         convertWithTimezone(item.date, {
//           format: dateFormats.MMDDYYYY,
//         })
//       )
//       .reverse() || [];

//   const csatData =
//     callData
//       ?.map((item) => calculateGraphCSATPercentage(item?.ratings || []))
//       .reverse() || [];

//   const ratingsCountData =
//     callData?.map((item) => item?.ratings?.length || 0).reverse() || [];

//   return {
//     labels,
//     csatData,
//     ratingsCountData,
//   };
// };

// const generateCsatSevenDaysData = (callData = []) => {
//   const rawDates = callData?.map((item) => item.date).reverse() || [];
//   const labels =
//     callData
//       ?.map((item) =>
//         convertWithTimezone(item.date, {
//           format: dateFormats.MMDDYYYY,
//         })
//       )
//       .reverse() || [];

//   const csatData =
//     callData
//       ?.map((item) => calculateGraphDashboardPercentage(item?.ratings || []))
//       .reverse() || [];

//   return {
//     labels,
//     csatData,
//     rawDates,
//   };
// };

// const generateCsatSevenDaysdrillData = (callData = []) => {
//   const labels =
//     callData
//       ?.map((item) =>
//         convertWithTimezone(item.date, {
//           format: dateFormats.MMDDYYYY,
//         })
//       )
//       .reverse() || [];

//   const drillData =
//     callData
//       ?.map((item) => calculateGraphDashboardPercentage(item?.ratings || []))
//       .reverse() || [];

//   return {
//     labels,
//     drillData,
//   };
// };

// const calculateCSATCompare = (data, maxRating = 5) => {
//   const calculatePercentage = (ratings) => {
//     const valid = ratings?.filter((r) => typeof r?.rating === 'number');
//     const total = valid?.reduce((sum, r) => sum + r?.rating, 0);
//     return valid?.length
//       ? Math.round((total / (valid.length * maxRating)) * 100)
//       : 0;
//   };

//   const currentPercentage = calculatePercentage(data?.currentMonth);
//   const previousPercentage = calculatePercentage(data?.previousMonth);
//   const difference = currentPercentage - previousPercentage;

//   let trend = 'no change';
//   let trendLabel = `- 0% vs. previous month`;

//   if (difference > 0) {
//     trend = 'increase';
//     trendLabel = `↑ ${difference}% vs. previous month`;
//   } else if (difference < 0) {
//     trend = 'decrease';
//     trendLabel = `↓ ${Math.abs(difference)}% vs. previous month`;
//   }

//   return {
//     currentPercentage,
//     previousPercentage,
//     difference,
//     trend,
//     trendLabel,
//   };
// };
// const getTrendColor = (trend) => {
//   switch (trend) {
//     case 'increase':
//       return '#3fa91f'; // green
//     case 'decrease':
//       return '#d7571b'; // red
//     default:
//       return '#e8bf59'; // orange
//   }
// };

// const calcAiQaScore = (data) => {
//   const totalRecords = data?.length;
//   let overallQaScoreSum = 0;
//   const criteriaTotals = {};
//   const criteriaYesCounts = {};

//   data?.forEach((score) => {
//     // Helper to parse and process criteria
//     const processCriteria = (criteriaObj) => {
//       if (typeof criteriaObj === 'string') {
//         try {
//           criteriaObj = JSON.parse(criteriaObj);
//         } catch (e) {
//           criteriaObj = {};
//         }
//       }
//       if (criteriaObj && typeof criteriaObj === 'object') {
//         Object.entries(criteriaObj).forEach(([key, val]) => {
//           if (!criteriaTotals[key]) criteriaTotals[key] = 0;
//           if (!criteriaYesCounts[key]) criteriaYesCounts[key] = 0;
//           criteriaTotals[key] += 1;
//           if (val === 'yes') criteriaYesCounts[key] += 1;
//         });
//       }
//     };

//     processCriteria(score?.openingQualityCriteria);
//     processCriteria(score?.closingQualityCriteria);

//     const openingScore =
//       typeof score.openingQuality === 'number' ? score.openingQuality : 0;
//     const closingScore =
//       typeof score.closingQuality === 'number' ? score.closingQuality : 0;

//     const recordQaScore = (openingScore + closingScore) / 2;
//     overallQaScoreSum += recordQaScore;
//   });

//   const overallQaScore =
//     totalRecords > 0
//       ? Number((overallQaScoreSum / totalRecords).toFixed(2))
//       : 0;

//   return overallQaScore;
// };

// const calcAiQaScoreSingle = (score) => {
//   if (!score || typeof score !== 'object') return null;

//   let overallQaScoreSum = 0;
//   const criteriaTotals = {};
//   const criteriaYesCounts = {};

//   // Helper to parse and process criteria
//   const processCriteria = (criteriaObj) => {
//     if (typeof criteriaObj === 'string') {
//       try {
//         criteriaObj = JSON.parse(criteriaObj);
//       } catch (e) {
//         criteriaObj = {};
//       }
//     }
//     if (criteriaObj && typeof criteriaObj === 'object') {
//       Object.entries(criteriaObj).forEach(([key, val]) => {
//         if (!criteriaTotals[key]) criteriaTotals[key] = 0;
//         if (!criteriaYesCounts[key]) criteriaYesCounts[key] = 0;
//         criteriaTotals[key] += 1;
//         if (val === 'yes') criteriaYesCounts[key] += 1;
//       });
//     }
//   };

//   processCriteria(score.openingQualityCriteria);
//   processCriteria(score.closingQualityCriteria);

//   const openingScore =
//     typeof score.openingQuality === 'number' ? score.openingQuality : 0;
//   const closingScore =
//     typeof score.closingQuality === 'number' ? score.closingQuality : 0;

//   const recordQaScore = (openingScore + closingScore) / 2;
//   overallQaScoreSum += recordQaScore;

//   return Number(overallQaScoreSum.toFixed(2));
// };

// const useImprovedAgentFilters = (onChange) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [timeFilter, setTimeFilter] = useState('day');

//   useEffect(() => {
//     const updatedFilters = {
//       period: timeFilter,
//       search: searchQuery,
//     };
//     if (onChange) {
//       onChange(updatedFilters);
//     }
//   }, [timeFilter, searchQuery, onChange]);

//   return {
//     searchQuery,
//     setSearchQuery,
//     timeFilter,
//     setTimeFilter,
//   };
// };

// const qaCriteria = {
//   openingQuality: {
//     timelyOpening: [
//       'thank you for calling',
//       'good morning',
//       'good afternoon',
//       'good evening',
//       'welcome to',
//       'thanks for calling',
//       'thanks for reaching out',
//     ],
//     greeting: ['hello', 'hi', 'hey', 'greetings', 'good to connect with you'],
//     brandMention: [
//       'world discovery pacific',
//       'this is world discovery',
//       "you've reached world discovery pacific",
//     ],
//     advisorIntro: [
//       'my name is',
//       'this is',
//       "you're speaking with",
//       "i'm",
//       'i am',
//       'talking to',
//     ],
//     properOpening: [
//       'thank you for calling',
//       'welcome to',
//       "you've reached",
//       'appreciate you calling',
//     ],
//     nameEnquiry: [
//       'may I have your name',
//       'who am I speaking with',
//       'can I know your name',
//       "may I know who I'm talking to",
//       'could you please tell me your name',
//     ],
//     offerAssistance: [
//       'how can I help',
//       'how may I assist',
//       'what can I do for you',
//       'is there anything I can help with',
//     ],
//     numberConfirmation: [
//       'can I have your number',
//       'account number',
//       'please confirm your number',
//       'can you provide your contact details',
//       'could you verify your number',
//     ],
//     agentAcknowledgement: [
//       'I understand',
//       'got it',
//       'noted',
//       'okay',
//       'sure',
//       'absolutely',
//       'certainly',
//     ],
//     empathyStatements: [
//       'I understand how you feel',
//       'sorry to hear that',
//       'I apologize for the inconvenience',
//       'that must be frustrating',
//       'let me help you with that',
//     ],
//   },
//   closingQuality: {
//     gratitude: [
//       'thank you',
//       'thanks for calling',
//       'we appreciate your time',
//       'thanks for reaching out',
//       'thank you for your patience',
//     ],
//     brandMention: [
//       'world discovery pacific',
//       'thank you for choosing world discovery',
//       'we appreciate your business at world discovery pacific',
//     ],
//     askForFeedback: [
//       'how was your experience',
//       'can I get your feedback',
//       'please rate this call',
//       'your feedback matters',
//       'how did I do today',
//     ],
//     properClosing: [
//       'have a great day',
//       'goodbye',
//       'take care',
//       'see you next time',
//       'talk to you soon',
//     ],
//     furtherAssistance: [
//       'anything else I can help with',
//       'any other questions',
//       'need further assistance',
//       'is there anything more I can do for you',
//     ],
//     pauseAfterAssistance: [
//       'hold on',
//       'just a moment',
//       'give me a second',
//       'let me check that for you',
//       'one moment please',
//     ],
//     recapResolution: [
//       'just to summarize',
//       'we have resolved your issue by',
//       'to recap',
//       'your request has been processed',
//       "we've completed the steps",
//     ],
//     futureSupportMention: [
//       'feel free to call us again',
//       "we're here 24/7",
//       'contact us anytime',
//       'you can reach out if needed',
//     ],
//   },
// };

// const manualQaCriteria = {
//   greetingAndCallOpening: ['greeting', 'verification'],
//   understandingAndEmpathy: ['empathy', 'understanding'],
//   processAdherenceAndAccuracy: ['accuracy', 'process'],
//   communicationSkills: ['communication', 'language'],
//   callClosureQuality: ['callClosure', 'callClosurePolite'],
//   complianceAndPolicy: ['compliancePolicies'],
//   holdAndDeadAir: ['holdTime', 'deadAir'],
//   callQuality: ['overallQuality'],
// };

// const formatKey = (str) => {
//   if (!str) return '';
//   return str
//     .replace(/([A-Z])/g, ' $1') // Insert space before capital letters
//     .replace(/\s+/g, ' ') // Replace multiple spaces with single space
//     .trim() // Remove leading/trailing spaces
//     .replace(/\b\w/g, (c) => c.toUpperCase()); // Capitalize each word
// };

// const compareValues = (achievedValue, standardValue) => {
//   const calculatedValue = achievedValue || 0;
//   const formattedValue = parseFloat(calculatedValue).toFixed(2);

//   if (calculatedValue > standardValue) {
//     return {
//       value: `↑${formattedValue}`,
//       color: 'green', // you can customize this color as needed
//     };
//   } else if (calculatedValue < standardValue) {
//     return {
//       value: `↓${formattedValue}`,
//       color: 'red', // you can customize this color as needed
//     };
//   } else {
//     return {
//       value: `${formattedValue}`,
//       color: 'orange', // or 'black' for neutral
//     };
//   }
// };
// const getAvgQaManualScore = (data) => {
//   if (!Array.isArray(data) || data.length === 0) {
//     return 0; // or return null if you prefer
//   }

//   const total = data.reduce((sum, item) => {
//     const score = parseFloat(item?.totalScore);
//     return !isNaN(score) ? sum + score : sum;
//   }, 0);

//   const validScoresCount = data.filter(
//     (item) => !isNaN(parseFloat(item?.totalScore))
//   ).length;

//   return validScoresCount > 0
//     ? parseFloat((total / validScoresCount).toFixed(2))
//     : 0;
// };

// const calculateAgentProductivity = (activeDurations) => {
//   const loginSeconds = 28800;
//   if (!Array.isArray(activeDurations) || activeDurations.length === 0) return 0;

//   const totalActiveSeconds = activeDurations.reduce((sum, item) => {
//     const duration = Number(item.duration);
//     return sum + (isNaN(duration) ? 0 : duration);
//   }, 0);

//   const productivity = (totalActiveSeconds / loginSeconds) * 100;
//   return Number(productivity.toFixed(2));
// };

// const formatCriteriaLabel = (str) => {
//   return str
//     .replace(/_/g, ' ') // Replace underscores with spaces
//     .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
// };

// export {
//   compareValues,
//   bytesToMB,
//   calculateBMI,
//   calculateIdealWeight,
//   closeDrawer,
//   cmToFeetInches,
//   combinedDateTime,
//   convertWithTimezone,
//   copyWidgetLink,
//   dateFormatter,
//   dateFormatterDayjs,
//   decodeHtml,
//   downloadFile,
//   downloadPdf,
//   feetInchesToCM,
//   formatPatientNames,
//   generateTimeSlots,
//   generateUniqueId,
//   getCurrentMeridien,
//   getDateDiff,
//   getDirtyFieldsValue,
//   getEndOfTheDate,
//   getFileType,
//   getFormValidations,
//   getFormattedAddress,
//   getFormattedAddressNew,
//   getFullName,
//   getGender,
//   getGendersForm,
//   getImageUrl,
//   getInsurance,
//   getNewDate,
//   getRouteName,
//   getScheduleForTheDay,
//   getShipAndPayeeForm,
//   getStartCase,
//   getStartOfTheDate,
//   getTimezoneAbbreviation,
//   getUpdatedFieldsValue,
//   getUpdatedFieldsValues,
//   getUserRole,
//   getUserTimezone,
//   getZplToPdfUrl,
//   horizontalScale,
//   lineHeightScale,
//   loadCollectJSScript,
//   medicineDuration,
//   medicineFrequency,
//   mlToLtr,
//   onNotificationClick,
//   openDrawer,
//   passwordValidation,
//   patientFilterParser,
//   scale,
//   setUserRole,
//   setUserTimezone,
//   showConfirmDialog,
//   showSnackbar,
//   time12hr,
//   to24Hours,
//   triggerEvents,
//   updateFormFields,
//   uploadImage,
//   verticalScale,
//   isEqualById,
//   getDateTimeString,
//   globalCategoryFilterParser,
//   staffFilterParser,
//   roleFilterParser,
//   formatDateWithToday,
//   getAge,
//   formatAppointmentSchedules,
//   convertToUtc,
//   sortSchedulesByStartDateTime,
//   getMedicineName,
//   validateZoomSessionToken,
//   getUTCDateTime,
//   staffNameFilterParser,
//   statusFilterParser,
//   practitionerFilterParser,
//   timeToMinutes,
//   canculateEmarTimePeriod,
//   encounterTypeFilterParser,
//   appointmentTypeFilterParser,
//   appointmenStatusFilterParser,
//   formatPhoneNumber,
//   claimStatusFilterParser,
//   claimPractitionerFilterParser,
//   claimReportStatusFilterParser,
//   assignedToIdFilterParser,
//   procedureCodeFilterParser,
//   dateRangeFilterParser,
//   invoicePractitionerFilterParser,
//   practiceLocationFilterParser,
//   formatDuration,
//   calculateCSATPercentage,
//   calculateTotalCSATRating,
//   convertSecondsToHours,
//   calculateAverageHandleTime,
//   calculateSatisfactionMetrics,
//   generateChartData,
//   calculateCSATCompare,
//   getTrendColor,
//   filtersParser,
//   calcAiQaScore,
//   generateCsatSevenDaysData,
//   useImprovedAgentFilters,
//   calcAiQaScoreSingle,
//   qaCriteria,
//   formatKey,
//   manualQaCriteria,
//   generateCsatSevenDaysdrillData,
//   getCSATDrillPercentage,
//   getAvgQaManualScore,
//   calculateAgentProductivity,
//   formatCriteriaLabel,
// };
