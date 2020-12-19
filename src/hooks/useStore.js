import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

function useStores() {
    return useContext(MobXProviderContext)
}

export function useUserStore() {
    const { userStore } = useStores();
    return userStore
}

export function useHistoryStore() {
    const { historyStore } = useStores();
    return historyStore
}

export default useStores