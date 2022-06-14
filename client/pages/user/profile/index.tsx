import { faRemove, faSignInAlt, faSignOut, faTools, faUserNinja } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { destroyCookie, parseCookies } from 'nookies'
import Swal from 'sweetalert2'
import { NotifyTimer } from '../../../components/Notification'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import MainLayout from '../../../layouts/MainLayout'
import { LOCAL_NAME } from '../../../utils/consts'


const User: NextPage = () => {

  const router = useRouter()
  const {user, error} = useTypedSelector(state => state.user)
  const {userFavorite, errorFavorite} = useTypedSelector(state => state.favorite)

  const users = {name: "Anonim", avatar: "avatar/03cb915e5839aa360185d194b0a5ff27.jpg", social: "https://vk.com/chappic2021", 
  about: "LOG IN TO YOUR ACCOUNT OR REGISTER!",
  back: "back/669318c401c3c9b6f6f8ffd940df29f9.jpg",
  favorite: [{name: 'Unknown', description: "Unknown", brand: "Anime Store", price: 5000, picture: 'https://i.pinimg.com/564x/98/04/50/98045060218521a0956a5945a3b81580.jpg', like: 5, dislike: 0},
  {name: 'Unknown', description: "Unknown", brand: "Anime Store", price: 5000, picture: 'https://i.pinimg.com/564x/98/04/50/98045060218521a0956a5945a3b81580.jpg', like: 5, dislike: 0},
  {name: 'Unknown', description: "Unknown", brand: "Anime Store", price: 5000, picture: 'https://i.pinimg.com/564x/98/04/50/98045060218521a0956a5945a3b81580.jpg', like: 5, dislike: 0}]}

  const deleteFavoriteAll = async () => {
    try {
      const token = parseCookies()
      await axios.delete(LOCAL_NAME + `api/user/favorite/all`, {headers: {Authorization: `Bearer ${token['animeToken']}`}})
      .then(() => NotifySender(2000, 'You have deleted a favorite! Reload the page', '/user/profile'))
      .catch(e => console.log(e))
    } catch (e) {
      console.log(e)
    }
  }

  const deleteFavorite = async (id: string) => {
    try {
      const token = parseCookies()
      await axios.delete(LOCAL_NAME + `api/user/favorite/${id}`, {headers: {Authorization: `Bearer ${token['animeToken']}`}})
      .then(() => NotifySender(2000, 'You have deleted a favorite! Reload the page', '/user/profile'))
      .catch(e => console.log(e))
    } catch (e) {
      console.log(e)
    }
  }

  const singOut = async () => {
    try {
      destroyCookie(null, 'animeToken', {path: '/'});
      return NotifySender(2000, 'You have logged out of your account', '/login');
    } catch (e) {
      NotifyTimer(2000, 'Something went wrong...')
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


  if (user) {
    if (user.role === "ADMIN") {
      return (
        <>
          <MainLayout description={"We are a large anime online store that has everything from clothes to its own community! Come to us! You'll like it, honey!"} key={"Anime Account"} keywords={"anime, store, anime hoodie, anime clothes, anime community"} title={`Anime Store | ${user.name} ❤️`}>
          <div>
            <div className="home-page">
                <div className="container">
                    <div className='user-info'>
                      <div className='user-info-header'>
                          <div data-aos="fade-down" className='user-info-back'>
                            <img src={LOCAL_NAME +  user.back} className='user-info-back_img'/>
                          </div>
                          <div data-aos="fade-up" className='user-info-avatar'>
                            <img src={LOCAL_NAME +  user.avatar} className='user-info-avatar_img'/>
                          </div>
                      </div>
                      <div data-aos="fade-up" className='user-info-middle'>
                        <h4 data-aos="fade-down">{user.name ? user.name : users.name} <a className='user-info-middle_tools' onClick={() => router.push('/user/profile/tools')}><FontAwesomeIcon icon={faTools}/></a> <a className='user-info-middle_tools' onClick={() => router.push('/admin')}><FontAwesomeIcon icon={faUserNinja}/></a> <a className='user-info-middle_tools' onClick={singOut}><FontAwesomeIcon icon={faSignOut}/></a></h4>
                        <div className='user-info-middle_add'>
                          <p data-aos="fade-up">Description: {user.about}</p>
                          <p data-aos="fade-up">Social: <a href={user.social} target={'_blank'}>{user.social}</a></p>
                        </div>
                      </div>
                      <div className='user-info-footer'>
                        <div  className='user-info-cart'>
                          <h4 data-aos="fade-up">Favorite Goods ʕ•ᴥ•ʔ</h4>
                            <ul className="cards">
                        {user.favorite ? userFavorite.map((s) => (
                              <li data-aos="slide-up" key={s._id}>
                                <a onClick={() => router.push(`/product/${s._id}`)} className="card-favorite">
                                  <img src={LOCAL_NAME + s.picture} className="card__image" alt="" />
                                  <div className="card__overlay">
                                    <div className="card__header">                    
                                      <img className="card__thumb" src={LOCAL_NAME + s.picture} alt="" />
                                      <div className="card__header-text">
                                        <h3 className="card__title">{s.name}</h3>            
                                        <span className="card__status">{s.price} ₽</span>
                                      </div>
                                    </div>
                                    <p className="card__description">{s.description}</p>
                                  </div>
                                </a>      
                              </li>
                          )) : null}
                          </ul>
                          <div className='user-info-cart__tools'>
                            <a data-aos="fade-up" className='user-info-cart__tools-a' onClick={deleteFavoriteAll}>Clear All</a>
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
    return (
      <>
        <MainLayout description={"We are a large anime online store that has everything from clothes to its own community! Come to us! You'll like it, honey!"} key={"Anime Account"} keywords={"anime, store, anime hoodie, anime clothes, anime community"} title={`Anime Store | ${user.name} ❤️`}>
        <div>
          <div className="home-page">
              <div className="container">
                  <div className='user-info'>
                    <div className='user-info-header'>
                        <div data-aos="fade-down" className='user-info-back'>
                          <img src={LOCAL_NAME + user.back} className='user-info-back_img'/>
                        </div>
                        <div data-aos="fade-up" className='user-info-avatar'>
                          <img src={LOCAL_NAME + user.avatar} className='user-info-avatar_img'/>
                        </div>
                    </div>
                    <div data-aos="fade-up" className='user-info-middle'>
                      <h4 data-aos="fade-down">{user.name ? user.name : users.name} <a className='user-info-middle_tools' onClick={() => router.push('/user/profile/tools')}><FontAwesomeIcon icon={faTools}/></a> <a className='user-info-middle_tools' onClick={singOut}><FontAwesomeIcon icon={faSignOut}/></a></h4>
                      <div className='user-info-middle_add'>
                        <p data-aos="fade-up">Description: {user.about}</p>
                        <p data-aos="fade-up">Social: <a href={user.social} target={'_blank'}>{user.social}</a></p>
                      </div>
                    </div>
                    <div className='user-info-footer'>
                      <div  className='user-info-cart'>
                        <h4 data-aos="fade-up">Favorite Goods ʕ•ᴥ•ʔ</h4>
                        <ul className="cards">
                        {user.favorite ? userFavorite.map((s) => (
                              <li data-aos="slide-up" key={s._id}>
                                <a onClick={() => router.push(`/product/${s._id}`)} className="card-favorite">
                                  <img src={LOCAL_NAME + s.picture} className="card__image" alt="" />
                                  <div className="card__overlay">
                                    <div className="card__header">                    
                                      <img className="card__thumb" src={LOCAL_NAME + s.picture} alt="" />
                                      <div className="card__header-text">
                                        <h3 className="card__title">{s.name}</h3>            
                                        <span className="card__status">{s.price} ₽</span>
                                      </div>
                                    </div>
                                    <p className="card__description">{s.description}</p>
                                  </div>
                                </a>      
                              </li>
                          )) : null}
                          </ul>
                          <div className='user-info-cart__tools'>
                            <a data-aos="fade-up" className='user-info-cart__tools-a' onClick={deleteFavoriteAll}>Clear All</a>
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
  return (
    <>
        <MainLayout description={"We are a large anime online store that has everything from clothes to its own community! Come to us! You'll like it, honey!"} key={"Anime Account"} keywords={"anime, store, anime hoodie, anime clothes, anime community"} title={`Anime Store | ${users.name} ❤️`}>
        <div>
          <div className="home-page">
              <div className="container">
                  <div className='user-info'>
                    <div className='user-info-header'>
                        <div data-aos="fade-down" className='user-info-back'>
                          <img src={LOCAL_NAME + users.back} className='user-info-back_img'/>
                        </div>
                        <div data-aos="fade-up" className='user-info-avatar'>
                          <img src={LOCAL_NAME + users.avatar} className='user-info-avatar_img'/>
                        </div>
                    </div>
                    <div data-aos="fade-up" className='user-info-middle'>
                      <h4 data-aos="fade-down">{users.name} <a className='user-info-middle_tools' onClick={() => router.push('/login')}><FontAwesomeIcon icon={faSignInAlt}/></a></h4>
                      <div className='user-info-middle_add'>
                        <p data-aos="fade-up">Description: {users.about}</p>
                        <p data-aos="fade-up">Social: <a href={users.social} target={'_blank'}>{users.social}</a></p>
                      </div>
                    </div>
                    <div className='user-info-footer'>
                      <div  className='user-info-cart'>
                        <h4 data-aos="fade-up">Favorite Goods ʕ•ᴥ•ʔ</h4>
                          <ul className="cards">
                      {users.favorite.map((s) => (
                            <li data-aos="slide-up" key={s.brand}>
                              <a href="" className="card-favorite">
                                <img src={s.picture} className="card__image" alt="" />
                                <div className="card__overlay">
                                  <div className="card__header">                    
                                    <img className="card__thumb" src={s.picture} alt="" />
                                    <div className="card__header-text">
                                      <h3 className="card__title">{s.name}</h3>            
                                      <span className="card__status">{s.price} ₽</span>
                                    </div>
                                  </div>
                                  <p className="card__description">{s.description}</p>
                                </div>
                              </a>      
                            </li>
                        ))}
                        </ul>
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

export default User;



