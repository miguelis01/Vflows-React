/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable prefer-const */
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createServer, Model } from "miragejs";

import Company from "./pages/Company/Company.tsx";
import Contract from "./pages/Contract/Contract.tsx";
import Home from "./pages/Home/Home.tsx";
import Error from "./pages/Error.tsx";
import { CnpjProvider } from "./context/CNPJContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/company",
    element: <Company />,
  },
  {
    path: "/company/contract/:contractId",
    element: <Contract />,
  },
]);

// MIRAGE JS - DATABASE
createServer({
  models: {
    companies: Model,
    contracts: Model,
    invoices: Model,
  },

  seeds(server) {
    server.db.loadData({
      companies: [
        {
          id: "1",
          name: "VFlows",
          socialReason: "socialReason1",
          fantasyName: "fantasyName1",
          cnpj: "11122233344455",
        },
        {
          id: "2",
          name: "VFlows2",
          socialReason: "socialReason2",
          fantasyName: "fantasyName2",
          cnpj: "66677788899910",
        },
      ],
      contracts: [
        {
          id: "1",
          companyCnpj: "11122233344455",
          contractName: "Título do primeiro contrato",
          contractCode: "11001100-01",
          technicalRetention: 10,
        },
        {
          id: "2",
          companyCnpj: "11122233344455",
          contractName: "Título do segundo contrato",
          contractCode: "22002200-02",
          technicalRetention: 5,
        },
        {
          id: "3",
          companyCnpj: "66677788899910",
          contractName: "Título do terceiro",
          contractCode: "33003300-03",
          technicalRetention: 15,
        },
      ],
      invoices: [
        {
          id: "1",
          contractId: "1",
          companyCnpj: "11122233344455",
          invoiceNumber: 523391,
          issueDate: "2023-01-31T22:00:00.000Z",
          dueDate: "2023-02-10T22:00:00.000Z",
          amount: 15990,
          taxesRetention: {
            ISSQN: 9,
            IRRF: 1,
            CSLL: 3,
            COFINS: 6,
            INSS: 2,
            PIS: 7,
          },
          attachedNotes: [],
        },
        {
          id: "2",
          contractId: "2",
          companyCnpj: "11122233344455",
          invoiceNumber: 413781,
          issueDate: "2023-01-20T15:00:00.000Z",
          dueDate: "2023-01-28T15:00:00.000Z",
          amount: 20910,
          taxesRetention: {
            ISSQN: 11,
            IRRF: 3,
            CSLL: 1,
            COFINS: 3,
            INSS: 0,
            PIS: 2,
          },
          attachedNotes: [],
        },
        {
          id: "3",
          contractId: "3",
          companyCnpj: "66677788899910",
          invoiceNumber: 589396,
          issueDate: "2023-01-15T18:00:00.000Z",
          dueDate: "2023-01-31T18:00:00.000Z",
          amount: 20910,
          taxesRetention: {
            ISSQN: 1,
            IRRF: 0,
            CSLL: 8,
            COFINS: 5,
            INSS: 4,
            PIS: 2,
          },
          attachedNotes: [],
        },
      ],
    });
  },

  // GET REQUEST
  routes() {
    this.namespace = "api";

    // CATCH ALL COMPANIES
    this.get("/companies", () => {
      return this.schema.all("companies");
    });

    // CATCH ALL COMPANIES
    this.get("/companies/:cnpj", (_, req) => {
      let cnpj: string = req.params.cnpj;

      return this.schema
        .all("companies")
        .filter((company) => company.cnpj == cnpj);
    });

    // CATCH CONTRACT BY COMPANY CNPJ
    this.get("/contracts/:cnpj", (_, req) => {
      let cnpj: string = req.params.cnpj;

      // @ts-ignore
      return this.schema
        .all("contracts")
        .filter((contract) => contract.companyCnpj == cnpj);
    });

    // CATCH INVOICES BY CONTRACT ID
    this.get("/invoices/contract/:id", (_, req) => {
      let id: string = req.params.id;

      // @ts-ignore
      return this.schema
        .all("invoices")
        .filter((invoices) => invoices.contractId == id);
    });
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CnpjProvider>
      <RouterProvider router={router} />
    </CnpjProvider>
  </React.StrictMode>,
);
