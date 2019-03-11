import Lightning from "@wolfx/lightning";

const database = Lightning.core.getState().database;

export let findByAge = async age => {
  return await database.query("test.findByAge", {
    age: age
  });
};
