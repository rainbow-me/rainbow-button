import WalletConnect from '@walletconnect/client';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import {
    setConnector as rawSetConnector,
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
    console.log('on v1 useWalletConnectState', connector, accounts)

    const setConnector = (connector: WalletConnect | null) => dispatch(rawSetConnector(connector))

    return ({
        connector,
        accounts,
        chainId,
        setConnector
    })
}
