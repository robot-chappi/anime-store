import type { NextPage } from 'next'
import Image from 'next/image'
import MainLayout from '../layouts/MainLayout'
import home_img from '../images/contact.png'
import home_img_two from '../images/community.png'
import { useState } from 'react'
import axios from 'axios'
import { NotifyTimer } from '../components/Notification'
import { LOCAL_NAME } from '../utils/consts'


const Contact: NextPage = () => {

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [subject, setSubject] = useState<string>("")
  const [message, setMessage] = useState<string>("")

  const sendLetter = async () => {
    try {
      let userData:any = {name: name, email: email, subject: subject, message: message}
      return await axios.post(LOCAL_NAME + `api/email/send/admins`, userData)
      .then(() => NotifyTimer(2000, 'You have sent an email!'))
      .catch(e => console.log(e))
    } catch (e) {
      return console.log(e)
    }
  }

  return (
    <>
      <MainLayout description={"We are a large anime online store that has everything from clothes to its own community! Come to us! You'll like it, honey!"} key={"Anime Contact"} keywords={"anime, store, anime hoodie, anime clothes, anime community, contact"} title={"Anime Store | Contact ☎️"}>
      <div>
        <div className="home-page">
            <div className="container">
                <div className="home-page-illustraitions">
                    <div className="row">
                      <div className="col-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 home-page-illustraitions_text">
                          <h4>Contact us :D</h4>
                          <div className="home-page-illustraitions_text-under">
                            <p>You can declare yourself</p>
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
                                    src="home-anime-girl-4.png"
                                    className="anime-say__item_image"
                                    alt="Anime image"
                                    
                                  />
                </div>
                <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4 anime-say__item'>
                  <p data-aos="fade-down">The most responsive </p>
                  <h4 data-aos="slide-up">Store!</h4>
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
          <div className="info-page">
            <div className="container">
              <div className="info-page-about">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-xs-6 info-page-about__item">
                    <div className="info-page-about__item-title" data-sal="slide-up" data-sal-duration="500" data-sal-delay="500">
                      Just text us something {">_<"}
                    </div>
                    <form className='form-contact-me' 
                    >
                                <div data-sal="zoom-in" data-sal-duration="500" data-sal-delay="300" className='form-contact-me-block'>
                                    <input type="text" className='form-contact-me-input' placeholder='Your name..' value={name} onChange={e => setName(e.target.value)}/>
                                </div>
                                <div data-sal="zoom-in" data-sal-duration="500" data-sal-delay="300" className='form-contact-me-block'>
                                    <input type="text" className='form-contact-me-input' placeholder='Your Email..' value={email} onChange={e => setEmail(e.target.value)}/>
                                </div>
                                <div data-sal="zoom-in" data-sal-duration="500" data-sal-delay="300" className='form-contact-me-block'>
                                    <input type="text" className='form-contact-me-input' placeholder='Your subject..'  value={subject} onChange={e => setSubject(e.target.value)}/>
                                </div>
                                <div data-sal="zoom-in" data-sal-duration="500" data-sal-delay="300" className='form-contact-me-block'>
                                    <textarea className='form-contact-me-textarea' placeholder='Your message..' value={message} onChange={e => setMessage(e.target.value)}></textarea>
                                </div>
                                <div data-sal="zoom-in" data-sal-duration="500" data-sal-delay="300" className='form-contact-me-block form-contact-me-block-btn'>
                                    <input type="button" className='form-contact-me-btn' onClick={sendLetter} placeholder="dasd"/>
                                </div>
                  </form>
                  </div>
                  <div className="col-lg-6 col-md-6 col-xs-6 info-page-about__item">
                  <div className="info-page-about__item-image" data-sal="slide-up" data-sal-duration="500">
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
      </MainLayout>
    </>
  )
}

export default Contact