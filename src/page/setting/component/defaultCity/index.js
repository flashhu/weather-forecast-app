import { LeftOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

function DefaultCity() {
    return (
        <div className="setting-city editPage-wrapper">
            <div className="topbar">
                <Link to="/setting">
                    <LeftOutlined />
                </Link>
                默认城市
            </div>
        </div>
    )
}

export default DefaultCity