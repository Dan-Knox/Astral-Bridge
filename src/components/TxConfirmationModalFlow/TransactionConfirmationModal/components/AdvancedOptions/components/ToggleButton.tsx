import { MintFormText2 } from "../../../../../CSS/WalletModalStyles";
import styled from "styled-components"
import { Tab } from '../../../../../WalletModal/WalletModal';

export const MinFormToggleButtonContainer = styled.div`
  height: 40px;
  display: flex;
  margin: 15px 5px;
  background: rgb(15, 25, 55);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  &:hover {
    background: rgb(34, 43, 68);
  }
`;

export const MintToggleButton = styled.div`
    width: 50%;
    height: 100%;
    border-top-${(props: any) => props.side}-radius: 10px;
    border-bottom-${(props: any) => props.side}-radius: 10px;
    border-right: 1.5px solid rgb(14, 22, 39);
    background: ${(props: any) =>
      props.active ? "rgb(59,130,246)" : "rgb(43, 49, 102)"};
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${(props: any) =>
      props.active ? "rgb(75,135,220)" : "rgb(43, 49, 102)"};
    color: ${(props: any) => (props.active ? "White" : "rgb(74, 107, 161)")};
    &:hover {
        cursor: pointer;
    }
`;

interface IToggleButton {
  side: string;
  text: string;
  active: boolean;
  onClick: (index: number) => void;
}

interface IToggleContainer {
  activeButton: Tab;
  tabs: Tab[];
  setActiveButton: React.Dispatch<React.SetStateAction<Tab>>;
}
const ToggleButton = ({ side, text, active, onClick }: IToggleButton) => {
  return (
    <MintToggleButton side={side} active={active} onClick={onClick}>
      <MintFormText2>{text}</MintFormText2>
    </MintToggleButton>
  );
};
const ToggleButtonContainer = ({
  activeButton,
  tabs,
  setActiveButton,
}: IToggleContainer) => {
  const tabSelect = (index: number): void =>
    setActiveButton(tabs[index] as Tab);

  return (
    <MinFormToggleButtonContainer>
      {tabs.map((tab: Tab, index: number) => {
        return (
          <ToggleButton
            key={index}
            side={tab.side}
            text={tab.tabName}
            active={activeButton.tabNumber == index}
            onClick={() => tabSelect(index)}
          />
        );
      })}
    </MinFormToggleButtonContainer>
  );
};

export default ToggleButtonContainer;