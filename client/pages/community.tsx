import type { NextPage } from 'next'
import Image from 'next/image'
import MainLayout from '../layouts/MainLayout'
import home_img from '../images/community.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import { faMarker } from '@fortawesome/free-solid-svg-icons'
import { NextThunkDispatch, wrapper } from '../store'
import { fetchCommunities } from '../store/actions-creators/communities'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../hooks/useTypedSelector'
import CommunityList from '../components/CommunityList'
import { fetchAds } from '../store/actions-creators/ads'
import AdsBanner from '../components/AdsBanner'


const Community: NextPage = () => {

  const [countCommunity, setCountCommunity] = useState<number>(3)
  const [offsetCommunity, setOffsetCommunity] = useState<number>(0)
  const dispatch = useDispatch() as NextThunkDispatch;

  useEffect(() => {
    dispatch(fetchCommunities(countCommunity, offsetCommunity))
  }, [countCommunity, offsetCommunity])

  const router = useRouter()

  const {communities, error} = useTypedSelector(state => state.community)
  const {ads, errorAds} = useTypedSelector(state => state.ads)

  return (
    <>
      <MainLayout description={"We are a large anime online store that has everything from clothes to its own community! Come to us! You'll like it, honey!"} key={"Anime Community"} keywords={"anime, store, anime hoodie, anime clothes, anime community"} title={"Anime Store | Community 🚀"}>
      <div>
        <div className="home-page">
            <div className="container">
                <div className="home-page-illustraitions">
                    <div className="row">
                      <div className="col-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 home-page-illustraitions_text">
                          <h4>Our community!</h4>
                          <div className="home-page-illustraitions_text-under">
                            <p>Share your work and get high</p>
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
        <div className='clothing-tools'>
          <div className='container'>
            <div className='clothing-tools__block'>
              <div data-aos="zoom-in-up" className='clothing-tools-btn'>
                <FontAwesomeIcon onClick={() => router.push('/world/create/post')} icon={faMarker} className='clothing-tools-btn_icon-font'/>
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
              <h4 data-aos="fade-up">Community Lent ʕ•ᴥ•ʔ</h4>
                  <CommunityList communities={communities}/>
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
                <a onClick={() => setOffsetCommunity(0)} className='clothing-tools-btn_icon'>1</a>
                <a onClick={() => setOffsetCommunity(3)} className='clothing-tools-btn_icon'>2</a>
                <a onClick={() => setOffsetCommunity(6)} className='clothing-tools-btn_icon'>3</a>
                <a onClick={() => setOffsetCommunity(offsetCommunity+3)} className='clothing-tools-btn_icon'>{">>"}</a>
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

export default Community;

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  const dispatch = store.dispatch as NextThunkDispatch 
  await dispatch(await fetchCommunities(3, 0))
  await dispatch(await fetchAds(undefined, undefined))
})
