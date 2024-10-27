import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import App from "../App";
import CompanyPage from "../Pages/CompanyPage/CompanyPage";
import IncomeStatement from "../Components/IncomeStatement/IncomeStatement";
import CompanyProfile from "../Components/CompanyProfile/CompanyProfile";
import DesignPage from "../Pages/DesignPage/DesignPage";
import BalanceSheet from "../Components/BalanceSheet/BalanceSheet";
import CashFlowStatement from "../Components/CashFlowStatement/CashFlowStatement";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import HeroPage from "../Pages/HeroPage/HeroPage";
import FinancePage from "../Pages/FinancePage/FinancePage";

{/* To add a protectedRoute/HOC to any element/route, do:

{path: "search", element: <ProtectedRoute><SearchPage /></ProtectedRoute>},    

*/}

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {path: "", element: <HeroPage />},
            {path: "login", element: <LoginPage />},
            {path: "home", element: <HomePage />},
            {path: "register", element: <RegisterPage />},
            {path: "finance", element: <FinancePage />},
            {path: "design-guide", element: <DesignPage />},
            {
                path: "company/:ticker", 
                element: <CompanyPage />, 
                children: [
                    { path: "company-profile", element: <CompanyProfile /> },
                    { path: "income-statement", element: <IncomeStatement /> },
                    { path: "balance-sheet", element: <BalanceSheet /> },
                    { path: "cashflow-statement", element: <CashFlowStatement /> }
                ]
            }
        ]
    }
])