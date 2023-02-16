import { UilAngleDown } from "@iconscout/react-unicons";
import BtcIcon from "../../../../public/svgs/assets/renBTC.svg";
import { Icon as AssetIcon } from "../../Icons/AssetLogs/Icon";

interface IDropdown {
  text: string;
  dropDownType: string;
  Icon: React.SVGProps<SVGSVGElement>;
  type: string;
  setType: any;
  setShowTokenModal: any;
  setChainType: any
}
const Dropdown = ({
  text,
  dropDownType,
  Icon,
  type,
  setType,
  setShowTokenModal,
  setChainType
}: IDropdown) => {
  // console.log("iconnnnnn", Icon);
  const on = () => {
    setType(dropDownType);
    setShowTokenModal(true);
    setChainType()
  };
  return (
    <div
      className="hover: my-2 flex w-full cursor-pointer justify-between gap-2 rounded-md border border-gray-600 bg-secondary px-3 py-[6px]"
      onClick={on}
    >
      <div className="flex items-center justify-center gap-2">
        <div className="h-6 w-6">
          <AssetIcon chainName={Icon} className="h-6 w-6" />
        </div>
        {dropDownType === "currency" ? (
            <span className="text-[15px]">Move {text}</span>
     
        ) : type === "FromChain" ? (
          <span className="text-[15px]">From {text}</span>
        ) : (
          <span className="text-[15px]">To {text}</span>
        )}
      </div>
      <div className="h-6 w-6">
        <UilAngleDown className="h-6 w-6 font-bold text-blue-600" />
      </div>
    </div>
  );
};

export default Dropdown;