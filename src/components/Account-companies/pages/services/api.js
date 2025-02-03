import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Accounts API
export const fetchAccounts = () => API.get("/accounts");
export const createAccount = (account) => API.post("/accounts", account);
export const updateAccount = (id, account) => API.put(`/accounts/${id}`, account);
export const deleteAccount = (id) => API.delete(`/accounts/${id}`);

// Companies API
export const fetchCompanies = () => API.get("/companies");
export const createCompany = (company) => API.post("/companies", company);
export const updateCompany = (id, company) => API.put(`/companies/${id}`, company);
export const deleteCompany = (id) => API.delete(`/companies/${id}`);
