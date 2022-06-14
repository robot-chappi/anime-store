
import Image from 'next/image'
import MainLayout from '../layouts/MainLayout'
import home_img from '../images/home.png'



const ErrorPage: React.FC = () => {
  return (
    <>
      <MainLayout description={"We are a large anime online store that has everything from clothes to its own community! Come to us! You'll like it, honey!"} key={"Anime Store"} keywords={"anime, store, anime hoodie, anime clothes, anime community"} title={"Anime Store | Home ❤️"}>
      <div>
        <div className="home-page">
            <div className="container">
                <div className="home-page-illustraitions">
                    <div className="row">
                      <div className="col-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 home-page-illustraitions_text">
                          <h4>404 page {":("}</h4>
                          <div className="home-page-illustraitions_text-under">
                            <p>Page Not Found {">_<"}</p>
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
                  <p data-aos="fade-down">Hey, you got the wrong address!</p>
                  <h4 data-aos="slide-up">All right</h4>
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
      </MainLayout>
    </>
  )
}

export default ErrorPage;