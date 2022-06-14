import * as React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAnglesRight} from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faVk, faFacebook, faTelegram } from '@fortawesome/free-brands-svg-icons'
import { useRouter } from "next/router"

const Footer = () => {
    const router = useRouter()
    return (
        <div className='footer-gradient'>
            <div className='container'>
                <div className='row footer-shift'>
                    <div className='col-md-8 wrapper-footer'>
                        <ul className='footer-links-one'>
                            <div className='footer-links-pages'>
                                <li  className='footer-link-pg'><FontAwesomeIcon icon={faAnglesRight} className="link-icon" /><a onClick={() => router.push('/')} className="link-text-pg-footer">Home</a></li>
                                <li className='footer-link-pg'><FontAwesomeIcon icon={faAnglesRight} className="link-icon" /><a onClick={() => router.push('/about')}  className="link-text-pg-footer">About</a></li>
                                <li className='footer-link-pg'><FontAwesomeIcon icon={faAnglesRight} className="link-icon" /><a onClick={() => router.push('/contact')} className="link-text-pg-footer">Contact</a></li>
                                <li className='footer-link-pg'><FontAwesomeIcon icon={faAnglesRight} className="link-icon" /><a onClick={() => router.push('/legal')}  className="link-text-pg-footer">Legal</a></li>
                            </div>
                        </ul>
                        <ul className='footer-links-one'>
                            <div  className='footer-links-pages'>
                                <li className='footer-link-pg'><FontAwesomeIcon icon={faAnglesRight} className="link-icon" /><a onClick={() => router.push('/clothing')} className="link-text-pg-footer">Clothing</a></li>
                                <li className='footer-link-pg'><FontAwesomeIcon icon={faAnglesRight} className="link-icon" /><a onClick={() => router.push('/community')} className="link-text-pg-footer">Comminity</a></li>
                                <li className='footer-link-pg'><FontAwesomeIcon icon={faAnglesRight} className="link-icon" /><a onClick={() => router.push('/blog')}  className="link-text-pg-footer">Blog</a></li>
                                
                                <li className='footer-link-pg'><FontAwesomeIcon icon={faAnglesRight} className="link-icon" /><a onClick={() => router.push('/user/basket')}  className="link-text-pg-footer">Basket</a></li>
                            </div>
                        </ul>
                    </div>
                    <div className='col-md-4'>
                        <div className='footer-info'>
                            <h2>Follow us here :)</h2>
                            <ul className='footer-links-society'>
                                    <li className='footer-link-soc'><a href='https://www.facebook.com/daniel.fedoskov/' rel="noreferrer" target={"_blank"}><FontAwesomeIcon icon={faFacebook} className="link-icon-society" /></a></li>
                                    <li className='footer-link-soc'><a href='https://www.instagram.com/chappic2020/' rel="noreferrer" target={"_blank"}><FontAwesomeIcon icon={faInstagram} className="link-icon-society" /></a></li>
                                    <li className='footer-link-soc'><a href='https://t.me/RobotChappi2020' rel="noreferrer" target={"_blank"}><FontAwesomeIcon icon={faTelegram} className="link-icon-society" /></a></li> 
                                    <li className='footer-link-soc'><a href='https://vk.com/chappic2021' rel="noreferrer" target={"_blank"}><FontAwesomeIcon icon={faVk} className="link-icon-society" /></a></li> 
                            </ul>
                        </div>
                    </div>
                    <div className='wrapper-footer-down'>
                        <div className='footer-info-tech'>
                                Web-site made with Nest, Next, Redux
                        </div>
                        <div className='footer-info-text'>
                            <h4>ANIME © 2022</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
)}


export default Footer;