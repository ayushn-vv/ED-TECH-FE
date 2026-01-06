/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */

import { dateFormats, medicineStatus, roleTypes } from '../lib/constants.jsx';
import { calculateIdealWeight, convertWithTimezone } from '../lib/utils.jsx';

function formDataParser(data) {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key])) {
      data[key].forEach((value, index) => {
        if (value) {
          if (value.uid) {
            formData.append(key, value, value.name);
          } else {
            formData.append(`${key}[${index}]`, value);
          }
        }
      });
    } else {
      formData.append(key, data[key]);
    }
  });
  return formData;
}
const processItem = (item) => {
  if (item?.patient?.weight && item?.patient?.weightUnit) {
    item.patient.weightAndWeightUnit = `${item?.patient?.weight} ${item?.patient?.weightUnit}`;
  }
  if (item?.patient?.gender && item?.patient?.height) {
    item.patient.idealWeight = calculateIdealWeight(
      item.patient.height,
      item.patient.gender
    );
  }
  if (item.items.length >= 1) {
    item.items = item.items.map((value) => {
      if (!value?.medicineStatus) {
        value.medicineStatus = medicineStatus.NEW;
      }
      return value;
    });
  }
  return item;
};

const processResult = (result) => {
  if (result?.patient?.weight && result?.patient?.weightUnit) {
    result.patient.weightAndWeightUnit = `${result?.patient?.weight} ${result?.patient?.weightUnit}`;
  }
  if (
    result?.patient?.gender &&
    result?.patient?.height !== 'NaN' &&
    result?.patient?.height
  ) {
    result.patient.idealWeight = calculateIdealWeight(
      result.patient.height,
      result.patient.gender
    );
  }
  if (result.items.length >= 1) {
    result.items = result.items.map((value) => {
      if (!value?.medicineStatus) {
        value.medicineStatus = medicineStatus.NEW;
      }
      return value;
    });
  }
  return result;
};

export const responseModifierEPrescription = (data) => {
  let result = data.results || data;
  if (Array.isArray(result)) {
    result = result.map(processItem);
  } else {
    result = processResult(result);
  }
  if (data.results) {
    data.results = result;
  } else {
    data = result;
  }
  return data;
};
export const responseModifierAgentsPerformance = (data) => {

  const grouped = {};

  data.forEach((record) => {
    const dateKey = new Date(record.date).toISOString(); // keep full datetime

    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }

    if (record.csatForm && record.csatForm.rating != null) {
      grouped[dateKey].push({ rating: record.csatForm.rating,
        customer: record.customer || record.agentName || 'Unknown',
        status: record.status || record.status || 'N/A'
       });
    }
  });

  const result = Object.entries(grouped).map(([date, ratings]) => ({
    date,
    ratings,
  }));

  return result;
};

export const responseModifierAppointments = (data) => {
  let result = data.results || data;
  if (Array.isArray(result)) {
    result = result.map((item) => {
      item.appointmentStart =
        item.startDateTime ||
        convertWithTimezone(item.startDateTime, {
          format: dateFormats.YYYYMMDDHHMMSS,
        });
      item.appointmentTime = convertWithTimezone(item.startDateTime, {
        format: 'hh:mm A',
      });
      item.appointmentEndTime = convertWithTimezone(item.endDateTime, {
        format: 'hh:mm A',
      });
      return item;
    });
  } else {
    result.appointmentStart = convertWithTimezone(result.appointmentDate, {
      format: dateFormats.YYYYMMDD,
    });
    result.appointmentTime = convertWithTimezone(result.appointmentTime, {
      format: 'HH:mm',
    });
  }
  if (data.results) {
    data.results = result;
  } else {
    data = result;
  }
  return data;
};
export const responseModifierAbusiveChartData = (data) => {
  const grouped = {};

  data.forEach(entry => {
    const summary = entry.contentSafety?.summary;

    // Skip entries with no summary or empty summary object
    if (!summary || Object.keys(summary).length === 0) return;

    const date = new Date(entry.date).toISOString(); // keep full datetime

    if (!grouped[date]) {
      grouped[date] = { count: 0 };
    }

    grouped[date].count += 1;

    for (const key in summary) {
      if (!grouped[date][key]) grouped[date][key] = 0;
      grouped[date][key] += summary[key]; // sum the values
    }
  });

  // Convert to chart data: average and round to 2 decimal places
  const chartData = Object.entries(grouped).map(([date, values]) => {
    const { count, ...sums } = values;
    const averaged = Object.fromEntries(
      Object.entries(sums).map(([key, total]) => [key, +(total / count * 100).toFixed(2)])
    );
    return { date, ...averaged };
  });

  return chartData;
};


export const responseModifierCalendarSchedule = (data) => {
  let result = data.results || data;
  if (Array.isArray(result)) {
    result = result.map((item) => {
      item.calendarScheduleStart = item.startDateTime;
      item.calendarScheduleTime = convertWithTimezone(item.startDateTime, {
        format: 'hh:mm A',
      });
      item.calendarScheduleEndTime = item.endDateTime;
      return item;
    });
  }
  if (data.results) {
    data.results = result;
  } else {
    data = result;
  }
  return data;
};

export const responseModifierRoles = (data) => {
  let result = data.results || data;
  if (Array.isArray(result)) {
    result = result.filter((item) => item.code !== roleTypes.patient);
  } else {
    result = {};
  }
  if (data.results) {
    data.results = result;
  } else {
    data = result;
  }
  return data;
};

export default formDataParser;
