import type { NextPage } from 'next'
import MainLayout from '../../../../layouts/MainLayout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchange } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { parseCookies } from 'nookies'
import axios from 'axios'
import Swal from 'sweetalert2'
import { LOCAL_NAME } from '../../../../utils/consts'

const Tools: NextPage = () => {

  const {user, error} = useTypedSelector(state => state.user)

  const [avatar, setAvatar] = useState<any>(null)
  const [back, setBack] = useState<any>(null)
  const [oldPathBack, setOldPathBack] = useState<string>(user.back)
  const [oldPathAvatar, setOldPathAvatar] = useState<string>(user.avatar)

  const [about, setAbout] = useState<any>(undefined)
  const [name, setName] = useState<any>(undefined)
  const [social, setSocial] = useState<any>(undefined)


  const selectAvatar = (e:any) => {
    setAvatar(e.target.files[0])
  }

  const selectBack = (e:any) => {
    setBack(e.target.files[0])
  }

  const router = useRouter()

  const changeAvatar = async () => {
    try {
      const token = parseCookies()
      const formData = new FormData()
      formData.append("oldPath", oldPathAvatar) 
      formData.append("avatar", avatar) 
      await axios.post(LOCAL_NAME + `api/user/change/avatar`, formData, {headers: {Authorization: `Bearer ${token['animeToken']}`}})
      .then(() => NotifySender(2000, 'You have updated your avatar! Check it out!', '/user/profile'))
      .catch(e => console.log(e))
    } catch (e) {
      console.log(e)
    }
  }

  const changeBack = async () => {
    try {
      const token = parseCookies()
      const formData = new FormData()
      formData.append("oldPath", oldPathBack) 
      formData.append("back", back) 
      await axios.post(LOCAL_NAME + `api/user/change/back`, formData, {headers: {Authorization: `Bearer ${token['animeToken']}`}})
      .then(() => NotifySender(2000, 'You have updated your back pic! Check it out', '/user/profile'))
      .catch(e => console.log(e))
    } catch (e) {
      console.log(e)
    }
  }

  const changeInfoUser = async () => {
    try {
      const token = parseCookies()
      let userUpdateData:any = {}
      if (about) {
        userUpdateData['about'] = about;
      }
      if (social) {
        userUpdateData['social'] = social;
      }
      if (name) {
        userUpdateData['name'] = name;
      }
      await axios.patch(LOCAL_NAME + `api/user/change/data/me`, userUpdateData, {headers: {Authorization: `Bearer ${token['animeToken']}`}})
      .then(() => NotifySender(2000, 'You have updated your info! Check it out!', '/user/profile'))
      .catch(e => console.log(e))
    } catch(e) {
      console.log(e)
    }
  }

  const NotifySender = (timer: number, title: string, path: string) => {
    let timerInterval:any;

    return Swal.fire({
      title: title,
      html: 'I will close in <b></b> milliseconds.',
      background: "#e84393",
      color: "#fff",
      
      timer: timer,
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
        return router.push(path)
      }
    })
  }

  return (
    <>
      <MainLayout description={"We are a large anime online store that has everything from clothes to its own community! Come to us! You'll like it, honey!"} key={"Anime Tools"} keywords={"anime, store, anime hoodie, anime clothes, anime community, tools"} title={"Anime Store | Tools ⚙️"}>
      <div>
        <div className="home-page-settings">
            <div className="container">
                <div className='tools-page'>
                  <h4 data-aos="fade-down" className='tools-page-h4'>Change your data, honey 🍑</h4>
                  <div data-aos="fade-down" className='tools-page-images'>
                    <h4 data-aos="fade-up">Change your avatar | back </h4>
                    <div  className='tools-page-images-inputs'>
                      <div data-aos="fade-down" className='tools-page-images-inputs-file'>
                        <input type="file" id="avatar" onChange={selectAvatar} className="tools-page-images-inputs-file__file"/>
                        <label htmlFor="avatar">
                          Select Avatar
                          <p className="file-name"></p>
                        </label>
                        <button data-aos="fade-up" type='button' onClick={changeAvatar} className='tools-page-images-inputs-file__button'><FontAwesomeIcon icon={faExchange}/></button>
                      </div>
                      <div data-aos="fade-down" className='tools-page-images-inputs-file'>
                        <input type="file" id="back" onChange={selectBack} className="tools-page-images-inputs-file__file"/>
                        <label htmlFor="back">
                          Select Back
                          <p className="file-name"></p>
                        </label>
                        <button data-aos="fade-up" type='button' onClick={changeBack} className='tools-page-images-inputs-file__button'><FontAwesomeIcon icon={faExchange}/></button>
                      </div>
                    </div>
                  </div>
                  <div data-aos="fade-down" className='tools-page-images'>
                    <h4 data-aos="fade-up">Change your about</h4>
                    <div  className='tools-page-about-inputs'>
                      <div className='tools-page-about-inputs-file'>
                        <input  placeholder='What about your now?' type="text" value={about} onChange={e => setAbout(e.target.value)} className="text"/>
                        
                      </div>
                      <div className='tools-page-about-inputs-file'>
                        <input  placeholder='What about your social now?' type="text" value={social} onChange={e => setSocial(e.target.value)} className="text"/>
                        
                      </div>
                      <div className='tools-page-about-inputs-file'>
                        <input  placeholder='What about your new name?' type="text" value={name} onChange={e => setName(e.target.value)} className="text"/>
                        
                      </div>
                      <div data-aos="zoom-in-up" className='anime_clothing-info__buttons'>
                        <a onClick={changeInfoUser} className='anime_clothing-info__buttons_button'>Change!</a>
                      </div>
                    </div>
                  </div>
                  
                </div>
            </div>
        </div>
      </div>
      </MainLayout>
    </>
  )
}

export default Tools