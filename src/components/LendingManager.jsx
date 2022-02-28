import React, { useState, useEffect } from "react"
import { Box, Button, makeStyles } from "@material-ui/core"
import { useEthers, useNotifications, useCall } from "@usedapp/core"
import { Contract } from '@ethersproject/contracts'
import { utils } from 'ethers'
import CLendingManager from "./json/CLendingManager.json"
import ContractAddresses from "./json/map.json"


export const LendingManager = () => {

    const [balance, setBalance] = useState(0)
    const { notifications } = useNotifications()

    const { chainId } = useEthers()
    console.log("chain: ", chainId)

    const { abi } = CLendingManager
    const CLendingManagerInterface = new utils.Interface(abi)
 
    const CLendingManagerAddress = chainId ? ContractAddresses[chainId]["CLendingManager"][0] : undefined

    console.log("address: ", CLendingManagerAddress)


    const { value, error } = 
        useCall(new Contract(CLendingManagerAddress, CLendingManagerInterface),
            'totalSupply',
            []
        )
        
    const onClickHandler = event => {
        console.log("balance: ", utils.formatEther(value))
    };
    
    return (
        <Box>
            <h1> Lending Manager </h1>
            <Box>
                Balance
                <Button onClick={onClickHandler}>Update</Button>

            </Box>
            
        </Box >)

}