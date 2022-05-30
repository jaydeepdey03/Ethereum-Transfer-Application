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
    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' })
    const [loading, setLoading] = useState(false)
    const [count, setCount] = useState(0)

    useEffect(() => {
        const a = localStorage.getItem('transactionCount')
        setCount(a)
    }, [])
   


    const handleChange = (event, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: event.target.value }))
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

    const sendTransaction = async () => {
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

            const { addressTo, amount, keyword, message } = formData
            const transactionContract = getEthereumContract()

            const parseAmt = ethers.utils.parseEther(amount)

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: account,
                    to: addressTo,
                    gas: '0x5208', // 21000 gwei,
                    value: parseAmt._hex,

                }],
            })

            const transactionHash = await transactionContract.addToBlockchain(addressTo, parseAmt, message, keyword)

            setLoading(true)
            await transactionHash.wait()
            setLoading(false)

            // setting transaction count 
            const transactionCount = await transactionContract.getTransaction()
            setCount(transactionCount.toNumber())

        } catch (error) {
            console.error(error)
            throw new Error("No Ethereum Object")
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected()
    }, [])

    return (
        <TransactionContext.Provider value={{ connectWallet, account, connected, formData, handleChange, sendTransaction }}>
            {children}
        </TransactionContext.Provider>
    )
}