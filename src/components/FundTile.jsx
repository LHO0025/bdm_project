import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const FundTile = ({ fund, setSelectedFund }) => {
  const navigate = useNavigate();

  return (
    <div className="fund-tile-wrapper">
      <div
        className="fund-tile"
        style={{
          border: "1px solid gray",
          borderRadius: "5px",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        <span
          className="title"
          style={{ fontSize: "20px", fontWeight: "bold" }}
        >
          {fund.title}
        </span>
        <span className="author" style={{ fontSize: "14px", color: "gray" }}>
          Created by: {fund.nickname}
        </span>
        <span className="raised" style={{ fontSize: "16px", marginTop: "5px" }}>
          Progress: {Number(fund.currentAmount)} / {Number(fund.targetAmount)}{" "}
          Wei
        </span>

        <div style={{ marginTop: "10px" }}>
          <Button
            variant="outlined"
            onClick={(e) => {
              setSelectedFund(fund);
              navigate("/funds/detail");
            }}
          >
            Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FundTile;
