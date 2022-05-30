import React, { useState, useContext } from 'react'
import { HiMenuAlt4 } from 'react-icons/hi'
import { AiOutlineClose } from 'react-icons/ai'
import { TransactionContext } from '../context/TransactionContext';

const NavBarItem = ({ title, classprops }) => (
    <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false)

    const {connectWallet, connected} = useContext(TransactionContext)

    console.log(connected)

    return (
        <nav className="w-full flex md:justify-center justify-between items-center p-4">
            <div className="md:flex-[0.5] flex-initial justify-center items-center">
                <img src={`/logo.png`} alt="logo" className="w-32 cursor-pointer" />
            </div>
            <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
                {["Market", "Exchange", "Tutorials"].map((item, index) => (
                    <NavBarItem key={item + index} title={item} />
                ))}
                {connected ? <li className="bg-[#8c9dd7] flex justify-center items-center py-2 px-7 mx-4 rounded-full cursor-default">
                    <h1 className={`h-3 w-3 mr-2 rounded-full ${connected ? "bg-green-500" : "bg-red-500"}`}></h1>
                    Connected
                </li> : <li onClick={connectWallet} className="bg-[#2952e3] py-2 px-7 mx-4 flex justify-center items-center rounded-full cursor-pointer hover:bg-[#2546bd]">
                    <h1 className={`h-3 w-3 mr-2 rounded-full ${connected ? "bg-green-500" : "bg-red-500"}`}></h1> Connect to Wallet
                </li>}
                <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
                    Login
                </li>
            </ul>
            <div className="flex relative">
                {!toggleMenu && (
                    <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
                )}
                {toggleMenu && (
                    <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
                )}
                {toggleMenu && (
                    <ul
                        className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
                    >
                        <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
                        {["Market", "Exchange", "Tutorials", "Wallets"].map(
                            (item, index) => <NavBarItem key={item + index} title={item} classprops="my-2 text-lg" />,
                        )}
                    </ul>
                )}
            </div>
        </nav>
    )
}

export default Navbar
