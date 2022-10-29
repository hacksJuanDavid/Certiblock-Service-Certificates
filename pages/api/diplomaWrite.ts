const fs = require("fs")
import nodeHtmlToImage from 'node-html-to-image'


export default async function handler(req, res) {
try{
    //Request axios data
    const { certificate } = req.body;

    //Read HTML file
    const html = fs.readFileSync('./template/eafit.html', 'utf8');

    //Parse HTML to string
    const htmlString = html.toString();


    //Save data in the image for 10 and 10 seconds respectively
    for(let i = 0; i < certificate.length; i++){
        //Replace data in the HTML file
        const htmlStringReplace = htmlString.replace("{{name}}", certificate[i].nombre).replace("{{title}}", certificate[i].titulo).replace("{{date}}", certificate[i].date).replace("{{id}}", certificate[i].id);

        //Generate image from HTML
        await nodeHtmlToImage({
            output: `./dataImg/${certificate[i].id}.png`,
            html: htmlStringReplace,
            quality: 100,
            type: 'png',
            puppeteerArgs: { args: ['--no-sandbox'] }
        });
    }

  }catch(err){
    console.log("Error catched: ", err)
  }

  // respond with a success message
  return res.status(200).json({ message: "Success" });
}
