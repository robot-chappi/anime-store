import type { NextPage } from 'next'
import MainLayout from '../../../layouts/MainLayout'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { NotifyTimer } from '../../../components/Notification'
import axios from 'axios'
import { LOCAL_NAME, SECRET_KEY } from '../../../utils/consts'
const CryptoJS = require("crypto-js");


const Change: NextPage = () => {

  const router = useRouter()

  const [email, setEmail] = useState<string>("")

  const randomNumber = (max:number) => {
    return Math.floor(Math.random() * max);
  }

  const sendEmail = async () => {
    try {
      const code = randomNumber(10000000000)
      await axios.post(LOCAL_NAME + `api/email/checking/email?email=${email}&code=${code}`)
      
      const hashCode = CryptoJS.AES.encrypt(code.toString(), `${SECRET_KEY}`);
      localStorage.setItem('CODE', JSON.stringify({'code': `${hashCode}`}))

      
      return router.push(`/login/change/passwordcode?email=${email}`)
    } catch (e) {
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

                                <label data-aos="fade-up" htmlFor="username">Email</label>
                                <input  type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}></input>
                                
                                <div onClick={sendEmail}  data-aos="fade-down" className='form-login-button'>
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

export default Change