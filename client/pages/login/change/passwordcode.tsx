import type { NextPage } from 'next'
import MainLayout from '../../../layouts/MainLayout'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { NotifyTimer } from '../../../components/Notification'
import { SECRET_KEY } from '../../../utils/consts'
import { useLocation, useParams } from 'react-router-dom'
const CryptoJS = require("crypto-js");

const Passwordcode: NextPage = () => {

  const router = useRouter()

  const [code, setCode] = useState<string>("")

  const checkIt = async () => {
    try {
      const dataJson:any = localStorage.getItem('CODE')
      const data = JSON.parse(dataJson)
      const decCode = CryptoJS.AES.decrypt(data.code, `${SECRET_KEY}`);
      const plaintext = decCode.toString(CryptoJS.enc.Utf8);
      const {email} = router.query;
      if (code == plaintext) {
        localStorage.removeItem('CODE')
        return router.push(`/login/change/newpassword?email=${email}`)
      }
      return NotifyTimer(2000, 'Error!').then(() => router.push('/login'))
    } catch(e) {
      return NotifyTimer(2000, 'Something went wrong...')
    }
  }

  return (
    <>
      <MainLayout description={"We are a large anime online store that has everything from clothes to its own community! Come to us! You'll like it, honey!"} key={"Anime Change Password"} keywords={"anime, store, anime hoodie, anime clothes, anime community, change password"} title={`Anime Store | Change Password 💻`}>
      <div>
        <div className="home-page">
            <div className="container">
                <div className='row'>
                    <div className='col-lg-1 col-md-1 col-sm-1 col-xs-1'>
                      <div data-aos="fade-up" className='shape-1'></div>
                    </div>
                    <div className='col-lg-10 col-md-10 col-sm-10 col-xs-10'>
                        <div className='form-login-div'>
                            <form className='form-login'>
                                <h3 data-aos="fade-down">Change password</h3>

                                <label data-aos="fade-up" htmlFor="username">The received code</label>
                                <input  type="text" placeholder="Code" value={code} onChange={e => setCode(e.target.value)}></input>

                                <div onClick={checkIt}  data-aos="fade-down" className='form-login-button'>
                                    <a className='form-login-button__a' >Send it</a>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='col-lg-1 col-md-1 col-sm-1 col-xs-1'>
                      <div data-aos="fade-down" className='shape-2'></div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      </MainLayout>
    </>
  )
}

export default Passwordcode