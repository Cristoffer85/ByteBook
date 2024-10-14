import axios from "axios"
import { CompanyProfile, CompanySearch } from "./company";

interface SearchResponse {
    data: CompanySearch[];
}

/* Learn-dom from this class:

Theres a difference in "" and '' and `` in imports:
- "" is used for importing modules
- '' is used for importing files
- `` is used for importing files with variables, will cause 401 error if not used correctly, like below SearchResponse string
*/

export const searchCompanies = async (query: string) => {
    try {
        const data = await axios.get<SearchResponse>(
        `https://financialmodelingprep.com/api/v3/search?query=${query}&limit=10&exchange=NASDAQ&apikey=${process.env.REACT_APP_API_KEY}`
        );
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("error message: ", error.message);
            return error.message;
        } else {
            console.log("unexpected error: ", error);
            return "an expected error occurred";
        }
    }
};

export const getCompanyProfile = async (query: string) => {
    try {
        const data = await axios.get<CompanyProfile[]>(`https://financialmodelingprep.com/api/v3/profile/${query}?apikey=${process.env.REACT_APP_API_KEY}`
        )
        return data;
    } catch (error: any) {
        console.log("error message from API: ", error.message);
    }
};