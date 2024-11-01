const fs = require("fs");

const txtIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(txtIn);

const txtOut = "Avocado is very expensive.";
fs.writeFileSync("./txt/output.txt", `${txtIn} ${txtOut}`);
console.log("File Written");
