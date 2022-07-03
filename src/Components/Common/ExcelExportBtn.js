import { Button } from "antd"
import { CSVLink } from "react-csv"
import { SiMicrosoftexcel } from 'react-icons/si'

export const ExcelExportBtn = (props) => {
    const { dataSource, filename } = props
    return (
        <>
            {
                dataSource.length > 0 &&
                <Button type="primary" htmlType="button">
                    <CSVLink
                        data={dataSource}
                        filename={filename}
                        target="_blank"
                    >
                        <SiMicrosoftexcel />&nbsp;Excel Export
                    </CSVLink>
                </Button>
            }
        </>
    )
}