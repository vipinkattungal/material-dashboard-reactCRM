import React from "react";
import AccountsOverview from "../Accounts/AccountsOverview";
import TransactionsTable from "../Accounts/TransactionsTable";

const AccountsPage = () => (
  <div>
    <AccountsOverview />
    <TransactionsTable />
  </div>
);

export default AccountsPage;