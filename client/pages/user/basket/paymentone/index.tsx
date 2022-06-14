import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import MainLayout from '../../../../layouts/MainLayout'
import home_img from '../../../../images/home.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchange, faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'


const PaymentOne: NextPage = () => {

    const router = useRouter()

    const userGoods = [{name: 'Hoodie'}, {name: 'T-shirt'}]

  return (
    <>
      <MainLayout description={"We are a large anime online store that has everything from clothes to its own community! Come to us! You'll like it, honey!"} key={"Anime Payment"} keywords={"anime, store, anime hoodie, anime clothes, anime community, payment"} title={"Anime Store | Payment 💵"}>
      <div>
        <div className="home-page-settings">
            <div className="container">
                <div className='tools-page'>
                  <h4 data-aos="fade-down" className='tools-page-h4'>Making an order</h4>
                  <div data-aos="fade-down" className='tools-page-images'>
                    <h4 data-aos="fade-up">Basic data</h4>
                    <div  className='tools-page-about-inputs'>
                      <div className='tools-page-about-inputs-file'>
                        <input  placeholder="What's your name?" type="text" id="about" className="text"/>
                      </div>
                      <div className='tools-page-about-inputs-file'>
                        <input  placeholder="What's your Email?" type="text" id="social" className="text"/>
                      </div>
                      <div className='tools-page-about-inputs-file'>
                        <input  placeholder="What's your address?" type="text" id="social" className="text"/>
                      </div>
                      <div className='tools-page-about-inputs-file'>
                        <input  placeholder="What is the type of delivery?" type="text" id="social" className="text"/>
                      </div>
                      <div className='tools-page-about-inputs-file'>
                        <input  placeholder="What is the type of payment?" type="text" id="social" className="text"/>
                      </div>
                    </div>
                  </div>
                  <div data-aos="fade-down" className='tools-page-images'>
                    <h4 data-aos="fade-up">Total:</h4>
                    <div data-aos="fade-down" className='tools-page-about-inputs'>
                        <div className='tools-page-about-inputs__block'>
                            {userGoods.map((s) => {
                                return (
                                    <h4>{s.name}</h4>
                                )
                            })}
                        </div>
                        <h4 className='tools-page-about-inputs__h4 '>Total: 3000$</h4>
                    </div>
                  </div>
                  <div className='make-order'>
                  <a data-aos="fade-up" className='user-info-cart__tools-a' onClick={() => router.push('/')}>Buy</a>
                  </div>
                </div>
            </div>
        </div>
      </div>
      </MainLayout>
    </>
  )
}

export default PaymentOne