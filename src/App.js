import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { useSDK } from "@metamask/sdk-react";
import * as FundService from "./services/FundsService";
import FundTile from './components/FundTile';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import ProjectsView from './components/ProjectsView';
import ProjectDetail from './components/ProjectDetail';
import CreateProject from './components/CreateProject';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import MyProjects from './components/MyProjects';
import Web3 from 'web3';

function App() {
  const [account, setAccount] = useState();
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  const [isMetamaskPresent, setisMetamaskPresent] = useState(true)

  const [selectedFund, setSelectedFund] = useState(null)
  // const navigate = useNavigate();
  
  const [currentAccountAddress, setCurrentAccountAddress] = useState("")

  useEffect(() => {
    // navigate("")
  }, [currentAccountAddress])
  

  useEffect(() => {
    async function loadWeb3() {
      if (window.ethereum) {
        let web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3.eth.getAccounts();
          FundService.setAccountAddress(accounts[0]);
          setCurrentAccountAddress(accounts[0])
        } catch (error) {
          console.error('User denied account access');
        }
      } else {
        setisMetamaskPresent(false)
      }
    }

    window.ethereum.on("accountsChanged", function (accounts) {
      console.log("changed!!!!!!!!!!!!!!!", accounts[0]);
      FundService.setAccountAddress(accounts[0]);
      setCurrentAccountAddress(accounts[0])
    });

    loadWeb3();
  }, []);
  

  const connect = async () => {
    try {

      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const _accounts = await FundService.getWeb3().eth.getAccounts();
      console.log("ACCOUNTS", _accounts)


      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
      FundService.setAccountAddress(accounts?.[0])
      console.log(accounts)
    } catch (err) {
      console.warn("failed to connect..", err);
    }
  };

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
      <CssBaseline />
    <Router>
    <div className="App">
        <div className='nav-bar'>
          <span>
           <Link to="/funds/view">All funds</Link>
          </span>
          <span>
           <Link to="/me/funds">My funds</Link>
          </span>

          <span>
          <Link to="/funds/create">Create fund</Link>
          </span>
        </div>
        <Routes>
          <Route path="/funds/view" element={<ProjectsView selectedFund={selectedFund} setSelectedFund={setSelectedFund} />} />
          <Route path="/me/funds" element={<MyProjects setSelectedFund={setSelectedFund} currentAccountAddress={currentAccountAddress} />} />
          <Route path="/funds/create" element={<CreateProject />} />
          <Route path="/funds/detail" element={<ProjectDetail currentAccountAddress={currentAccountAddress} selectedFund={selectedFund}/>} />
        </Routes>
        </div>


{/* 
    {
      isMetamaskPresent ? 
       <div className="App">
        <div className='nav-bar'>
          <span>
           <Link to="/funds/view">All funds</Link>
          </span>
          <span>
           <Link to="/me/funds">My funds</Link>
          </span>

          <span>
          <Link to="/funds/create">Create fund</Link>
          </span>
        </div>

      <button style={{ padding: 10, margin: 10 }} onClick={connect}>
        Connect
      </button>

      {connected && (
        <div>
          <>
            {chainId && `Connected chain: ${chainId}`}
            <p></p>
            {account && `Connected account: ${account}`}
          </>
        </div>
      )}
    </div> :
    <div>
      <span>Please install metamask</span>
    </div>
    } */}
        </Router>
        </ThemeProvider>
    </>
  );
}

export default App;
