import React, { Fragment, useState } from 'react'
import QRCode from "qrcode-svg";
import {v4 as uuid} from 'uuid'
import * as XLSX from 'xlsx'

export default function GeneratorQR() {
  const [fileName,setFileName] = useState(null); //state file
  const [row,setRows] = useState([]);  //state colums excel file                                               
  const [qr,setQr] = useState([]); //state svg qr 
  
  //Start Read File And Generate QR
  const handleFile = async (e) =>{
    const file = e.target.files[0]; //File asignation input
    setFileName(file.name); //Set file name

    const data = await file.arrayBuffer(); //data file in arraybuffer
    const workboock = XLSX.readFile(data,{sheetRows: 50}); //read file excel , {sheetrowrs : 0 > infinite rows}

    const woorsheet = workboock.Sheets[workboock.SheetNames[0]]; //Nombre de columnas
    const jsonData =  XLSX.utils.sheet_to_json(woorsheet,{ //Json data organice
      header:1,
      defval:"",
    });
    console.log("Read File :",jsonData);
    setRows(jsonData); //Set rows the data

    //Generate QR
    //funtion parse json a to string
    const urlsHash = jsonData.map((hash) =>
      hash.toString() //Parsing to string 
    );
    console.log("urlhash :",urlsHash);
    const svgMarkup: string[] = []; //Array elements save QR Svg
    
    urlsHash.forEach((hash) =>{ //Generate QR input url hash 
        const svg = new QRCode({
          content: hash,
          width: 128,
          height: 128,
          padding: 0,
          join: true,
          ecl: "Q",
        }).svg();
        svgMarkup.push(svg); //push in the array SvgMarkup
      });
      console.log("Svg markup:",svgMarkup)
      setQr(svgMarkup); //Set generate QR svg in the array setQR
  }
  //End Read File And Generate QR
  

  //Entra el hash
  const addHash = (hash) => {
    if(hash != null){
      let tempHash = "";
      tempHash = hash;
      console.log("TempHash:",tempHash);
      return tempHash;
    }  
  }

  //Date day
  const generadorDate = () => {
    const dateTime = new Date().toLocaleString();
    //console.log("dateTime:",dateTime);
    return dateTime;
  }

  //Generator ID
  const generadorID = () => {
    const uniqueId = uuid();
    //console.log("Identificador:",uniqueId);
    return uniqueId;
  }

  
  return (
    <Fragment>
    <div>
      <h1>GENERADOR QR</h1>
      <h3>Add you File: CSV,XLSX,EXCEL :</h3>
      <input type="file" onChange={e => handleFile(e)}></input>
    </div>  

    <div className='FileRead'>
      {fileName &&(
        <>
          <h1>LIST URL HASH</h1>
          <p>
           FileName: <span>{fileName}</span>
          </p>
          <ul>
            Rows: <span>{row.map(r =>(
                  <ul>
                    <li>{r}</li>
                  </ul>
            ))}</span>
          </ul>
        </>
      )}
      {qr &&(
        <>
          <h1>QR LIST GENERATE</h1>
          <ul>
            Row Qr: <span>{qr.map(q =>(
              <li dangerouslySetInnerHTML={{ __html: q }}></li>
            ))}</span>
          </ul>
        </>
      )
      }
    </div>
    </Fragment>
  );
}


/*
  //Data constructor QR
  //const codes = ["URL IMAGEN HASH", "https//url.img/ron/b783dee3e6018cee7107094b64738d1d", "https//url.img/ron/b783dee3e6018cee7107094b64738d1d", "https//url.img/ron/b783dee3e6018cee7107094b64738d1d", "https//url.img/ron/b783dee3e6018cee7107094b64738d1d", "https//url.img/ron/b783dee3e6018cee7107094b64738d1d", "https//url.img/ron/b783dee3e6018cee7107094b64738d1d", "https//url.img/ron/b783dee3e6018cee7107094b64738d1d", "https//url.img/ron/b783dee3e6018cee7107094b64738d1d", "https//url.img/ron/b783dee3e6018cee7107094b64738d1d"];
  const codes = ["URL IMAGEN HASH","https//url.img/ron/b783dee3e6018cee7107094b64738d1d","https://btcpeers.com/content/images/2022/04/pasted-image-0-1.png"]

  //Data save QR svg
  const svgMarkup: string[] = [];
  
  //Data for svg
  codes.forEach((code) => {
    const svg = new QRCode({
      content: code,
      width: 128,
      height: 128,
      padding: 0,
      join: true,
      ecl: "M",
    }).svg();
    svgMarkup.push(svg);

    //Data save creation QR and ID
    const createDatesQR = [{id:generardorID(),date:generadorDate()}]
    const contenidoQRdate = []
    contenidoQRdate.push(createDatesQR);
    console.log(contenidoQRdate);
  });


      <div className="m-10" key={generardorID()}>
      <h1>Print Code QR in DOM</h1>
      {svgMarkup.map((markup, index) => (
        <div className="my-32">
          { <div className="mb-2 font-bold">CONTENIDO HASH QR :{codes[index]}</div> }
          <div dangerouslySetInnerHTML={{ __html: markup }} />
        </div>
      ))}
    </div>

      <ul>
        QR: <span>{svgMarkup.map((markup,index) => (
                  <ul>
                    <li>
                      {codes[index]}
                    </li>
                    <li dangerouslySetInnerHTML={{ __html: markup }}></li>
                  </ul>
        ))}</span>
      </ul>    
*/