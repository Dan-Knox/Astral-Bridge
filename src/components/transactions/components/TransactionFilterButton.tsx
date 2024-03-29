import React, { useState, useEffect, useRef } from "react";
import { UilAngleDown } from "@iconscout/react-unicons";
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";
import { Breakpoints } from "../../../constants/Breakpoints";
import { useViewport } from "../../../hooks/useViewport";
import BottomSheetOptions from "../../BottomSheet/BottomSheetOptions";
import GreenDot from "../../Icons/GreenDot";
import { Icon } from "../../Icons/AssetLogs/Icon";
import { useTxFilterState } from "../TransactionsContext";

export const FormWrapper = styled.div`
    position: absolute;
    left: 20%;
    top: ${(props: any) => props.top};
    transform: translate(-50%, -50%);
    width: 300px;
    background-color: rgb(13, 17, 28);
    text-align: right;
    padding: 10px;
    padding-bottom: 20px;
    border: 1.5px solid rgb(60, 65, 80);
    border-radius: 15px;
    display: block;
    z-index: 10000000000;
    box-shadow: 14px 19px 5px 0px rgba(0, 0, 0, 0.85);
`;

const TRANSACTION_STATUSES = ["All Statuses", "Completed", "Pending", "Failed"];
const TRANSACTION_TYPES = ["All Types", "Deposits", "Withdrawals", "Approvals"];
export const TRANSACTION_CHAINS = [
  "All Chains",
  "Ethereum",
  "Polygon",
  "Arbitrum",
  "Optimism",
  "Fantom",
  "Kava",
  "BinanceSmartChain",
  "Moonbeam",
  "Avalanche",
];

const TransactionFilterButtons = () => {
  const [isChainMenuOpen, setIsChainMenuOpen] = useState<boolean>(false);
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState<boolean>(false);
  const [isTypeMenuOpen, setIsTypeMenuOpen] = useState<boolean>(false);

  const { filteredChain, filteredStatus, filteredType, clearFilters } = useTxFilterState()

  const { width } = useViewport();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIfClickedOutside = (e: Event) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node | null)) {
        setIsChainMenuOpen(false);
        setIsStatusMenuOpen(false);
        setIsTypeMenuOpen(false);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [isChainMenuOpen, isTypeMenuOpen, isStatusMenuOpen]);

  return (
    <>
      <div
        className="flex items-center gap-2 rounded-xl border-tertiary bg-blue-600 py-2 px-4 text-white hover:cursor-pointer hover:bg-blue-500"
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          e.stopPropagation();
          setIsChainMenuOpen((o: boolean) => !o);
          setIsStatusMenuOpen(false);
          setIsTypeMenuOpen(false);
        }}
        ref={ref}
      >
        <span>{filteredChain}</span>
        <UilAngleDown />
      </div>
      <div
        className="flex items-center gap-2 rounded-xl border-tertiary bg-blue-600 py-2 px-4 text-white hover:cursor-pointer hover:bg-blue-500"
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          e.stopPropagation();
          setIsTypeMenuOpen((o: boolean) => !o);
          setIsChainMenuOpen(false);
          setIsStatusMenuOpen(false);
        }}
        ref={ref}
      >
        <span>{filteredType}</span>
        <UilAngleDown />
      </div>
      <div
        className="flex items-center gap-2 rounded-xl border-tertiary bg-blue-600 py-2 px-4 text-white hover:cursor-pointer hover:bg-blue-500"
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          e.stopPropagation();
          setIsStatusMenuOpen((o: boolean) => !o);
          setIsTypeMenuOpen(false);
          setIsChainMenuOpen(false);
        }}
        ref={ref}
      >
        <span>{filteredStatus}</span>
        <UilAngleDown />
      </div>
      <div
        className="flex items-center gap-2 rounded-xl border-tertiary bg-gray-600 py-2 px-4 text-white hover:cursor-pointer hover:bg-gray-500"
        onClick={clearFilters}
      >
        <span>Clear Filters</span>
      </div>

      {width > 0 && width >= Breakpoints.sm1 ? (
        <>
          {isChainMenuOpen && (
            <FormWrapper top={"47%"}>
              {TRANSACTION_CHAINS.map((chain: string, index: number) => {
                return (
                  <ChainSelector
                    key={index}
                    chain={chain}
                    filteredChain={filteredChain}
                  />
                );
              })}
            </FormWrapper>
          )}
          {isTypeMenuOpen && (
            <FormWrapper top={"33.5%"}>
              {TRANSACTION_TYPES.map((txType: string, index: number) => {
                return (
                  <TxTypeSelector
                    key={index}
                    txType={txType}
                    filteredType={filteredType}
                  />
                );
              })}
            </FormWrapper>
          )}
          {isStatusMenuOpen && (
            <FormWrapper top={"33.5%"}>
              {TRANSACTION_STATUSES.map((status: string, index: number) => {
                return (
                  <TxStatusSelector
                    key={index}
                    status={status}
                    filteredStatus={filteredStatus}
                  />
                );
              })}
            </FormWrapper>
          )}
        </>
      ) : (
        <BottomSheetOptions
          hideCloseIcon
          open={true}
          setOpen={() => null}
          title={"Chain selection"}
        >
          {TRANSACTION_CHAINS.map((chain: string, index: number) => {
            return (
              <ChainSelector
                key={index}
                chain={chain}
                filteredChain={filteredChain}
              />
            );
          })}
        </BottomSheetOptions>
      )}
    </>
  );
};

const ChainSelector = ({
  chain,
  filteredChain
}: {
  chain: string;
  filteredChain: any
}) => {
    const { setFilteredChain } = useTxFilterState()
  return (
    <div
      className=" flex flex-row items-center gap-3 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-tertiary"
      onClick={() => setFilteredChain(chain)}
    >
      <div className="flex h-full">
        <Icon chainName={chain} className={"h-5 w-5"} />
      </div>
      <span
        className={`text-[15px] ${
          filteredChain === chain ? "text-white" : "text-gray-500"
        }`}
      >
        {chain}
      </span>
      {filteredChain && filteredChain == chain && <GreenDot />}
    </div>
  );
};

const TxStatusSelector = ({
  status,
  filteredStatus
}: {
  status: string;
  filteredStatus: any
}) => {
    const { setFilteredStatus  } = useTxFilterState()
  return (
    <div
      className=" flex flex-row items-center gap-3 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-tertiary"
      onClick={() => setFilteredStatus(status)}
    >
      {/* <div className="flex h-full">
        <chain.logo className={"h-5 w-5"} />
      </div> */}
      <span
        className={`text-[15px] ${
          filteredStatus === status ? "text-white" : "text-gray-500"
        }`}
      >
        {status}
      </span>
      {filteredStatus && filteredStatus == status && <GreenDot />}
    </div>
  );
};

const TxTypeSelector = ({
  txType,
  filteredType
}: {
  txType: string;
  filteredType: any
}) => {
    const { setFilteredType } = useTxFilterState()
  return (
    <div
      className=" flex flex-row items-center gap-3 rounded-lg px-2 py-2 hover:cursor-pointer hover:bg-tertiary"
      onClick={() => setFilteredType(txType)}
    >
      {/* <div className="flex h-full">
        <chain.logo className={"h-5 w-5"} />
      </div> */}
      <span className={`text-[15px] ${filteredType === txType ? "text-white" : "text-gray-500"}`}>{txType}</span>
      { filteredType === txType && <GreenDot />}
    </div>
  );
};

export default TransactionFilterButtons;
