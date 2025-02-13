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
import ContactPage from "../Pages/ContactPage/ContactPage";
import ForumPage from "../Pages/ForumPage/ForumPage";
import ChatPage from "../Pages/ChatPage/ChatPage";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {path: "", element: <HeroPage />},
            {path: "home", element: <HomePage />},
            {path: "login", element: <LoginPage />},
            {path: "register", element: <RegisterPage />},
            {path: "profile", element: <ProtectedRoute><ProfilePage /></ProtectedRoute>},
            {path: "forum", element: <ForumPage />},
            {path: "chat", element: <ProtectedRoute><ChatPage /></ProtectedRoute>},
            {path: "finance", element: <ProtectedRoute><FinancePage /></ProtectedRoute>},
            {path: "contact", element: <ContactPage />},
            {path: "design-guide", element: <DesignPage />},
            {
                path: "company/:ticker", 
                element: <ProtectedRoute><CompanyPage /></ProtectedRoute>, 
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