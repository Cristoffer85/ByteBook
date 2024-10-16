import RatioList from '../../Components/RatioList/RatioList'
import Table from '../../Components/Table/Table'
import { testIncomeStatementData } from '../../Components/Table/testData'

type Props = {}
const tableConfig = [
  {
    label: "Market Cap",
    render: (company: any) => company.marketCapTTM,
    subTitle: "Total value of all a company's shares of stock",
  }
]

const DesignPage = (props: Props) => {
  return (
    <>
        <>ByteBook Design Page</>
        <h2>
            This is ByteBooks Design Page. This is where we will house various design aspects for the application.
        </h2>
        <RatioList data={testIncomeStatementData} config={tableConfig}/>
        <Table data={testIncomeStatementData} config={tableConfig}/>
    </>
  )
}

export default DesignPage