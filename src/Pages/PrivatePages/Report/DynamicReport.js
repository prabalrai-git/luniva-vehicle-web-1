import { useState } from "react"
import {
    Card,
    Table,
} from 'antd';
import Filter from "../../../Components/Common/Filter";
import { getDatewiseCollectionDetailsApi } from "../../../Services/ReportService";
import { dateFormat } from "../../../Helpers/TodayDate";
import { ExcelExportBtn } from "../../../Components/Common/ExcelExportBtn";

const DynamicReport = () => {
    const [dataHead, setDataHead] = useState([])
    const [dataSource, setDataSource] = useState([])

    const makeTableData = (res) => {
        if (res.length !== 0) {
            let tableKeys = Object.keys(res[0]);
            let data = []
            tableKeys.forEach(ele => {
                data.push({
                    title: ele,
                    dataIndex: ele,
                    key: ele,
                })
            })
            setDataHead(data)
            setDataSource(res)
        } else {
            setDataHead([])
            setDataSource([])
        }
    }

    const returnFilterData = (res) => {
        let data = {
            fromdate: res.FromTo[0].format(dateFormat),
            todate: res.FromTo[1].format(dateFormat)
        }
        getDatewiseCollectionDetailsApi(data, (newRes) => {
            makeTableData(newRes)
        })
    }

    return (
        <div className="contentContainer">
            <Card title={`Collection Report`} bordered={false}>
                <Filter
                    showFromToDate={true}
                    returnFilterData={returnFilterData}
                />
            </Card>
            <ExcelExportBtn
                dataSource={dataSource}
                filename={'collection report.csv'}
            />
            <div className="tableReponsive">
                <Table
                    columns={dataHead}
                    dataSource={dataSource}
                />
            </div>
        </div>
    )
}

export default DynamicReport