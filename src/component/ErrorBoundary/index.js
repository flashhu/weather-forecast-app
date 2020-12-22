import { Component } from 'react';
import errorImg from '../../assets/img/error.svg'
import './index.css'

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            errorInfo: '',
            hasError: false,
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.log({ error, errorInfo });
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-tip">
                    <div>
                        <img alt="tip" src={errorImg} />
                        <p style={{ textAlign: 'center' }}>应用服务出现错误，请检查网络或重启软件！</p>
                    </div>
                </div>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary;