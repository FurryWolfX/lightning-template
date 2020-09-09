export interface KeyValue<T> {
  [key: string]: T;
}

export interface LRequest {
  params: KeyValue<string>;
  query: KeyValue<string>;
  body: KeyValue<any>;
  cookies: KeyValue<string>;
  url: string;
  method: string;
}

export interface LResponse {
  send: (param: any) => void;
  json: (param: any) => void;
  redirect: (url: any) => void;
  header: (key: string, value: string) => void;
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
