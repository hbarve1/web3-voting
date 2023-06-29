import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CreateVote from "./CreateVote";
import Votes from "./Votes";
import Navbar from "./Navbar";
import { connect, getContract } from "./contract";

function App() {
  const [connected, setConnected] = useState(false);
  const [contract, setContract] = useState<any>(null);
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    window.ethereum
      .request({
        method: "eth_accounts",
      })
      .then((accounts: string[]) => {
        if (accounts.length > 0) {
          handleInit();
        } else {
          setConnected(false);
        }
      });
  }, []);

  const handleInit = () => {
    setConnected(true);
    getContract().then(({ contract, signer }) => {
      setContract(contract);

      if (contract) {
        signer.getAddress().then((address: string) => {
          contract.members(address).then((result) => setIsMember(result));
        });
      }
    });
  };

  const connectCallback = async () => {
    const { contract } = await connect();
    setContract(contract);
    if (contract) {
      setConnected(true);
    }
  };

  const becomeMember = async () => {
    if (!contract) {
      alert("Please connect to metamask.");
      return;
    }

    await contract
      .join()
      .then(() => {
        alert("Joined");
        setIsMember(true);
      })
      .catch((err: any) => {
        alert(err.message);
      });
  };

  return (
    <Router>
      <Navbar
        connect={connectCallback}
        connected={connected}
        becomeMember={becomeMember}
        isMember={isMember}
      />

      <div className="container">
        <Routes>
          <Route
            path="/create-vote"
            element={<CreateVote contract={contract} />}
          />
          <Route path="/votes" element={<Votes contract={contract} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
