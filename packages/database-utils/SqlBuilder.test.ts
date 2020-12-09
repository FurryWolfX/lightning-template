import Builder, { func } from "./SqlBuilder";

const idList: string[] = ["1", "2"];
const demo = new Builder()
  .deleteFrom("goods")
  .where()
  .eq("company_id", 1);
if (idList && idList.length) {
  demo.and().in("goods_id", idList);
  demo.and().like("order_no", func("CONCAT", ["%", "1", "%"]));
}

console.log(demo.toPreparedSql());
console.log(demo.toSql());
