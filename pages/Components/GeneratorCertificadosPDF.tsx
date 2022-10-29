import React from 'react'
import { useState} from 'react'
import { read, utils } from 'xlsx'
import {v4 as uuid} from 'uuid'


import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from 'react-bootstrap/Spinner'
import Modal from 'react-bootstrap/Modal'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import 'bootstrap/dist/css/bootstrap.min.css'


import { Document, Page, Text, View, StyleSheet, PDFViewer,Image } from '@react-pdf/renderer'
require('events').EventEmitter.prototype._maxListeners = 100;

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    textAlign:'center',
    fontFamily: 'Helvetica',
    color: 'blue',
    border: '30px solid black',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  name: {
    fontSize: 30,
    marginBottom: 10,
    textTransform: 'uppercase',
    textDecoration: 'underline',
    WhiteSpace: 'nowrap',
  },
  imageLogo: {
    marginVertical: 15,
    marginHorizontal: 150,
  },
  imageFirma: {
    marginVertical: 15,
    marginHorizontal: 150,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  parraft: {
    margin: 10,
    padding: 10,
    fontSize: 15,
    WhiteSpace: 'nowrap',
  }
});

  //Date day
  const generadorDate = () => {
    const dateTime = new Date()
    let date = dateTime.getFullYear() + '/' + (dateTime.getMonth() + 1) + '/' + dateTime.getDate()
    return date
  }
 
  //Generator ID unique
  const generateIDJSON = () => {
    const id = uuid()
    const toString = id.toString()
    return toString;
  }


  //Add IMG IPFS
  const addImgIPFS = (hash) => {
    const url = "https://ipfs.io/ipfs/" + hash
    return url
  }


export default function GeneratorCertificadosPDF() {
  //State data
  const [data, setdata] = useState([]);
  
  //Read and filter data to excel a json object
  const readfile = async($event) => {
      const files = $event.target.files
      if (files.length) {
          const file = files[0];
          const reader = new FileReader()
          reader.onload = (event) => {
              const wb = read(event.target.result)
              const sheets = wb.SheetNames
              if (sheets.length) {
                  const rows = utils.sheet_to_json(wb.Sheets[sheets[0]])
                  setdata(rows);
              }
          }
          reader.readAsArrayBuffer(file)
      }
  }
  //Print Certificates data json
  console.log("Data json", data)
  
  //Updaate data json
  const updateData = data.map((item,index) => {
    const hash = ["2ñ313h1jk23h1j3hksa8dahsd"]
    const upgradeDataJSON = {
        idx: generateIDJSON(),
        id: index++,
        date : generadorDate(),
        img: addImgIPFS(hash),
        ...item
    }

    return upgradeDataJSON
  });
  
  //Update Data
  updateData;
  
  //Print Certificates data json
  console.log("Data json Update:", JSON.parse(JSON.stringify(updateData)))

  const postData = async () => {
    const axios = require('axios');
    axios.post('/api/write', {
      certificate: updateData,
    })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    });
  }  
  postData();

  //Post data json to img
  const postDataImg = async () => {
    const axios = require('axios');
    axios.post('/api/diplomaWrite', {
      certificate: updateData,
    })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    });
  }  
  postDataImg();




  return (
    <>
      <div className='nav-bar'>
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
          <Container>
          <Navbar.Brand href="#home">
              <img
                alt=""
                src="/img/shield-fill.svg"
                width="60"
                height="60"
                className="d-inline-block align-center"
              />{' '}
              CERTIBLOCK
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav className="me-auto">
                  <Nav.Link href="/">
                    <img
                        alt=""
                        src="/img/house-fill.svg"
                        width="40"
                        height="30"
                        className="d-inline-block align-center"
                      />{' '}                    
                    HOME
                    </Nav.Link>
                  <Nav.Link href="/">
                    <img
                        alt=""
                        src="/img/info-lg.svg"
                        width="40"
                        height="30"
                        className="d-inline-block align-center"
                      />{' '}
                    ¿QUIENES SOMOS?
                  </Nav.Link>
                  <Nav.Link href="#pricing">
                    <img
                        alt=""
                        src="/img/card-image.svg"
                        width="40"
                        height="30"
                        className="d-inline-block align-center"
                      />{' '}
                    RECLAMA TU ACTIVO
                  </Nav.Link>
                  <Nav.Link href="#pricing">
                    <img
                        alt=""
                        src="/img/person-circle.svg"
                        width="40"
                        height="30"
                        className="d-inline-block align-center"
                      />{' '}
                    REGISTRATE
                  </Nav.Link>
                  <Nav.Link href="#pricing">
                    <img
                      alt=""
                      src="/img/wallet2.svg"
                      width="40"
                      height="30"
                      className="d-inline-block align-center"
                    />{' '}
                  WALLET
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
       </div>

       <Container>
              <div style={{ marginTop: '30px' }}>
                    <Modal.Dialog>
                      <Modal.Header>
                        <Modal.Title>INDEXAR ARCHIVO</Modal.Title>
                      </Modal.Header>

                      <Modal.Body>
                        <p>Puedes indexar un archivo de tipo excel con soporte
                           para las siguientes extensiones:(excel,csv,xlsx).
                        </p>
                      </Modal.Body>

                      <Modal.Footer>
                        <input type='file' onChange={readfile} accept='' />
                        <Button variant="primary">Delete reset</Button>
                      </Modal.Footer>
                    </Modal.Dialog>
              </div>
       </Container>

    </>
  )
}



/*
      <div>
        {data &&(
            <>
            <Container>
              <div style={{ marginTop: '30px' }}>
                    <Modal.Dialog>
                      <Modal.Header>
                        <Modal.Title>INDEXAR ARCHIVO</Modal.Title>
                      </Modal.Header>

                      <Modal.Body>
                        <p>Puedes indexar un archivo de tipo excel con soporte
                           para las siguientes extensiones:(excel,csv,xlsx).
                        </p>
                      </Modal.Body>

                      <Modal.Footer>
                        <input type='file' onChange={readfile} accept='' />
                        <Button variant="primary">Delete reset</Button>
                      </Modal.Footer>
                    </Modal.Dialog>
              </div>
             </Container>    
                <ul>
                    <span>{data.map(metadata =>(
                  <>
                      <Container fluid>
                         <h1>METADATA</h1>
                        <Row>
                          <Col>
                            <Table responsive striped bordered hover variant="dark">
                              <thead>
                                <tr style={{ marginTop: '30px' }}>
                                  <th>#Id</th>
                                  <th>Correo</th>
                                  <th>Cedula</th>
                                  <th>Nombre</th>
                                  <th>Titulo</th>
                                  <th>Estatura</th>
                                  <th>NFT</th>
                                  <th>Institucion</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>1</td>
                                  <td>{metadata.correo}</td>
                                  <td>{metadata.cedula}</td>
                                  <td>{metadata.nombre}</td>
                                  <td>{metadata.titulo}</td>
                                  <td>{metadata.estatura}</td>
                                  <td>{metadata.nft}</td>
                                  <td>{metadata.institucion}</td>
                                </tr>
                              </tbody>
                            </Table>
                          </Col>
                        </Row>
                        </Container>

                        <Row>
                        <Col>
                        <Container>
                          <Card border="dark" style={{ width: '50rem',
                                         color: 'white',
                                         background: 'gray'
                                      }}>
                          <Card.Img variant="top" src="/img/Diploma Eafit.png" />
                          <Card.Body>
                            <Card.Title>{metadata.titulo}</Card.Title>
                            <ListGroup>
                              <ListGroup.Item>Dueño: {metadata.nombre}</ListGroup.Item>
                              <ListGroup.Item>Numero NFT: {metadata.nft}</ListGroup.Item>
                              <ListGroup.Item>Institucion: {metadata.institucion}</ListGroup.Item>
                            </ListGroup>
                          </Card.Body>
                          </Card>
                       </Container>
                       </Col>
                       
                       <Col>
                       <Container>
                          <Card border="dark" style={{ width: '50rem', 
                                         color: 'white',
                                         background:'gray'
                                      }}>
                          <Card.Body>
                            <Card.Title>
                            CERTIFICADO DE ORIGEN
                              <img
                                alt=""
                                src="/img/shield-fill.svg"
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                              />{' '}
                               
                            </Card.Title>
                            <ListGroup>
                              <ListGroup.Item>holder: {metadata.correo}</ListGroup.Item>
                              <ListGroup.Item>Numero NFT: {metadata.nft}</ListGroup.Item>
                              <ListGroup.Item>Institucion: {metadata.institucion}</ListGroup.Item>
                              <ListGroup.Item>
                                <img
                                  alt=""
                                  src="/img/eye.svg"
                                  width="50"
                                  height="30"
                                  className="d-inline-block align-top"
                                />
                                Vistas : 0
                              </ListGroup.Item>
                              <ListGroup.Item> 
                                <Spinner animation="border" role="status">
                                  <span className="visually-hidden">Loading...</span>
                                </Spinner>
                              </ListGroup.Item>
                              <ButtonGroup size="lg" className="mb-2">
                                <Button variant="light">Reclamar NFT</Button>
                                <Button variant="dark">QR</Button>
                              </ButtonGroup>
                            </ListGroup>
                          </Card.Body>
                          </Card>
                       </Container>
                       </Col>

                       <Col>
                       <Container fluid>
                       <PDFViewer width={1000} height={1000}>
                        <Document>
                          <Page size="A4" style={styles.page}>
                            <View style={styles.section}>
                              <Image style={styles.imageLogo} src="/img/LogoEafit.png"/>
                              <Text style={styles.parraft}>En atencion a:</Text>
                              <Text style={styles.name}>{metadata.nombre}</Text>
                              <Text style={styles.parraft}>Ha cumplido con todos los requisitos exigidos por el reglamento de la institucion, le confiere el titulo de</Text>
                              <Text style={styles.title}>{metadata.titulo}</Text>
                              <Text style={styles.parraft}>Con MENCION HONORIFICA</Text>
                              <Text style={styles.parraft}>Para constancia, se emite en Santiago de Cali en la fecha {generadorDate()}</Text>
                              <Image style={styles.imageFirma} src="/img/firmaRector.png"/>
                              <Text style={styles.parraft}>RECTOR</Text>
                            </View>
                          </Page>
                        </Document>
                        </PDFViewer>
                        </Container> 
                       </Col>               
                       </Row>
                  </>
                  ))}</span>
                </ul>
            </>
        )}
      </div>

*/