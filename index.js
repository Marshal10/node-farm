const fs = require("fs");

// Synchronous File reading/writing
const txtIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(txtIn);

const txtOut = "Avocado is very expensive.";
fs.writeFileSync("./txt/output.txt", `${txtIn} ${txtOut}`);
// console.log("File Written");

// Asynchronous File reading/writing

fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
  fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
      console.log(data3);
      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        console.log("Your file has been written");
      });
    });
  });
});
