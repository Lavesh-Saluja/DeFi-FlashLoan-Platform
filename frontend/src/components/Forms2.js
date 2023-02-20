import React from 'react';
import {useState,useContext,useEffect,useRef} from 'react';
import { WalletCheck } from '../App';
import {PASSIVE_INCOME_ADDRESS,passive_Income_abi} from "./Constant/index"
import {ethers} from 'ethers';
import Web3Modal from "web3modal"
const Forms2 = () => {
    const WalletHandler=useContext(WalletCheck)
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

      async function submit(event){
        event.preventDefault();
        const signers=await connectWallet(true);
        
        console.log(signers);

        // try{
        //     const passiveContract=new ethers.Contract(
        //         PASSIVE_INCOME_ADDRESS,
        //         passive_Income_abi,
        //         signers
        //       );
        //       const tx=await passiveContract.RequestFlashLoan(0xdc31ee1784292379fbb2964b3b9c4124d8f89c60,amtBorrow);
        //       await tx.wait();
        // }
        // catch(e){
        //     console.log(e);
        // }
      };

    const [token, setToken] = useState('USDC');
    const [amtDeposite, setamt] = useState();
    const [amtBorrow, setBorrow] = useState();
    return (
        <>
            <div class="grid md:grid-cols-2 md:gap-6">
                <div class="relative z-0 w-full mb-6 group">
                    <input type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required  value="USDC"/>
                    <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Token</label>
                </div>
                <div class="relative z-0 w-full mb-6 group">
                    <input type="text" name="floating_last_name" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(event)=>{setBorrow(event.target.value)}} />
                    <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Amount To Be Deposited</label>
                </div>
            </div>
            <div class="flex space-x-2 justify-center">
                <div>
                    <button type="button" class="inline-block px-6 py-2.5 bg-blue-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={submit}>Execute</button>
                    <button type="button" class="inline-block px-6 py-2.5 bg-purple-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Withdraw Profit</button>
                </div>
            </div>
        </>
    )
}
export default Forms2;