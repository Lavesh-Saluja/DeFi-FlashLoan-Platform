import React,{useState,useEffect,useRef,useContext, createContext} from 'react'
import Web3Modal from "web3modal"
import {ethers} from "ethers" 
import {WalletCheck} from '../App'

const LoginPage = () => {

    const WalletHandler =useContext(WalletCheck);
    console.log(WalletHandler,"LoginPage");

    function NavbarComponent(){
        return(          
            <header className="text-gray-600 body-font">
              <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-green-500 rounded-full" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                  </svg>
                  <span className="ml-3 text-xl">Money Mask</span>
                </a>
                <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                 <a className="mr-5 hover:text-gray-900">Arbitrage Trading</a>
                  <a className="mr-5 hover:text-gray-900">Yield Farming</a>
                  <a className="mr-5 hover:text-gray-900">Collateral Swap</a>
                </nav>
                {
                    WalletHandler.walletConnected?<p className="card-text">Account:{WalletHandler.walletAddress}</p>:<button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0" onClick={connectWallet}>Connect To Metamask
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg> 
                  </button>
                }
                
                
              </div>
            </header>
            
            
            
            
                );
    }

 

    const web3ModalRef = useRef();
    const getProviderOrSigner = async (needSigner = false) => {
        // Connect to Metamask
        // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
        const provider = await web3ModalRef.current.connect();
        const web3Provider = new ethers.providers.Web3Provider(provider);
    
        // If user is not connected to the Goerli network, let them know and throw an error
        const { chainId } = await web3Provider.getNetwork();
        if (chainId !== 5) {
          window.alert("Change the network to Goerli");
          throw new Error("Change network to Goerli");
        }
          const signer = web3Provider.getSigner();
          WalletHandler.setSigner(signer);
          WalletHandler.setProvider(web3Provider);
          console.log('------------------------------------');
          console.log(WalletHandler.provider);
          console.log('------------------------------------');
          WalletHandler.setWalletAddress(await signer.getAddress());
          console.log(WalletHandler.walletAddress)
          return signer;

      };
      const connectWallet = async () => {
        web3ModalRef.current = new Web3Modal({
            network: "goerli",
            providerOptions: {},
            disableInjectedProvider: false,
          });
        try {
          // Get the provider from web3Modal, which in our case is MetaMask
          // When used for the first time, it prompts the user to connect their wallet
          await getProviderOrSigner();
          WalletHandler.setWalletConnected(true);
          console.log(WalletHandler.walletConnected);
        } catch (err) {
          console.error(err);
        }
      };
  return (
<NavbarComponent></NavbarComponent>
   
  )
}

export default LoginPage