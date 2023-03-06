import { Icon } from "../../Icons/AssetLogs/Icon";
import Identicon from "../../Identicon/Identicon";
import { StyledTokenRow } from "./HeaderRow";
import {
  UilExclamationTriangle,
  UilSpinnerAlt,
  UilCheckCircle,
} from "@iconscout/react-unicons";
import { formatTime } from "../../../utils/date";
import { UserTxType } from "./TransactionTable";

const Spinner = () => {
  return <UilSpinnerAlt className={" h-5 w-5 animate-spin text-gray-400"} />;
};
export interface RowData {
  txHash: string;
  Id: string;
  date: string;
  type: string;
  chain: string;
  status: string;
  currency: string;
  amount: string;
}

const TransactionIdRow = (data: UserTxType) => {
  const date = formatTime(Math.floor(data.date / 1000).toString(), 0);

  const getColour = (status: string): string => {
    if (status === "pending") return "text-gray-400";
    else if (status === "completed") return "text-green-500";
    else return "text-red-500";
  };
  const getIcon = (status: string) => {
    if (status === "pending") return <Spinner />;
    else if (status === "completed")
      return <UilCheckCircle className={"h-5 w-5 text-green-500"} />;
    else return <UilExclamationTriangle className={"h-5 w-5 text-red-500"} />;
  };
  const statusColour = getColour(data.status);

  return (
    <StyledTokenRow>
      <div className="">
        <span>{data.Id}</span>
      </div>
      <div className="flex items-center gap-2 text-blue-600">
        <Identicon size={18} />
        <span>{`${data.txHash.substring(0, 12)}...${data.txHash.substring(
          data.txHash.length - 12,
          data.txHash.length
        )}`}</span>
      </div>
      <div className="">
        <span>{date}</span>
      </div>
      <div className="">
        <span>{data.type}</span>
      </div>
      <div className="flex items-center gap-2">
        <Icon chainName={data.chain} className="h-5 w-5" />
        <span>
          {data.chain === "BinanceSmartChain" ? "Binance" : data.chain}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span>{data.amount}</span>
        <Icon chainName={data.currency} className="h-5 w-5" />
      </div>
      <div className="flex items-center gap-2">
        {getIcon(data.status)}
        <span className={`${statusColour}`}>{data.status}</span>
      </div>
    </StyledTokenRow>
  );
};

export default TransactionIdRow;