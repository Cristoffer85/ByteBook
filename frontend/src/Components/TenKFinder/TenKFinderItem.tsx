import { Link } from "react-router-dom";
import { CompanyTenK } from "../../company"

type Props = {
    tenK: CompanyTenK;
}

const TenKFinderItem = ({ tenK }: Props) => {
    const fillingDate = new Date(tenK.fillingDate).getFullYear();
  return (
        <Link
          reloadDocument
          to={tenK.finalLink}
          type="button"  
          className="inline-flex items-center p-4 text-md text-white bg-lightGreen rounded-md"
        > 
          {" "}
          10K - {tenK.symbol} - {fillingDate}{" "}
        </Link>
    )
}

export default TenKFinderItem