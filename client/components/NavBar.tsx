import * as React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCaretDown, faCartArrowDown, faCartShopping, faSearch, faTrashCan, faUser} from '@fortawesome/free-solid-svg-icons'
import { useRouter } from "next/router"

export const Header = () => { 
    const router = useRouter()
    
    return (
    <div className="wrapper">
        <nav>
        <input type="checkbox" id="show-menu"/>
        <label htmlFor="show-menu" className="menu-icon"><FontAwesomeIcon icon={faCaretDown} /></label>
        <div className="content">
        <div className="logo">
            <a className="logo-a" onClick={() => router.push('/')}>Anime</a>
            </div>
            <ul className="links">
            <li><a onClick={() => router.push('/about')}>About</a></li>
            <li> <a onClick={() => router.push('/contact')}>Contact</a></li>
            <li>
            <a onClick={() => router.push('/clothing')} >Clothing</a> 
            </li>
            <li>
            <a onClick={() => router.push('/community')} >Community</a> 
            </li>
            <li>
            <a onClick={() => router.push('/blog')} >Blog</a>
            </li>
            <li>
            <a onClick={() => router.push('/search')} ><FontAwesomeIcon icon={faSearch}/></a>
            </li>
            <li>
            <a onClick={() => router.push('/user/profile')} ><FontAwesomeIcon icon={faUser}/></a>
            </li>
            <li>
            <a onClick={() => router.push('/user/basket')} ><FontAwesomeIcon icon={faCartShopping}/></a>
            </li>
            </ul>
        </div>
        </nav>
    </div>
    )
}