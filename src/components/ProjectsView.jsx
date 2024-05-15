import { useEffect, useState } from "react";
import React from "react";
import * as FundService from "../services/FundsService";
import FundTile from "./FundTile";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProjectsView = ({ selectedFund, setSelectedFund }) => {
  const [funds, setFunds] = useState([]);
  const [tempFunds, setTempFunds] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    FundService.getFunds().then((response) => {
      setFunds(response.filter((x) => x.withdrawn == false));
    });
  }, []);

  const [searchAddress, setSearchAddress] = useState("");

  return (
    <>
      <div
        style={{
          width: "75%",
          margin: "auto",
          justifyContent: "center",
          display: "flex",
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      >
        <TextField
          label="Search by address"
          onChange={(event) => {
            console.log(event.target.value);
            setTempFunds(funds.filter((x) => x.creator == event.target.value));
            setSearchAddress(event.target.value);
          }}
          sx={{ width: "25%" }}
        ></TextField>
      </div>
      <div className="funds-list-wrapper">
        {searchAddress
          ? tempFunds.map((fund) => {
              return (
                <>
                  <FundTile
                    fund={fund}
                    setSelectedFund={setSelectedFund}
                  ></FundTile>
                </>
              );
            })
          : funds.map((fund) => {
              return (
                <>
                  <FundTile
                    fund={fund}
                    setSelectedFund={setSelectedFund}
                  ></FundTile>
                </>
              );
            })}
      </div>
    </>
  );
};

export default ProjectsView;
