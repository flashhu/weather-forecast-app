import { Link, useHistory } from 'react-router-dom'
import { USER_MENU } from '../../constant/data'
import './index.css'

function MainMenu() {
    const history = useHistory();
    
    return (
        <div className="nav">
            {USER_MENU.map(item =>
                <div className={history.location.pathname === item.path ? "nav-item active": "nav-item"} key={item.path}>
                    {item.icon}
                    <Link to={item.path}>{item.name}</Link>
                </div>
            )}
        </div>
    )
}

export default MainMenu;