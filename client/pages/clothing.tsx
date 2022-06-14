import type { NextPage } from 'next'
import Image from 'next/image'
import MainLayout from '../layouts/MainLayout'
import home_img from '../images/clothing.png'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChild, faFemale, faMale, faRemove } from '@fortawesome/free-solid-svg-icons'
import { NextThunkDispatch, wrapper } from '../store'
import { fetchClothing } from '../store/actions-creators/clothing'
import { useTypedSelector } from '../hooks/useTypedSelector'
import ClothingList from '../components/ClothingList'
import { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { fetchAds } from '../store/actions-creators/ads'
import { LOCAL_NAME } from '../utils/consts'
import AdsBanner from '../components/AdsBanner'


const Clothing: NextPage = () => {

  const [typeClothing, setTypeClothing] = useState<number>()
  const [countClothing, setCountClothing] = useState<number>(3)
  const [offsetClothing, setOffsetClothing] = useState<number>()
  const dispatch = useDispatch() as NextThunkDispatch;

  useEffect(() => {
    dispatch(fetchClothing(typeClothing, countClothing, offsetClothing))
    dispatch(fetchAds(undefined, undefined))
  }, [typeClothing, countClothing, offsetClothing])

  const {clothings, error} = useTypedSelector(state => state.clothing)
  const {ads, errorAds} = useTypedSelector(state => state.ads)

  const changeFilter = (action:number) => {
    if(action === 1) {
      setTypeClothing(1)
    }
    if(action === 2) {
      setTypeClothing(2)
    }
    if(action === 3) {
      setTypeClothing(3)
    }
    if(action === undefined) {
      setTypeClothing(undefined)
    }
    return setOffsetClothing(0)
  }

  

  return (
    <>
      <MainLayout description={"We are a large anime online store that has everything from clothes to its own community! Come to us! You'll like it, honey!"} key={"Anime Clothing Store"} keywords={"anime, store, anime hoodie, anime clothes, anime community"} title={"Anime Store | Clothing 🍓"}>
      <div>
        <div className="home-page">
            <div className="container">
                <div className="home-page-illustraitions">
                    <div className="row">
                      <div className="col-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 home-page-illustraitions_text">
                          <h4>Our shop!</h4>
                          <div className="home-page-illustraitions_text-under">
                            <p>Our cool clothes for you {">_<"}</p>
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
            </div>
        </div>
      </div>
      <div>
        <div className='line-page'>
          <div className='container'>
            <div className='line-beautiful' data-aos="zoom-in-up"></div>
          </div>
        </div>
      </div>
      <div>
        <div className='info-page-two'>
          <div className='container'>
            <div className='anime-say'>
              <div className='row'>
                <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4 anime-say__item'>
                      <img
                                    data-aos="fade-up"
                                    src="home-anime-girl-5.png"
                                    className="anime-say__item_image"
                                    alt="Anime image"
                                    
                                  />
                </div>
                <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4 anime-say__item'>
                  <p data-aos="fade-down">Our best and finest</p>
                  <h4 data-aos="slide-up">Products!</h4>
                </div>
                <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4 anime-say__item'>
                      <img
                                    
                                    src="home-anime-girl-6.png"
                                    className="anime-say__item_image"
                                    alt="Anime image"
                                    data-aos="fade-up"
                                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className='line-page'>
          <div className='container'>
            <div className='line-beautiful' data-aos="zoom-in-up"></div>
          </div>
        </div>
      </div>
      <div>
        <div className='clothing-tools'>
          <div className='container'>
            <div className='clothing-tools__block'>
            
              <div data-aos="zoom-in-up" className='clothing-tools-btn'>
                <FontAwesomeIcon icon={faMale} onClick={() => changeFilter(1)} className='clothing-tools-btn_icon-font'/>
                <FontAwesomeIcon icon={faFemale} onClick={() => changeFilter(2)} className='clothing-tools-btn_icon-font'/>
                <FontAwesomeIcon icon={faChild} onClick={() => changeFilter(3)} className='clothing-tools-btn_icon-font'/>
                <FontAwesomeIcon icon={faRemove} onClick={() => changeFilter(undefined)} className='clothing-tools-btn_icon-font'/>
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
              <h4 data-aos="fade-up">Store ʕ•ᴥ•ʔ</h4>
                  <ClothingList clothings={clothings} />
              </div>
            </div>
      </div>
      </div>
      </div>
      <div>
        <div className='clothing-tools'>
          <div className='container'>
            <div className='clothing-tools__block'>
              
              <div data-aos="zoom-in-up" className='clothing-tools-btn'>
                <a onClick={() => setOffsetClothing(0)} className='clothing-tools-btn_icon'>1</a>
                <a onClick={() => setOffsetClothing(3)} className='clothing-tools-btn_icon'>2</a>
                <a onClick={() => setOffsetClothing(6)} className='clothing-tools-btn_icon'>3</a>
                <a onClick={() => setOffsetClothing(offsetClothing+3)} className='clothing-tools-btn_icon'>{">>"}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className='line-page'>
          <div className='container'>
            <div className='line-beautiful' data-aos="zoom-in-up"></div>
          </div>
        </div>
      </div>
      <div>
        <AdsBanner ads={ads}/>
      </div>
      </MainLayout>
    </>
  )
}

export default Clothing;

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  const dispatch = store.dispatch as NextThunkDispatch 
  await dispatch(await fetchClothing(undefined, 3, undefined))
  await dispatch(await fetchAds(undefined, undefined))
})