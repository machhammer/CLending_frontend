import React, { useState, useEffect } from "react"
import { Box, Button, makeStyles } from "@material-ui/core"
import { useContractFunction, useNotifications } from "@usedapp/core"
import { utils } from 'ethers'



export const Deposit = ({CLendingManagerContract}) => {

    const [deposit, setDeposit] = useState(0)
    const { notifications } = useNotifications()

   
    const { send: stakeSend, state: stakeState } =
        useContractFunction(CLendingManagerContract, "depositAmount", {
            transactionName: "Deposit Amount",
        }) 
    const onChangeHandler = event => {
        setDeposit(event.target.value);
    };
    const onClickHandler = event => {
        stakeSend({ value: utils.parseEther(deposit) })
    };
    
    useEffect(() => {
        // Update the document title using the browser API
        console.log(stakeState)
        console.log(notifications)
        
      }, [stakeState, notifications]);

    return (
        <Box>
            <h1> Deposit </h1>
            <Box>
                Amount
                <input type="number" name="deposit" onChange={onChangeHandler}/>
                <Button onClick={onClickHandler}>Stake</Button>
            </Box>
            
        </Box >)

}