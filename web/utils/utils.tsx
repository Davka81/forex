export const parseExcelDate = (str: string) => {
  // Remove BOM, zero-width, NBSP, extra spaces
  str = str.replace(/[\u200B-\u200D\uFEFF\u00A0]/g, "").trim();

  const [date, time] = str.split(" ");
  const [dd, mm, yyyy] = date.split("/");

  return new Date(`${yyyy}-${mm}-${dd}T${time}:00`);
}

// export const generateKey = () => {
//   return new Date().getTime();
// }

// export const getFormValues = (value: string | null) => {
//   if (value === undefined) return null;

//   if (value === null) return value;

//   return value.trim().length === 0 ? null : value.trim();
// }

// export const toDateformat = (date: string, separator = '') => {
//   let newDate = new Date(date);
//   let year = newDate.getFullYear()
//   let month = newDate.getMonth() + 1
//   let day = newDate.getDate();

//   return `${year}${separator}${(`00${month}`).slice(-2)}${separator}${(`00${day}`).slice(-2)}`
// }

// export const toDateTimeformat = (date: string, separator = '') => {
//   let newDate = new Date(date);
//   const timezoneOffset = newDate.getTimezoneOffset();

//   let year = newDate.getFullYear();
//   let month = newDate.getMonth() + 1;
//   let day = newDate.getDate();
//   let hour = newDate.getHours();
//   let minute = newDate.getMinutes();
//   let second = newDate.getSeconds();

//   return `${year}${separator}${(`00${month}`).slice(-2)}${separator}${(`00${day}`).slice(-2)} ${(`00${hour}`).slice(-2)}:${(`00${minute}`).slice(-2)}:${(`00${second}`).slice(-2)}`
// }

// export const isNumeric = (value: string) => {
//   return /^-?\d+$/.test(value);
// }

export const getFirstCharacter = (str: string) => {
  return str.substring(0, 1);
}

// export const removeFirstCharacter = (str: string) => {
//   return str.slice(1);
// }

// export const capitalizeFirstLetter = (str: string) => {
//   if (!str) return "";
//   return str.charAt(0).toUpperCase() + str.slice(1);
// }

// export const generateTitle = (str: string) => {
//   if (!str) return " ";
//   const strs = str.split("-");
//   return strs.map(word => capitalizeFirstLetter(word)).join(" ");
// }

// export const validateEnglishOnly = (_: any, value: string) => {
//   if (!value || /^[a-z0-9-]+$/.test(value)) {
//     return Promise.resolve();
//   }
//   return Promise.reject(new Error('Only English letters (A-Z, a-z) are allowed'));
// }