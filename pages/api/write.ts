const fs = require("fs");

export default async function handler(req, res) {
  // Create a new file in the data folder with random data
  const { certificate } = req.body;

  //Save data json in the data folder
  await certificate.map((item, index) => {
    //Data json to save
    const data = {
      id: index,
      cc: item.cedula,
      gmail: item.correo,
      name: item.nombre,
      title: item.titulo,
      university: item.institucion,
      "high-m": item.estatura,
      date: item.date,
      image: item.img,
    };

    // Write data to file
    fs.writeFileSync(`./data/${index}.json`, JSON.stringify(data));
  });

  // respond with a success message
  return res.status(200).json({ message: "Success" });
}
