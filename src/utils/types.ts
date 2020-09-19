export interface KeyValue<T> {
  [key: string]: T;
}

export interface Page {
  count: number;
  pageNo: number;
  pageSize: number;
  list: any[];
}

export interface SelectOption {
  op?: string;
  orderBy?: string;
  limit?: number[];
}
