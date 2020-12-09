import Builder, { func } from "./SqlBuilder";

const idList: string[] = ["1", "2"];
const demo = new Builder()
  .deleteFrom("goods")
  .where()
  .group(new Builder().eq("company_id", 1))
  .and()
  .group(new Builder().eq("order_no", "2"));

if (idList && idList.length) {
  demo.and().in("goods_id", idList);
  demo.and().like("order_no", func("CONCAT", ["%", "1", "%"]));
}

console.log(demo.toSql());
console.log(demo.toPreparedSql());
