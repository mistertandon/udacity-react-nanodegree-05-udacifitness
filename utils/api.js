import { AsyncStorage } from 'react-native'
import { CALENDAR_STORAGE_KEY, formatCalendarResults } from './_calendar'

/**
 * @description This function is used to get calender results
 *
 * @param
 */
export function fetchCalenderResults() {

  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
    .then(formatCalendarResults)
}

/**
 * @description This function is used to add/update entry
 * in AsyncStorage.
 *
 * @param {String} entry
 * @param {String} key
 * @returns none
 */
export function submitEntry({ entry, key }) {

  return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({ [key]: entry }));
}

/**
 * @description Thi function is used to remove existing key
 * from AsyncStorage.
 *
 * @param {key} String
 * @returns none
 */
export function removeEntry({ key }) {

  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
    .then((result) => {

      var data = JSON.parse(result);
      data[key] = undefined;
      delete data[key];

      AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
    })
}