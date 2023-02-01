import React from "react"
import { useEffect } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { config } from "../../config";
import { getReport } from "../../services/subsidiary.service";
import { swalClose, swalLoading, swalSuccess } from "../../utils/swal";
import './style.scss';

export function ReportList() {
    const [report,setReport] = useState([])
    const reportQuery = useQuery(
      ["report-query"], 
      getReport, 
      config.defaultReactQuery
    )

    useEffect(() => {
      reportQuery.refetch()
    },[])

    useEffect(() => {
        if(reportQuery.isLoading) swalLoading()
        else swalClose()
    },[reportQuery.isLoading])

    useEffect(() => {
        if(reportQuery.isSuccess) setReport(reportQuery.data?.data)
    },[reportQuery.data])

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
