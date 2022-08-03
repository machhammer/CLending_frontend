import { useEtherBalance } from "@usedapp/core";
import { utils } from "ethers";
import Image from "react-bootstrap/Image";
import logo from "../../images/eth.png";
import { Table } from "react-bootstrap";

export const Wallet = ({ network, account }) => {
  const etherBalance = useEtherBalance(account);

  const etherBalanceFormat = etherBalance
    ? Math.round(utils.formatEther(etherBalance) * 1e4) / 1e4
    : "undefined";

  return (
    <div className="p-2 d-flex justify-content-between border rounded-2">
      <Table borderless>
        <thead>
          <tr>
            <th>Asset</th>
            <th>Balance</th>
            <th>Network</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img src={logo} width="30" />
            </td>
            <td>{etherBalance && etherBalanceFormat} </td>
            <td>
              {network} {account}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
