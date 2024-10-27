import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ImProfile } from "react-icons/im";
import { FaBalanceScale } from 'react-icons/fa';
import { GiReceiveMoney } from "react-icons/gi";
import { FaMoneyCheckDollar } from "react-icons/fa6";

type Props = {
  children: React.ReactNode;
  ticker: string;
};

const CompanyDashboard = ({ children, ticker }: Props) => {
  return (
    <div className="relative md:ml-64 bg-blueGray-100 w-full">
      <div className="relative pt-20 pb-32 bg-lightBlue-500">
        <div className="px-4 md:px-6 mx-auto w-full">
          <div className="flex justify-around bg-white shadow p-4 rounded mb-4">
            {/* Company Profile */}
            <Link to='company-profile' className="flex items-center text-blueGray-500 text-medium uppercase font-bold no-underline">
              <ImProfile className="mr-2" />
              <span>Company Profile</span>
            </Link>

            {/* Income Statement */}
            <Link to='income-statement' className="flex items-center text-blueGray-500 text-medium uppercase font-bold no-underline">
              <GiReceiveMoney className="mr-2" />
              <span>Income Statement</span>
            </Link>

            {/* Balance Sheet */}
            <Link to='balance-sheet' className="flex items-center text-blueGray-500 text-medium uppercase font-bold no-underline">
              <FaBalanceScale className="mr-2" />
              <span>Balance Sheet</span>
            </Link>

            {/* Cash Flow Statement */}
            <Link to='cashflow-statement' className="flex items-center text-blueGray-500 text-medium uppercase font-bold no-underline">
              <FaMoneyCheckDollar className="mr-2" />
              <span>Cashflow Statement</span>
            </Link>
          </div>
          <div>
            <div className="flex flex-wrap">{children}</div>
            <div className="flex flex-wrap">{<Outlet context={ticker} />}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;