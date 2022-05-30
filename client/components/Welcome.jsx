import React, { useState, useContext } from 'react'
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import Connectrequest from './Connectrequest';
import { TransactionContext } from '../context/TransactionContext';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
        className="my-2 p-2 outline-none bg-transparent border-none text-sm white-glassmorphism shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={value}
        type={type}
        step="0.0001"
        placeholder={placeholder}
        onChange={() => handleChange(e)}
    />
);

const Welcome = () => {

    const {connectWallet, connected, account,formData, handleChange, setFormData } = useContext(TransactionContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        const {addressTo, reciever, keyword, message} = formData

        if(!addressTo || !reciever || !keyword || !message){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Fill all the fields!',
            })
        }
    }

    if (connected) {
        return (
            <div className="flex w-full justify-center items-center">
                <div className="flex md:flex-row flex-col items-center justify-center md:p-20 py-12 px-4">
                    <div className="flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10">
                        <h1 className='text-4xl font-bold text-white'>Your Card</h1>
                        <div className="p-3 flex justify-end items-start flex-col rounded-xl h-[24rem] sm:w-[52rem] w-full my-5 eth-card .white-glassmorphism ">
                            <div className="flex justify-between flex-col w-full h-full">
                                <div className="flex h-[10%] justify-between items-center">
                                    <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                        <SiEthereum fontSize={21} color="#fff" />
                                    </div>
                                    <span className='text-white font-bold'>Etherium</span>
                                    <BsInfoCircle fontSize={17} color="#fff" />
                                </div>
                                <div className='flex h-[90%] space-y-7 items-start m-10 justify-end flex-col'>
                                    <p className="text-white font-semibold text-3xl">
                                       {account}
                                    </p>
                                    <p className=" text-lg font-semibold text-white mt-1">
                                        Your name
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='m-10 flex flex-col space-y-6 items-center'>
                            <h1 className='text-white text-4xl font-bold'>Send Money</h1>
                            <div className="p-10 space-y-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                                <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
                                <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
                                <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} />
                                <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                                >
                                    Send now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <>
                <Connectrequest />
            </>
        )
    }
}

export default Welcome
