const fs = require("fs");
const http = require("http");

// Synchronous File reading/writing
// const txtIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(txtIn);

// const txtOut = "Avocado is very expensive.";
// fs.writeFileSync("./txt/output.txt", `${txtIn} ${txtOut}`);
// console.log("File Written");

// Asynchronous File reading/writing

// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//   fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//       console.log(data3);
//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("Your file has been written");
//       });
//     });
//   });
// });

// __________________________________
// SERVER
function replaceTemplate(template, product) {
  let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);

  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);

  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }
  return output;
}

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, {
      "content-type": "text/html",
    });

    const cardsHtml = dataObj.map((el) => replaceTemplate(tempCard, el));
    let overviewPage = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

    res.end(overviewPage);
  } else if (pathName === "/product") {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    res.end(tempProduct);
  } else if (pathName === "/api") {
    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      "content-type": "text/html",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
