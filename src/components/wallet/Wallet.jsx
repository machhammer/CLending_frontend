import { Box, makeStyles } from "@material-ui/core"
import { formatEther } from '@ethersproject/units'
import { useEtherBalance } from "@usedapp/core"



export const Wallet = ({chainId, account}) => {

    const etherBalance = useEtherBalance(account)
    
    return (
        <Box>
            <Box>
                {etherBalance && <p>Your Balance: {formatEther(etherBalance, 9)}</p>}
            </Box>
            
        </Box >)
}