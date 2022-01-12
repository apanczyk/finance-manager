import { Toolbar } from "@mui/material";
import React from "react";
import ChartFragment from "../../fragments/ChartFragment";
import Operation from "../../model/Operation";
import IUser from "../../model/types/UserType";
import IWallet from "../../model/types/WalletType";
import WalletSelect from "./WalletSelect";

interface UserBoardViewProps {
    currentUser: IUser | undefined
}

export default function UserBoardView(props: UserBoardViewProps) {
    const [wallet, setWallet] = React.useState<string>()
    const [operations, setOperations] = React.useState(Array<Operation>())
    const [walletList, setWalletList] = React.useState<IWallet[]>([])

    const { currentUser } = props;

    const changeWallet = (walletId: string) => {
        setWallet(walletId)
    }

    const changeWalletList = (walletList: IWallet[]) => {
        setWalletList(walletList)
    }

    return (
        <div >
            {wallet && (<ChartFragment
                wallet={wallet!}
                operations={operations}
            />
            )}
            <Toolbar>
                <WalletSelect currentUser={currentUser} outerChange={false} changeWallet={changeWallet} changeWalletList={changeWalletList} />
            </Toolbar>
        </div >
    );
}
