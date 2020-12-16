import { useEffect } from 'react'
import QRCode from 'qrcode.react'
import { get } from '../../util/request'
import { API_HP_IMAGE } from '../../constant/urls'
import logo from '../../assets/img/logo.svg'
import './index.css'

function Pic() {
    useEffect(()=>{
        const setImage = async () => {
            const data = await get(API_HP_IMAGE);
            if (data && data.images && data.images.length) {
                document.getElementsByClassName('hp_vidwrp')[0].style.backgroundImage = `url(https://www.bing.com${data.images[0].url})`;
                document.getElementsByClassName('hp-describ')[0].innerHTML = `${data.images[0].copyright}`
                return
            }
        }
        setImage()
    }, [])

    return (
        <div className="weather-recommend">
            <div className="hp_vidwrp"></div>
            <div className="hp-describ"></div>
            <div className="recommend-title">网站推荐</div>
            <div className="qr-wrapper">
                <QRCode
                    value='https://www.hznu.edu.cn/'// 生成二维码的内容
                    size={180} // 二维码的大小
                    fgColor="#222" // 二维码的颜色
                    imageSettings={{ // 中间有图片logo
                        src: logo,
                        x: null,
                        y: null,
                        height: 34,
                        width: 34,
                        excavate: true
                    }}
                />
                <div>
                    <p>🚀扫码了解更多信息</p>
                    <p>⭐最新资讯即刻掌握</p>
                </div>
            </div>
        </div>
    )
}

export default Pic;