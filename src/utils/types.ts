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
