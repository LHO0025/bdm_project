import React, { useEffect, useState } from "react";
import * as FundsService from "../services/FundsService";
import { Button, LinearProgress, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProjectDetail = ({ selectedFund, currentAccountAddress }) => {
  const [ethValue, setEthValue] = useState(0);
  const navigate = useNavigate();

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    console.log(
      Math.floor(
        (Number(selectedFund.currentAmount) /
          Number(selectedFund.targetAmount)) *
          100
      )
    );
    let val = Math.floor(
      (Number(selectedFund.currentAmount) / Number(selectedFund.targetAmount)) *
        100
    );

    if (val > 100) {
      val = 100;
    }

    setProgress(val);
  }, [selectedFund]);

  function contribute() {
    FundsService.contributeToFund(selectedFund.index, ethValue)
      .then((response) => {
        navigate("/funds/view");
      })
      .catch(() => {});
  }

  function withdraw() {
    try {
      FundsService.withdraw(selectedFund.index)
        .then((response) => {
          navigate("/funds/view");
        })
        .catch(() => {});
    } catch (error) {}
  }

  function reclaim() {
    try {
      FundsService.reclaim(selectedFund.index)
        .then((res) => {
          navigate("/funds/view");
        })
        .catch(() => {});
    } catch (error) {}
  }

  function getDate(timestamp) {
    var date = new Date(Number(timestamp) * 1000);

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    var formattedDate =
      day +
      "/" +
      month +
      "/" +
      year +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds;

    return formattedDate;
  }

  function refresh() {
    navigate("/funds/detail");
  }

  return (
    <>
      {selectedFund && (
        <div className="project-details-wrapper" style={{ paddingTop: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span
              className="project-detail-title"
              style={{ paddingBottom: "1.25rem" }}
            >
              {selectedFund.title}
            </span>

            <div style={{ paddingTop: "1.25rem" }}>
              <Button onClick={() => refresh()} variant="outlined">
                Refresh
              </Button>
            </div>
          </div>
          <span className="project-detail-author">
            Created by: {selectedFund.nickname}
          </span>
          <span className="project-detail-author">
            Date of creation: {getDate(selectedFund.creationDate)}
          </span>

          <span className="project-detail-author">
            Expires on: {getDate(selectedFund.expirationDate)}
          </span>

          <span
            className="project-detail-description"
            style={{ paddingTop: "1rem" }}
          >
            {selectedFund.description}
          </span>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <span className="project-detail-progress">
              Progress: {Number(selectedFund.currentAmount)} /{" "}
              {Number(selectedFund.targetAmount)} Wei{" "}
              {progress >= 100 && "(Goal reached)"}
              {Date.now() / 1000 >= selectedFund.expirationDate &&
                selectedFund.currentAmount < selectedFund.targetAmount &&
                "(Goal failed)"}
            </span>

            <LinearProgress variant="determinate" value={progress} />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2rem",
                marginTop: "1rem",
              }}
            >
              {Date.now() / 1000 <= selectedFund.expirationDate &&
                selectedFund.currentAmount < selectedFund.targetAmount && (
                  <div>
                    <TextField
                      id="outlined-basic"
                      label="Amount (wei)"
                      variant="outlined"
                      type="number"
                      defaultValue={0}
                      onChange={(event) => {
                        setEthValue(event.target.value);
                      }}
                    />
                  </div>
                )}

              {Date.now() / 1000 <= selectedFund.expirationDate &&
                selectedFund.currentAmount < selectedFund.targetAmount && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={() => {
                        contribute();
                      }}
                    >
                      Contribute
                    </Button>
                  </div>
                )}
            </div>

            {currentAccountAddress == selectedFund.creator &&
              selectedFund.withdrawn == false && (
                <div>
                  <Button
                    variant="outlined"
                    disabled={
                      selectedFund.currentAmount < selectedFund.targetAmount
                    }
                    onClick={() => {
                      withdraw();
                    }}
                  >
                    Withdraw
                  </Button>
                </div>
              )}

            {Date.now() / 1000 >= selectedFund.expirationDate &&
              selectedFund.currentAmount < selectedFund.targetAmount &&
              selectedFund.withdrawn == false && (
                <div>
                  <Button
                    variant="outlined"
                    disabled={
                      selectedFund.currentAmount <= selectedFund.targetAmount &&
                      Date.now() / 1000 <= selectedFund.expirationDate
                    }
                    onClick={() => {
                      reclaim();
                    }}
                  >
                    Reclaim
                  </Button>
                </div>
              )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectDetail;
