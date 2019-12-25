import * as _ from "lodash";
import { KeyValue } from "./types";

export function camelCase(data: any): any {
  if (_.isArray(data)) {
    return data.map(item => {
      const parsedItem: KeyValue<string> = {};
      Object.keys(item).forEach(key => {
        parsedItem[_.camelCase(key)] = item[key];
      });
      return parsedItem;
    });
  } else {
    const parsedData: KeyValue<string> = {};
    Object.keys(data).forEach(key => {
      parsedData[_.camelCase(key)] = data[key];
    });
    return parsedData;
  }
}

export function snakeCase(data: any): any {
  if (_.isArray(data)) {
    return data.map(item => {
      const parsedItem: KeyValue<string> = {};
      Object.keys(item).forEach(key => {
        parsedItem[_.snakeCase(key)] = item[key];
      });
      return parsedItem;
    });
  } else {
    const parsedData: KeyValue<string> = {};
    Object.keys(data).forEach(key => {
      parsedData[_.snakeCase(key)] = data[key];
    });
    return parsedData;
  }
}
