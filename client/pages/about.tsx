import type { NextPage } from 'next'
import Image from 'next/image'
import MainLayout from '../layouts/MainLayout'
import home_img from '../images/about2.png'
import home_img_two from '../images/home-anime-image-3.png'
import home_img_three from '../images/home-anime-image-4.png'
import home_img_four from '../images/home-anime-image-5.png'



const About: NextPage = () => {
  return (
    <>
      <MainLayout description={"We are a large anime online store that has everything from clothes to its own community! Come to us! You'll like it, honey!"} key={"Anime About Us"} keywords={"anime, store, anime hoodie, anime clothes, anime community, about us"} title={"Anime Store | About Us 👀"}>
      <div>
        <div className="home-page">
            <div className="container">
                <div className="home-page-illustraitions">
                    <div className="row">
                      <div className="col-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 home-page-illustraitions_text">
                          <h4>About us :)</h4>
                          <div className="home-page-illustraitions_text-under">
                            <p>Our clothes are your clothes</p>
                          </div>
                      </div>
                      <div className="col-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 home-page-illustraitions_image">
                          <Image
                                src={home_img}
                                className="home-page-illustraitions_image-image"
                                alt="Chappic image"
                                style={{ marginBottom: `1.25rem` }}
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
                                    src="home-anime-girl-4.png"
                                    className="anime-say__item_image"
                                    alt="Anime image"
                                    
                                  />
                </div>
                <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4 anime-say__item'>
                  <p data-aos="fade-down">The best and most pleasan</p>
                  <h4 data-aos="slide-up">Store!</h4>
                </div>
                <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4 anime-say__item'>
                      <img
                                    
                                    src="home-anime-girl.png"
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
          <div className="info-page">
            <div className="container">
              <div className="info-page-about">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-xs-6 info-page-about__item">
                    <div className="info-page-about__item-title" data-aos="fade-up">
                    You will find everything you need!
                    </div>
                    <div data-aos="zoom-in" className="info-page-about__item-text">
                    <div className='info-page-about__item-text-header'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquam tristique metus vel aliquet. Phasellus pulvinar ligula turpis, egestas eleifend tortor mattis non. Etiam consequat quis ligula nec laoreet.
                      </div>
                      <div className='info-page-about__item-text-center'>
                      Ut dapibus, elit vel varius ullamcorper, quam mi accumsan ante, a suscipit tortor felis in diam. Sed laoreet sollicitudin laoreet. Etiam sagittis leo vel egestas mollis. Nam cursus tortor id tortor mollis, sed malesuada est efficitur. Nam facilisis, nulla placerat blandit venenatis, risus neque auctor justo.
                      </div>
                      <div className='info-page-about__item-text-footer'>
                      Nam ullamcorper vitae dolor vel rhoncus. Phasellus non neque non libero luctus accumsan. 
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-xs-6 info-page-about__item">
                  <div className="info-page-about__item-image" data-aos="slide-up">
                    <Image
                                src={home_img_two}
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
                                    src="home-anime-girl-3.png"
                                    className="anime-say__item_image"
                                    alt="Anime image"
                                    
                                  />
                </div>
                <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4 anime-say__item'>
                  <p data-aos="fade-down">The fastest delivery in </p>
                  <h4 data-aos="slide-up">Russia!</h4>
                </div>
                <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4 anime-say__item'>
                      <img
                                    
                                    src="home-anime-girl-5.png"
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
          <div className="info-page">
            <div className="container">
              <div className="info-page-about">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-xs-6 info-page-about__item">
                  <div className="info-page-about__item-image" data-aos="slide-up">
                  <Image
                                src={home_img_three}
                                className="home-page-illustraitions_image-image"
                                alt="Chappic image"
                                style={{ marginBottom: `1.45rem` }}
                              />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-xs-6 info-page-about__item">
                    <div className="info-page-about__item-title" data-aos="fade-up">
                    The buyer's time is important to us!
                    </div>
                    <div data-aos="zoom-in" className="info-page-about__item-text">
                    <div className='info-page-about__item-text-header'>
                    Vestibulum sit amet mattis urna. Praesent sem lorem, ultricies vel libero sagittis, molestie dapibus ex. Aliquam porttitor felis libero, eu vestibulum mi hendrerit eget. Praesent non vehicula mi, eget placerat erat. Donec viverra luctus neque. Nullam ullamcorper quis sem in dignissim. Vivamus facilisis arcu ut mi
                      </div>
                      <div className='info-page-about__item-text-center'>
                      Sed luctus pharetra ipsum et bibendum. Donec feugiat magna non pellentesque tempus. Aenean ut magna euismod, pellentesque turpis nec, consequat est. Praesent commodo, lorem id dapibus aliquet, arcu lacus fringilla lectus, at vulputate est leo eu turpis. Pellentesque commodo id risus nec posuere.
                      </div>
                      <div className='info-page-about__item-text-footer'>
                      Phasellus euismod lectus ac sagittis scelerisque. In vehicula pharetra erat nec sagittis.
                      </div>
                    </div>
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
                                    src="home-anime-girl-6.png"
                                    className="anime-say__item_image"
                                    alt="Anime image"
                                    
                                  />
                </div>
                <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4 anime-say__item'>
                  <p data-aos="fade-down">Nice gifts to all </p>
                  <h4 data-aos="slide-up">Customers!</h4>
                </div>
                <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4 anime-say__item'>
                      <img
                                    
                                    src="home-anime-girl-2.png"
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
          <div className="info-page">
            <div className="container">
              <div className="info-page-about">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-xs-6 info-page-about__item">
                    <div className="info-page-about__item-title" data-aos="fade-up">
                    We give away free stuff every week!
                    </div>
                    <div data-aos="zoom-in" className="info-page-about__item-text">
                    <div className='info-page-about__item-text-header'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquam tristique metus vel aliquet. Phasellus pulvinar ligula turpis, egestas eleifend tortor mattis non. Etiam consequat quis ligula nec laoreet.
                      </div>
                      <div className='info-page-about__item-text-center'>
                      Ut dapibus, elit vel varius ullamcorper, quam mi accumsan ante, a suscipit tortor felis in diam. Sed laoreet sollicitudin laoreet. Etiam sagittis leo vel egestas mollis. Nam cursus tortor id tortor mollis, sed malesuada est efficitur. Nam facilisis, nulla placerat blandit venenatis, risus neque auctor justo.
                      </div>
                      <div className='info-page-about__item-text-footer'>
                      Nam ullamcorper vitae dolor vel rhoncus. Phasellus non neque non libero luctus accumsan. 
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-xs-6 info-page-about__item">
                  <div className="info-page-about__item-image" data-aos="slide-up">
                    <Image
                                src={home_img_four}
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
        </div>
        <div>
        <div className='line-page'>
          <div className='container'>
            <div className='line-beautiful' data-aos="zoom-in-up"></div>
          </div>
        </div>
      </div>
      </MainLayout>
    </>
  )
}

export default About
