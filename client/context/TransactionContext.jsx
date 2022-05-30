import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { contractABI, contractAddress } from '../utils/constants'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const MySwal = withReactContent(Swal)

export const TransactionContext = React.createContext();

const { ethereum } = global

console.log(ethereum)

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)

    console.log({ provider, signer, transactionContract })
}


export const TransactionProvider = ({ children }) => {

    const [connected, setConnected] = useState(false)
    const [account, setAccount] = useState('')

    const [formData, setFormData] = useState({addressTo: '', reciever: '', keyword: '', message: ''})

    const handleChange = (event, name) => {
        setFormData((prevState) => ({...prevState, [name]: event.target.value}))
    }
    

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png',
                    imageHeight: '100',
                    imageWidth: '100',
                    text: 'Connect to Metamask!',
                })
            }

            const account = await ethereum.request({
                method: 'eth_accounts',
            })

            if (account.length) {
                setAccount(account[0])
                setConnected(true)
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png',
                    imageHeight: '100',
                    imageWidth: '100',
                    text: 'No Account Found!',
                })
                setConnected(false)
            }

            console.log(account)
        }
        catch (error) {
            console.error(error)
            setConnected(false)
        }
    } 


    const connectWallet = async () => {
        try {
            if (!ethereum) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png',
                    imageHeight: '100',
                    imageWidth: '100',
                    text: 'Connect to Metamask!',
                })
            }

            const account = await ethereum.request({
                method: 'eth_requestAccounts',
            })

            setAccount(account[0])

        } catch (error) {
            console.error(error)
            throw new Error("No Ethereum Object")
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected()
    }, [])

    return (
        <TransactionContext.Provider value={{ connectWallet, account, connected, formData, handleChange, setFormData }}>
            {children}
        </TransactionContext.Provider>
    )
}