import { useState } from "react"
import {
    Card,
    Table,
} from 'antd';
import Filter from "../../../Components/Common/Filter";
import { getCounterwiseTotalCollectionAmtDetailsApi } from "../../../Services/ReportService";
import { dateFormat } from "../../../Helpers/TodayDate";
import { AppDefaultSettings } from "../../../Config/AppDefaultSettings";
import useSingleCompany from "../../../Helpers/SetDefaultCompany";
import { ExcelExportBtn } from "../../../Components/Common/ExcelExportBtn";

const CounterWiseTotalReport = () => {
    const [dataHead, setDataHead] = useState([])
    const [dataSource, setDataSource] = useState([])
    const appDefSet = AppDefaultSettings.showSingleCompany
    const defaultCompany = useSingleCompany(0, appDefSet)

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
            todate: res.FromTo[1].format(dateFormat),
            companyId: res.CompanyId !== undefined ? res.CompanyId : defaultCompany.CId
        }
        getCounterwiseTotalCollectionAmtDetailsApi(data, (newRes) => {
            makeTableData(newRes)
        })
    }

    return (
        <div className="contentContainer">
            <Card title={`Counter Wise Total Collection Report`} bordered={false}>
                <Filter
                    showFromToDate={true}
                    showCompanyList={appDefSet}
                    returnFilterData={returnFilterData}
                />
            </Card>
            <ExcelExportBtn
                dataSource={dataSource}
                filename={'counter wise total collection report.csv'}
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

export default CounterWiseTotalReport