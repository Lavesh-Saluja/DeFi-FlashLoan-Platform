import logo from './logo.svg';
import './App.css';
import './index.css' ;
import Section from "./components/Section.js"
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Arbitrage from './components/Arbitrage';
import LoginPage from './components/LoginPage';
import {useEffect,createContext,useState} from 'react';
const WalletCheck=createContext();
function App() {
  const [walletConnected,setWalletConnected]=useState(false);
const [walletAddress,setWalletAddress] =useState();
const [signer,setSigner] = useState();
const [provider,setProvider] = useState();
const [loading, setLoading] = useState(false);

useEffect(()=>{
  
},[walletConnected]);
  return (
    
    <div className="App">
    <WalletCheck.Provider value={{walletConnected,setWalletConnected,walletAddress,setWalletAddress,signer,setSigner,provider,setProvider}}>
      <LoginPage/>
    <Section/>
    </WalletCheck.Provider>
    </div>
    
    
    

  );
}
export {WalletCheck}
export default App;
