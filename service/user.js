import Lightning from "@wolfx/lightning";
const database = Lightning.core.getState().database;

export let findByAge = async () => {
  let result = await database.query("test.findByAge", {
    age: 18
  });
  console.log(result);
  return result;
};
