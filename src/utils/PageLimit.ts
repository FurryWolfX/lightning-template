class PageLimit {
  static getLimit(pageSize: number, pageNo: number): number[] {
    const limitStart = pageSize * (pageNo - 1);
    const limitEnd = limitStart + pageSize;
    return [limitStart, limitEnd];
  }
}

export default PageLimit;
