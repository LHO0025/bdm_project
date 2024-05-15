import { Button, TextField } from "@mui/material";

import React, { useState } from "react";

import * as FundsService from "../services/FundsService";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {
  const [nickname, setNickname] = useState("");
  const [fundName, setFundName] = useState("");
  const [fundDesc, setFundDesc] = useState("");
  const [expDate, setExpDate] = useState(0);
  const [targetAmount, setTargetAmount] = useState(0);
  const navigate = useNavigate();

  function createFund() {
    if (nickname && fundDesc && fundName && expDate && targetAmount) {
      FundsService.createFund(
        nickname,
        fundDesc,
        fundName,
        expDate,
        targetAmount
      )
        .then((response) => {
          navigate("/funds/view");
        })
        .catch(() => {});
    }
  }
  return (
    <div className="project-inputs-wrapper" style={{ paddingTop: "2rem" }}>
      <TextField
        id="outlined-basic"
        label="Nickname"
        variant="outlined"
        onChange={(event) => {
          setNickname(event.target.value);
        }}
      />
      <TextField
        id="outlined-basic"
        label="Fund name"
        variant="outlined"
        onChange={(event) => {
          setFundName(event.target.value);
        }}
      />
      <TextField
        id="outlined-basic"
        label="Fund description"
        variant="outlined"
        multiline
        onChange={(event) => {
          setFundDesc(event.target.value);
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingBottom: "1rem",
        }}
      >
        <span>Expiration date</span>
        <div>
          <input
            type="date"
            id="start"
            name="trip-start"
            onChange={(event) => {
              setExpDate(
                Math.floor(new Date(event.target.value).getTime() / 1000)
              );
            }}
          />
        </div>
      </div>
      <TextField
        id="outlined-basic"
        label="Target amount"
        variant="outlined"
        type="number"
        onChange={(event) => {
          setTargetAmount(event.target.value);
        }}
      />
      <div style={{ paddingTop: "2rem" }}>
        <Button onClick={createFund} variant="outlined">
          Create
        </Button>
      </div>
    </div>
  );
};

export default CreateProject;
