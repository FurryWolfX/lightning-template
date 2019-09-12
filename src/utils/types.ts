export type KeyValue<T> = {
  [key: string]: T;
};

export type LRequest = {
  params: KeyValue<string>;
  query: KeyValue<string>;
  body: KeyValue<any>;
};

export type LResponse = {
  send: (param: any) => void;
  json: (param: any) => void;
  redirect: (url: any) => void;
};

export type Page = {
  count: number;
  pageNo: number;
  pageSize: number;
  list: any[];
};

export type SelectOption = {
  op?: string;
  orderBy?: string;
  limit?: number[];
};
