import type { NextPage } from 'next'
import MainLayout from '../../layouts/MainLayout'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { UserApi } from '../../utils/api'
import { setCookie } from 'nookies'
import { useDispatch } from 'react-redux'
import { NextThunkDispatch } from '../../store'
import { setUserData } from '../../store/actions-creators/user'
import { NotifyTimer } from '../../components/Notification'


const Login: NextPage = () => {

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const dispatch = useDispatch() as NextThunkDispatch;

  const router = useRouter()

  const login = async () => {
    try {
      const data = await UserApi.login({email: email, password: password})
      setCookie(null, 'animeToken', data.token, {
        maxAge: 30*24*60*60,
        path: '/',
      })
      console.log(data)
      dispatch(setUserData(data))
      return router.push('/user/profile')
    } catch (e) {

      return NotifyTimer(2000, 'The email address or password is incorrect!')
    }
  }

  return (
    <>
      <MainLayout description={"We are a large anime online store that has everything from clothes to its own community! Come to us! You'll like it, honey!"} key={"Anime Login"} keywords={"anime, store, anime hoodie, anime clothes, anime community, login"} title={`Anime Store | Login 🔑`}>
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
                                <h3 data-aos="fade-down">Login here</h3>

                                <label data-aos="fade-up" htmlFor="username">Email</label>
                                <input  type="text" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)}></input>
                                

                                <label data-aos="fade-up" htmlFor="password">Password</label>
                                <input  type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}></input>

                                <button type='button' data-aos="fade-up" onClick={login}>Sing in</button>

                                <div data-aos="fade-up" className='form-login-a'>
                                  <a onClick={() => router.push('/login/registration')} className='form-login-a__a'>Don't you have an account?</a>
                                </div>

                                <div data-aos="fade-up" className='form-login-a'>
                                  <a onClick={() => router.push('/login/change')} className='form-login-a__a'>Forgot a password?</a>
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

export default Login