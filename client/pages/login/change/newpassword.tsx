import type { NextPage } from 'next'
import MainLayout from '../../../layouts/MainLayout'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { NotifyTimer } from '../../../components/Notification'
import axios from 'axios'
import { LOCAL_NAME } from '../../../utils/consts'


const NewPassword: NextPage = () => {

  const router = useRouter()

  const [password, setPassword] = useState<string>("")

  const changePassword = async () => {
    try {
      const {email} = router.query;
      let userData:any = {email: email, password: password}

      await axios.post(LOCAL_NAME + 'api/user/change/password', userData)
      return NotifyTimer(2000, 'Password changed').then(() => router.push('/login')) 
    } catch (e) {
      return NotifyTimer(2000, 'Something went wrong...').then(() => router.push('/login'))
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

                                <label data-aos="fade-up" htmlFor="username">The new password</label>
                                <input  type="text" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}></input>

                                <div onClick={changePassword}  data-aos="fade-down" className='form-login-button'>
                                    <a className='form-login-button__a' >Change it</a>
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

export default NewPassword