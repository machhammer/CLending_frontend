import { useEthers, useNotifications, useCall } from "@usedapp/core"
import CLendingManager from "./json/CLendingManager.json"
import ContractAddresses from "./json/map.json"



export const useLendingHooks = () => {

    const [balance, setBalance] = useState(0)
    const { notifications } = useNotifications()

    const { chainId } = useEthers()
    console.log("chain: ", chainId)

    const { abi } = CLendingManager
    const CLendingManagerInterface = new utils.Interface(abi)
 
    const CLendingManagerAddress = chainId ? ContractAddresses[chainId]["CLendingManager"][0] : undefined


}