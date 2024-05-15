import React, { useEffect, useState } from "react";
import FundTile from "./FundTile";
import * as FundService from "../services/FundsService";

const MyProjects = ({ setSelectedFund, currentAccountAddress }) => {
  const [funds, setFunds] = useState([]);
  useEffect(() => {
    FundService.getFunds().then((response) => {
      setFunds(response.filter((x) => x.creator === currentAccountAddress));
    });
  }, []);

  return (
    <div className="funds-list-wrapper">
      {funds.map((fund) => {
        return (
          <>
            <FundTile fund={fund} setSelectedFund={setSelectedFund}></FundTile>
          </>
        );
      })}
    </div>
  );
};

export default MyProjects;
