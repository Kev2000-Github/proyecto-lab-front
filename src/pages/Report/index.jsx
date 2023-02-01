import React from "react"
import { useEffect } from "react";
import { useState } from "react";
import { getReport } from "../../services/subsidiary.service";
import './style.scss';

export function ReportList() {
    
    const [report,setReport] = useState([])

   async function init() {
        const data = await getReport()
        setReport(data.data)
    }

    useEffect(() => {
        init()
      },[])

    return (
    <div className="body">
        <div className="block">
            <header>REPORTE DE MEDICAMENTOS</header>
            <div className="blockin">
                <ul>{report.map((subsidiary)=>
                    <li className="list" key={subsidiary.id}>Sucursal {subsidiary.name}
                        <h1>Medicamentos Disponibles:</h1>
                        <ul>{subsidiary.Items.map((item)=>
                            <li className="listin" key={item.id}>{item.name} - Cantidad:{item.quantity}</li>)}
                        </ul>
                        <br/>
                    </li>
                )}</ul>
            </div>
        </div>
    </div>
    );
}
