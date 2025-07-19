import React, { useEffect, useState } from "react";
import Web3 from "web3";
import Navbar from "./Navbar";
import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const [ethBalance, setEthBalance] = useState("0");

  useEffect(() => {
    const init = async () => {
      await loadWeb3();
      await loadBlockchainData();
    };

    init();
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);

    const balance = await web3.eth.getBalance(accounts[0]);
    setEthBalance(balance);
  };

  return (
    <div>
      <Navbar account={account} />
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content mr-auto ml-auto">
              <a
                href="http://www.dappuniversity.com/bootcamp"
                target="_blank"
                rel="noopener noreferrer"
              ></a>
              <h1>Hello, World</h1>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
