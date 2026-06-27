const bcrypt = require("bcrypt");

async function main() {
  const password = "123456";

  const hash = await bcrypt.hash(password, 12);

  console.log(hash);
}

main();