const fs = require("fs");

export default async function handler(req, res) {
  const {id} = req.body;
  
  const example = fs.readFileSync(`data/${id}.json`).toString();
  // convert example to JSON
  const exampleJSON = JSON.parse(example);

  // respond exampleJSON
  return res.status(200).json(exampleJSON);
}

