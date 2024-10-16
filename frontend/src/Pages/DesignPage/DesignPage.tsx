import RatioList from '../../Components/RatioList/RatioList'
import Table from '../../Components/Table/Table'

type Props = {}

const DesignPage = (props: Props) => {
  return (
    <>
        <>ByteBook Design Page</>
        <h2>
            This is ByteBooks Design Page. This is where we will house various design aspects for the application.
        </h2>
        <RatioList />
        <Table />
    </>
  )
}

export default DesignPage