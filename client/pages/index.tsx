import type { NextPage } from 'next'
import Image from 'next/image'
import MainLayout from '../layouts/MainLayout'
import home_img from '../images/home.png'
import home_img_two from '../images/home-anime-image-1.png'
import home_img_three from '../images/home-anime-image-2.png'
import home_img_four from '../images/home-anime-image-6.png'



const Home: NextPage = () => {
  return (
    <>
      <MainLayout description={"We are a large anime online store that has everything from clothes to its own community! Come to us! You'll like it, honey!"} key={"Anime Store"} keywords={"anime, store, anime hoodie, anime clothes, anime community"} title={"Anime Store | Home ❤️"}>
      <div>
        <div className="home-page">
            <div className="container">
                <div className="home-page-illustraitions">
                    <div className="row">
                      <div className="col-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 home-page-illustraitions_text">
                          <h4>Hello! Hru?</h4>
                          <div className="home-page-illustraitions_text-under">
                            <p>We are an anime community {">_<"}</p>
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
                                    src="home-anime-girl.png"
                                    className="anime-say__item_image"
                                    alt="Anime image"
                                    
                                  />
                </div>
                <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4 anime-say__item'>
                  <p data-aos="fade-down">The best and sweetest</p>
                  <h4 data-aos="slide-up">Community!</h4>
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
                    <div className="info-page-about__item-title" data-aos="fade-up">
                    A message from our team
                    </div>
                    <div data-aos="zoom-in" className="info-page-about__item-text">
                    <div className='info-page-about__item-text-header'>
                    Comprised of a strong team of avid anime fans and clothing industry veterans, we are based out of Toronto, Canada. We are always looking for new designs and different ways to bring  anime into reality. 
                      </div>
                      <div className='info-page-about__item-text-center'>
                      We are always expanding our product lines and aim to bring more merchandise to our store as often as possible. Whether your an anime stan, an OTAKU like us, or just looking for street wear clothing that will upgrade your style, we've got your back. 
                      </div>
                      <div className='info-page-about__item-text-footer'>
                      Here at Anime Shop we aim to spread the Power, Joy and Luv in which anime holds.
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
                                    src="home-anime-girl-2.png"
                                    className="anime-say__item_image"
                                    alt="Anime image"
                                    
                                  />
                </div>
                <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4 anime-say__item'>
                  <p data-aos="fade-down">The best and sweetest</p>
                  <h4 data-aos="slide-up">Clothes!</h4>
                </div>
                <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4 anime-say__item'>
                      <img
                                    
                                    src="home-anime-girl-4.png"
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
                    What we offer anyone {":)"}
                    </div>
                    <div data-aos="zoom-in" className="info-page-about__item-text">
                    <div className='info-page-about__item-text-header'>
                    Our store is most known for our hoodies, made of high quality fabrics and long lasting dyes and prints. Our hoodies offer a street wear and comfy feel, allowing them to be styled with virtually any outfit. 
                      </div>
                      <div className='info-page-about__item-text-center'>
                      Our Hoodies are have an inclusive unisex design, allowing bodies of all types to wear them with confidence and pride. We offer hoodies in Asian size XXS to 4XL, customers can convert our store size to US or EUR sizing using the sizing guide.
                      </div>
                      <div className='info-page-about__item-text-footer'>
                      Our newly released anime t-shirts / tees were an immediate hit among our repeat customers and avid anime fans.  
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
                  <p data-aos="fade-down">The best and sweetest</p>
                  <h4 data-aos="slide-up">Workers!</h4>
                </div>
                <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4 anime-say__item'>
                      <img
                                    
                                    src="home-anime-girl-3.png"
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
                    About our employees
                    </div>
                    <div data-aos="zoom-in" className="info-page-about__item-text">
                    <div className='info-page-about__item-text-header'>
                    Our beautiful posters can improve the mood in your bedroom. Created with the highest quality inks and materials, our posters look good framed and unframed. 
                      </div>
                      <div className='info-page-about__item-text-center'>
                      We have made sure to include a variety of styles and artistic approaches the posters we offer and aim to design and release more shortly. e offer a wide array of amazing phone case designs which you can choose from.
                      </div>
                      <div className='info-page-about__item-text-footer'>
                      We aimed to make our cases relatively inexpensive so that all anime fans can bring a piece of their favorite anime into reality. 
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
      <div>
        <div className='info-page'>
          <div data-aos="zoom-in-up" className='container'>
            <div className='whale-shifts'>
            <div className="scene">
            <div className="upper">
            <div className="moon">
              <div className="crater1"></div>
              <div className="crater2"></div>
            </div>
            <div className="star1"></div>
            <div className="star2"></div>
            <div className="star3"></div>
            <div className="cloud1">
              <div className="circle"></div>
              <div className="filler"></div>
            </div>
            <div className="cloud2">
              <div className="circle"></div>
              <div className="filler"></div>
            </div>

            <div className="drop"></div>

          </div>
          <div className="lower">
            <div className="whale">
              <div className="eye"></div>
              <div className="detail1">
                <div className="detail2"></div>
              </div>

            </div>
            <div className="fin"></div>
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

export default Home;
