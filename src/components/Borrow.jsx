
import { Box, Button, makeStyles } from "@material-ui/core"
import { useEthers } from "@usedapp/core"

export const Borrow = () => {
    return (
        <Box>
            <h1> Borrow </h1>
            <Box>
                Amount
                <input type="text" name="name" />
                <Button>Stake</Button>
            </Box>
            
        </Box >)

}