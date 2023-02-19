import Head from 'next/head'
import Image from 'next/image'
import React from "react";
import {useState} from 'react';
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [walletAddress,setwalletaddr]=useState("");
  async function requestaccount(){
      if(window.ethereum){
          try{
            const accounts=await window.ethereum.request({
              method:"eth_requestAccounts",
            }); 
            setwalletaddr(accounts[0]);
          }catch (error){
              console.log('Error Connecting..');
          }

      }else{
          console.log('not detected'); 
      }
  }
  return (
    <>
     <div className="card text-centre">
            <div className="card-header">Flash Loans</div>
            <div className="card-body">
                <h5 className="card-title">Balance: 00 ETH</h5>
                <p className="card-text">Account:{walletAddress}</p>
                <button type="button" className="btn btn-success" onClick={requestaccount}>
                    connect to metamask
                </button>
            </div>
            <div className="card-footer text-muted">The Four Muskteers</div>
        </div>
    </>
  )
}
