/* eslint-disable spaced-comment */
/// <reference types="react-scripts" />
import { useEthers } from "@usedapp/core"
import { makeStyles } from "@material-ui/core"
import { Wallet } from "./wallet/Wallet"
import { Deposit } from "./Deposit"
import { Borrow } from "./Borrow"
import { LendingManager } from "./LendingManager"
import ErrorBoundary from "./ErrorBoundary"
import { Contract } from '@ethersproject/contracts'
import ContractAddresses from "./json/map.json"
import CLendingManager from "./json/CLendingManager.json"
import { utils } from 'ethers'





const useStyles = makeStyles((theme) => ({
    title: {
        color: theme.palette.common.black,
        textAlign: "center",
        padding: theme.spacing(4)
    }
}))

export const Main = () => {

    const classes = useStyles()
    const { chainId } = useEthers()
    const { account } = useEthers()

    if (chainId === undefined) return (<div>Please connect</div>)


    const CLendingManagerAddress = chainId ? ContractAddresses[chainId === 1337 ? 5777 : chainId]["CLendingManager"][0] : undefined

    const { abi } = CLendingManager
    const CLendingManagerInterface = new utils.Interface(abi)
    const CLendingManagerContract = new Contract(CLendingManagerAddress, CLendingManagerInterface)


    console.log("Chain ID: ", chainId)
    console.log("Address: ", CLendingManagerAddress)
   
        

    return (<>
        <h2 className={classes.title}>Dapp Token App</h2>
            <Wallet account={account}/>
            <Deposit CLendingManagerContract={CLendingManagerContract}/>
            <Borrow/>
            {/* <LendingManager/> */}
         
    </>)
}
