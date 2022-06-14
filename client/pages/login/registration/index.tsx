import type { NextPage } from 'next'
import MainLayout from '../../../layouts/MainLayout'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { UserApi } from '../../../utils/api'
import { setCookie } from 'nookies'
import { NotifyTimer } from '../../../components/Notification'
import axios from 'axios'
import { LOCAL_NAME } from '../../../utils/consts'


const Registration: NextPage = () => {

  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [avatar, setAvatar] = useState<any>(null)
  const [back, setBack] = useState<any>(null)

  const selectFileToAvatar = (e:any) => {
    setAvatar(e.target.files[0])
  }

  const selectFileToBack = (e:any) => {
    setBack(e.target.files[0])
  }

  const randomNumber = (max:number) => {
    return Math.floor(Math.random() * max);
  }

  const router = useRouter()

  const registerUser = async () => {
    try {
      const formData = new FormData()
      formData.append("name", username) 
      formData.append("email", email) 
      formData.append("password", password) 
      formData.append("avatar", avatar) 
      formData.append("back", back) 

      const code = randomNumber(10000000000)
      await axios.post(LOCAL_NAME + `api/email/checking/email?email=${email}&code=${code}`)
      
      const { value: userInputCode } = await Swal.fire({
        title: 'Enter your password',
        background: "#e84393",
        color: "#fff",
        input: 'number',
        inputLabel: 'Password',
        inputPlaceholder: 'Enter your password',
        inputAttributes: {
          maxlength: 10,
          autocapitalize: 'off',
          autocorrect: 'off'
        }
      })
      
      if (code == userInputCode) {
        const data = await UserApi.register(formData)
        setCookie(null, 'animeToken', data.token, {
          maxAge: 30*24*60*60,
          path: '/',
        })
        return Notification();
      }
      return NotifyTimer(2000, 'Incorrect confirmation move');
      
      
    } catch (e) {

      return NotifyTimer(2000, 'Error during registration!')
    }
  }

  const Notification = () => {

    let timerInterval:any;

    return Swal.fire({
      title: 'You have created a new account!',
      html: 'I will close in <b></b> milliseconds.',
      background: "#e84393",
      color: "#fff",
      
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b:any = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        return router.push('/login')
      }
    })
  }

  return (
    <>
      <MainLayout description={"We are a large anime online store that has everything from clothes to its own community! Come to us! You'll like it, honey!"} key={"Anime Registration"} keywords={"anime, store, anime hoodie, anime clothes, anime community, registration"} title={`Anime Store | Registration 🚪`}>
      <div>
        <div className="home-page">
            <div className="container">
                <div className='row'>
                    <div className='col-lg-1 col-md-1 col-sm-1 col-xs-1'>
                      <div data-aos="fade-up" className='shape-1'></div>
                    </div>
                    <div className='col-lg-10 col-md-10 col-sm-10 col-xs-10'>
                        <div className='form-login-div'>
                            <form className='form-login form-login-two'>
                                <h3 data-aos="fade-down">Registration Here</h3>

                                <label data-aos="fade-up" htmlFor="username">Email</label>
                                <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}></input>

                                <label data-aos="fade-up" htmlFor="password">Password</label>
                                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}></input>

                                <label data-aos="fade-up" htmlFor="username">Username</label>
                                <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}></input>
                                
                                <div  className='register-file-inputs'>
                                  <div className='tools-page-images-inputs-post'>
                                    <div data-aos="fade-down" className='tools-page-images-inputs-file-register'>
                                        <input type="file" id="avatar" onChange={selectFileToAvatar} className="tools-page-images-inputs-file__file-post"/>
                                        <label htmlFor="avatar">
                                            Upload an avatar
                                        <p className="file-name-post"></p>
                                        </label>
                                    </div>
                                  </div>
                                  <div className='tools-page-images-inputs-post'>
                                    <div data-aos="fade-down" className='tools-page-images-inputs-file-register'>
                                        <input type="file" id="back" onChange={selectFileToBack} className="tools-page-images-inputs-file__file-post"/>
                                        <label htmlFor="back">
                                            Upload a back
                                        <p className="file-name-post"></p>
                                        </label>
                                    </div>
                                  </div>
                                </div>

                                
                                <button type='button' data-aos="fade-up" onClick={registerUser}>Register</button>

                                <div data-aos="fade-up" className='form-login-a'>
                                  <a onClick={() => router.push('/login')} className='form-login-a__a'>Do you have an account?</a>
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

export default Registration