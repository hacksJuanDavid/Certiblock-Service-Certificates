import styles from'/pages/Components/CertiificateCss.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function CertificateTemplate() {
    
    const MyDocument = () => (
        <div id="capture" className={styles.background}>
            <div className={styles.container}>
                <div className={styles.text1}>En atencion a:</div>
                 <div className={styles.name}>JUAN DAVID JIMENEZ ATEHORTUA</div>
                 <div className={styles.text2}>Ha cumplido con todos los requisitos exigidos por el reglamento de la institución, le confiere el título de</div>
                 <div className={styles.title}>INGENIERIA DE SISTEMAS</div>
                 <div className={styles.date}>Para constancia, se emite en Medellin el dia 00/00/0000</div>
                <div>Numero diploma:000000</div>
            </div>
        </div>
    )
     
    return (
        <> 
            <MyDocument/>
        </>
    )
}


