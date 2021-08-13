import WalletConnect from '@walletconnect/client';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import {
    setConnector as rawSetConnector,
    setAccounts as rawSetAccounts,
    setChainId as rawSetChainId,
} from '../store';

const selector = createSelector(
    ({connector}) => ({connector}),
    ({connector}) => {
        return {
            connector,
            accounts: connector?.accounts,
            chainId: connector?.chainId,
        }
    }
  );

export default function useWalletConnectState() {
    const {
        connector,
        accounts,
        chainId,
    } = useSelector(selector);

    const dispatch = useDispatch()

    const setConnector = (connector: WalletConnect | null) => dispatch(rawSetConnector(connector))
    const setAccounts = (accounts: string[] | null) => dispatch(rawSetAccounts(accounts))
    const setChainId = (chainId: string | null) => dispatch(rawSetChainId(chainId))

    return ({
        connector,
        accounts,
        chainId,
        setAccounts,
        setChainId,
        setConnector
    })
}
