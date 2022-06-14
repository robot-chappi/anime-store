import type { GetServerSideProps, NextPage } from 'next'
import MainLayout from '../../layouts/MainLayout'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IClothing } from '../../types/clothing';
import Swal from 'sweetalert2'
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { parseCookies } from 'nookies';
import { NotifyTimer } from '../../components/Notification';
import { LOCAL_NAME } from '../../utils/consts';



const Product: NextPage = ({serverClothing, clothingAll}:any) => {

  const {user, error} = useTypedSelector(state => state.user)
  const {userBasket, errorBasket} = useTypedSelector(state => state.basket)
  const {userFavorite, errorFavorite} = useTypedSelector(state => state.favorite)

  useEffect(() => {
    setProductClothing(serverClothing)
    setClothings(clothingAll)
    setRatingComment(1)
    setTextComment("")
    setLimitLikes(0)
  }, [serverClothing])

  const [productClothing, setProductClothing] = useState<IClothing>(serverClothing)
  const [clothings, setClothings] = useState<IClothing[]>(clothingAll)

  const [checkingData, setCheckingData] = useState<number>(0)
  const [checkingDataFavorite, setCheckingDataFavorite] = useState<number>(0)
  const [ratingComment, setRatingComment] = useState<number>(1)
  const [textComment, setTextComment] = useState<string>("")

  const [limitLikes, setLimitLikes] = useState(0)

  const router = useRouter()

  const redirectGoods = (id:string) => {
    setCheckingData(0);
    setCheckingDataFavorite(0);
    return router.push(`/product/${id}`)
  }

  const addComment = async () => {
    try {
        if(user._id) {
          const response = await axios.post(LOCAL_NAME + 'api/clothing/add/comment', {
              userId: user._id,
              username: user.name,
              avatar: user.avatar,
              text: textComment,
              rating: ratingComment,
              clothingId: productClothing._id
          })
          setProductClothing({...productClothing, comments: [...productClothing.comments, response.data]})
          return NotifyTimer(2000, 'You have created a comment!');
        }
        return Notification();
      } catch (e) {
        console.log(e)
    }
}

  const addCardItem = async (id:string) => {
    try {
      const token = parseCookies()
      const checking = userBasket.find(element => element._id === id)
      if(checking === undefined && checkingData === 0) {
        let userBasketObj:any = {}
        userBasketObj['clothingId'] = id;
        await axios.post(LOCAL_NAME + 'api/user/basket/add', userBasketObj, {headers: {Authorization: `Bearer ${token['animeToken']}`}})
        setCheckingData(1)
        return NotifyTimer(2000, 'The product has been added to the cart!');
      }
      return Notification();
    } catch (e) {
      console.log(e)
    }
  }

  const addFavoriteItem = async (id:string) => {
    try {
      const token = parseCookies()
      const checking = userFavorite.find(element => element._id === id)
      if(checking === undefined && checkingDataFavorite === 0) {
        let userBasketObj:any = {}
        userBasketObj['favoriteId'] = id;
        await axios.post(LOCAL_NAME + 'api/user/favorite/add', userBasketObj, {headers: {Authorization: `Bearer ${token['animeToken']}`}})
        setCheckingDataFavorite(1)
        return NotifyTimer(2000, 'The product has been added to the favorite!');
      }
      return Notification();
    } catch (e) {
      console.log(e)
    }
  }

    const like = async () => {
        try {
          if (limitLikes === 0) {
              await axios.post(LOCAL_NAME + 'api/clothing/like/'+productClothing._id)
              setLimitLikes(1)
              return setProductClothing({...productClothing, like: productClothing.like+1}); 
          } 

          return NotifyTimer(2000, 'You have already evaluated this product!')
          
        } catch (e) {
          console.log(e)
        }
    }

    const dislike = async () => {
      try {
          
          if(limitLikes === 0) {
              await axios.post(LOCAL_NAME + 'api/clothing/dislike/'+productClothing._id)
              setLimitLikes(1)
              return setProductClothing({...productClothing, dislike: productClothing.dislike+1});
          }

          return NotifyTimer(2000, 'You have already evaluated this product!')
          
      } catch (e) {
        console.log(e)
      }
  }

  const Notification = () => {

    let timerInterval:any;

    return Swal.fire({
      title: "You can't leave a comment because you're not logged in!",
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
      <MainLayout description={productClothing.description} key={"Anime Product"} keywords={"anime, store, anime hoodie, anime clothes, anime community, payment"} title={`Anime Store | ${productClothing.name} 💎`}>
      <div>
        <div className="anime_clothing">
            <div className="container">
                <div className='row'>
                    <div className='col-lg-6 col-md-6 col-xs-6'>
                        <div className='anime_clothing-image'>
                            <img
                                src={LOCAL_NAME +  productClothing.picture}
                                className="anime_clothing-image_image"
                                alt="Anime image"
                                data-aos="zoom-in-up"
                                    />
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-6 col-xs-6'>
                        <div data-aos="zoom-in-up" className='anime_clothing-info'>
                            <h4 data-aos="fade-up" className='anime_clothing-info_h4'>{productClothing.name} ❤️</h4>
                            <div className='anime_clothing-info__description'>
                                <p data-aos="fade-up" data-aos-delay="200"><a onClick={like}>❤️</a> {productClothing.like}  <a onClick={dislike}>💔</a> {productClothing.dislike}</p>
                            </div>
                            <div className='anime_clothing-info__brand-type'>
                                <h3 data-aos="fade-up" data-aos-delay="300"> Price: {productClothing.price} ₽</h3>
                                <h4 data-aos="fade-up" data-aos-delay="400">1. Brand: {productClothing.brand}</h4>
                                <p data-aos="fade-up" data-aos-delay="500">2. Type: {productClothing.type}</p>
                            </div>
                            <div data-aos="fade-up" data-aos-delay="600" className='anime_clothing-info__colors'>
                                3. Colors: {productClothing.color.map((c)=> {
                                    return (
                                        <p style={{color: `${c}`, borderRadius: 10, border: `1px solid ${c}`}}>{c}</p>
                                    )
                                })}
                            </div>
                            <div data-aos="fade-up" data-aos-delay="700" className='anime_clothing-info__size'>
                                4. Size: {productClothing.size.map((s) => {
                                    return (
                                        <p>{s}</p>
                                    )
                                })}
                            </div>
                            <div className='anime_clothing-info__delivery'>
                                <p data-aos="fade-up" data-aos-delay="800">5. Delivery: {productClothing.delivery}</p>
                            </div>
                            <div className='anime_clothing-info__description'>
                                <p data-aos="fade-up" data-aos-delay="900">6. Description: {productClothing.description}</p>
                            </div>
                            <div className='anime_clothing-info__description'>
                                <p data-aos="fade-up">7. Care: {productClothing.care}</p>
                            </div>
                            <div data-aos="zoom-in-up" className='anime_clothing-info__buttons'>
                                <a className='anime_clothing-info__buttons_button' onClick={() => router.push('/user/basket/paymentone/sfsd')}>Buy</a>
                                <a className='anime_clothing-info__buttons_button' onClick={() => addCardItem(productClothing._id)}>Add to Cart</a>
                                
                            </div>
                            <div data-aos="zoom-in-up" className='anime_clothing-info__buttons'>
                                
                                <a className='anime_clothing-info__buttons_button' onClick={() => addFavoriteItem(productClothing._id)}>Add to Favorite</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div>
          <div  className='anime-clothing__comments'>
              <div className='container'>
                  <div data-aos="zoom-in-up" className='anime-clothing__comments-block'>
                    <h4 data-aos="fade-up" className='anime-clothing__comments-block__h4'>Comments 💞</h4>
                    <div data-aos="zoom-in-up" className='anime-clothing__comments-block-create'>
                    <h4 data-aos="fade-up" className='anime-clothing__comments-block-create__h4'>Create a comment 🙃</h4>
                        <div data-aos="fade-down" className='anime-clothing__comments-block-create-inputs'>
                            <div className='anime-clothing__comments-block-create-inputs_block'>
                                <input placeholder='What do you think about this?' type="text" value={textComment} onChange={e => setTextComment(e.target.value)} className="text"/>
                            </div>
                        </div>
                        <div  className="anime-dropdown-comments">
                            <div className="dropdown-comments">
                                <button className="dropbtn">Rating: {ratingComment} ❤️</button>
                                <div className="dropdown-comments-content">
                                    <a onClick={() => setRatingComment(1)}>1x❤️</a>
                                    <a onClick={() => setRatingComment(2)}>2x❤️</a>
                                    <a onClick={() => setRatingComment(3)}>3x❤️</a>
                                    <a onClick={() => setRatingComment(4)}>4x❤️</a>
                                    <a onClick={() => setRatingComment(5)}>5x❤️</a>
                                </div>
                            </div>
                        </div>
                        <div className='anime_clothing-info__buttons'>
                            <a className='anime_clothing-info__buttons_button' onClick={addComment}>Create!</a>
                        </div>
                    </div>
                    <div className='anime-clothing__comments-block-all'>
                        <h4 className='anime-clothing__comments-block__h4 anime-clothing__comments-block-all__h4'>All Comments 👀</h4>
                        <div data-aos="zoom-in-up" className='anime-clothing__comments-block-all__items'>
                            {productClothing.comments.map((c) => {
                                return (
                                    <div key={c.userId} className='anime-clothing__comments-block-all__items-item'>
                                        <div className='anime-clothing__comments-block-all__items-item_info'>
                                            <img
                                                src={LOCAL_NAME + c.avatar}
                                                className="anime-clothing__comments-block-all__items-item_info_image"
                                                alt="Anime image"
                                                data-aos="fade-up"
                                                    />
                                            <p data-aos="fade-down">{c.username}</p>
                                        </div>
                                        <h4 data-aos="fade-up">Rating: {c.rating}❤️</h4>
                                        <div className='anime-clothing__comments-block-all__items-item_text'>
                                            <p data-aos="fade-down">{c.text}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                  </div>
              </div>
          </div>
      </div>
      <div>
        <div className='info-page'>
          <div className='container'>
            <div className='user-info-footer'>
              <div className='user-info-cart'>
              <h4 data-aos="fade-up">Other products  ʕ•ᴥ•ʔ</h4>
                <ul className="cards-clothing">
              {clothings.slice(0, 3).map((s) => (
                    <li data-aos="slide-up" key={s._id}>
                      <a onClick={() => redirectGoods(s._id)} className="card-favorite">
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
                ))}
                </ul>
              </div>
            </div>
      </div>
      </div>
      </div>
      </MainLayout>
    </>
  )
}

export default Product;

export const getServerSideProps: GetServerSideProps = async ({params}:any) => {
    const response = await axios.get(LOCAL_NAME + 'api/clothing/' + params.id)
    const responseClothing = await axios.get(LOCAL_NAME + `api/clothing`)

    function shuffleArray(array:any) {
        let i = array.length - 1;
        for (; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        }
        return array;
    }
    return {
        props: {
            serverClothing: response.data,
            clothingAll: shuffleArray(responseClothing.data)
        },
        
    }
}
