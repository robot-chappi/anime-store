import type { NextPage } from 'next'
import Image from 'next/image'
import MainLayout from '../layouts/MainLayout'
import home_img from '../images/blog.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import router, { useRouter } from 'next/router'
import { faMarker } from '@fortawesome/free-solid-svg-icons'
import { NextThunkDispatch, wrapper } from '../store'
import { fetchBlogs } from '../store/actions-creators/blogs'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../hooks/useTypedSelector'
import BlogList from '../components/BlogList'
import { fetchAds } from '../store/actions-creators/ads'
import AdsBanner from '../components/AdsBanner'


const Blog: NextPage = () => {

  const [countBlog, setCountBlog] = useState<number>(3)
  const [offsetBlog, setOffsetBlog] = useState<number>(0)
  const dispatch = useDispatch() as NextThunkDispatch;

  useEffect(() => {
    dispatch(fetchBlogs(countBlog, offsetBlog))
  }, [countBlog, offsetBlog])

  const router = useRouter()

  const {blogs, error} = useTypedSelector(state => state.blog)
  const {ads, errorAds} = useTypedSelector(state => state.ads)


  return (
    <>
      <MainLayout description={"We are a large anime online store that has everything from clothes to its own community! Come to us! You'll like it, honey!"} key={"Anime Blog"} keywords={"anime, store, anime hoodie, anime clothes, anime community, blog"} title={"Anime Store | Blog 📰"}>
      <div>
        <div className="home-page">
            <div className="container">
                <div className="home-page-illustraitions">
                    <div className="row">
                      <div className="col-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 home-page-illustraitions_text">
                          <h4>Our great blog!</h4>
                          <div className="home-page-illustraitions_text-under">
                            <p>Find out the giveaways and more</p>
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
                <FontAwesomeIcon onClick={() => router.push('/world/create/blog')} icon={faMarker} className='clothing-tools-btn_icon-font'/>
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
                  <BlogList blogs={blogs}/>
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
                <a onClick={() => setOffsetBlog(0)} className='clothing-tools-btn_icon'>1</a>
                <a onClick={() => setOffsetBlog(3)} className='clothing-tools-btn_icon'>2</a>
                <a onClick={() => setOffsetBlog(6)} className='clothing-tools-btn_icon'>3</a>
                <a onClick={() => setOffsetBlog(offsetBlog+3)} className='clothing-tools-btn_icon'>{">>"}</a>
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

export default Blog;

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  const dispatch = store.dispatch as NextThunkDispatch 
  await dispatch(await fetchBlogs(3, 0))
  await dispatch(await fetchAds(undefined, undefined))
})