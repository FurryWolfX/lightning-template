class PageLimit {
  static getLimit(pageSize: number, pageNo: number): number[] {
    return [pageSize * (pageNo - 1), pageSize];
  }
}

export default PageLimit;
