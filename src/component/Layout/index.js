import Menu from '../../component/Menu'
import ErrorBoundary from '../../component/ErrorBoundary'
import './index.css'

function Layout({ children }) {
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

export default Layout