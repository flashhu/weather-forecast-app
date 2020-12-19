import { useEffect } from 'react'
import { observer } from 'mobx-react'
import Menu from '../../component/Menu'
import ErrorBoundary from '../../component/ErrorBoundary'
import { useUserStore } from '../../hooks/useStore'
import './index.css'

function Layout({ children }) {
    const userStore = useUserStore()

    useEffect(() => {
        if (window.localStorage.token && window.localStorage.autoLogin !== '0' && !userStore.user) {
            userStore.loginWithToken();
        } 
    }, [])

    return (
        <div className="layout">
            <div className="content">
                <ErrorBoundary>
                    {children}
                </ErrorBoundary>
            </div>
            <Menu />
        </div>
    )
}

export default observer(Layout)