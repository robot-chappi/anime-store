import type { NextPage } from 'next'
import Image from 'next/image'
import MainLayout from '../../../layouts/MainLayout'
import home_img from '../../../images/basket.png'
import { useRouter } from 'next/router'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { parseCookies } from 'nookies'
import axios from 'axios'
import Swal from 'sweetalert2'
import { LOCAL_NAME } from '../../../utils/consts'


const Card: NextPage = () => {

    const router = useRouter()

    const {userBasket, errorBasket} = useTypedSelector(state => state.basket)

    const deleteBasketAll = async () => {
      try {
        const token = parseCookies()
        await axios.delete(LOCAL_NAME + `api/user/basket/all`, {headers: {Authorization: `Bearer ${token['animeToken']}`}})
        .then(() => NotifySender(2000, 'You have deleted a card! Reload the page', '/user/basket'))
        .catch(e => console.log(e))
      } catch (e) {
        console.log(e)
      }
    }

    const deleteBasketItem = async (id: string) => {
      try {
        const token = parseCookies()
        console.log(id)
        await axios.delete(LOCAL_NAME + `api/user/basket/${id}`, {headers: {Authorization: `Bearer ${token['animeToken']}`}})
        .then(() => NotifySender(2000, 'You have deleted a item of card! Reload the page', '/user/basket'))
        .catch(e => console.log(e))
      } catch (e) {
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
      <MainLayout description={"We are a large anime online store that has everything from clothes to its own community! Come to us! You'll like it, honey!"} key={"Anime Card"} keywords={"anime, store, anime hoodie, anime clothes, anime community, card"} title={"Anime Store | Card 🛒"}>
      <div>
        <div className="home-page">
            <div className="container">
                <div className="home-page-illustraitions">
                    <div className="row">
                      <div className="col-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 home-page-illustraitions_text">
                          <h4>Your card</h4>
                          <div className="home-page-illustraitions_text-under">
                            <p>How much have you added</p>
                          </div>
                      </div>
                      <div className="col-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 home-page-illustraitions_image">
                          <Image
                                src={home_img}
                                className="home-page-illustraitions_image-image"
                                alt="Chappic image"
                                style={{ marginBottom: `1.45rem` }}
                              />
                      </div>
                    </div>
                </div>
                <div className='card-page'>
                    <div className='user-info-cart'>
                        <h4 data-aos="fade-up">Anime Shopping Card</h4>
                        <ul className="cards">
                            {userBasket.map((s) => (
                                <li data-aos="slide-up" key={s.brand}>
                                    <a href="" className="card-favorite">
                                    <img src={LOCAL_NAME +  s.picture} className="card__image" alt="" />
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
                            ))}
                      </ul>
                      <div className='user-info-cart__tools'>
                        <a data-aos="fade-up" className='user-info-cart__tools-a' onClick={() => router.push('/user/basket/payment')}>Buy</a>
                        <a data-aos="fade-up" className='user-info-cart__tools-a' onClick={deleteBasketAll}>Clear All</a>
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

export default Card