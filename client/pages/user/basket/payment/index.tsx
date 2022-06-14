import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import MainLayout from '../../../../layouts/MainLayout'
import home_img from '../../../../images/home.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchange, faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { NotifyTimer } from '../../../../components/Notification'


const Payment: NextPage = () => {


    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [image, setImage] = useState<any>(null)

    const selectFileToBlog = (e:any) => {
      setImage(e.target.files[0])
    }

    const {userBasket, errorBasket} = useTypedSelector(state => state.basket)
    
    const router = useRouter()

    let totalCount;
    const sumElements = () => {
      try {
        let x = 0;
        var vul = userBasket.map(function(num) {
          return num.price;
          })
        totalCount = vul.map(i=>x+=i, x).reverse()[0]
        return totalCount;
      } catch (e) {
        return NotifyTimer(2000, 'Something went wrong...')
      }
    }
    sumElements();

  return (
    <>
      <MainLayout description={"We are a large anime online store that has everything from clothes to its own community! Come to us! You'll like it, honey!"} key={"Anime Payment"} keywords={"anime, store, anime hoodie, anime clothes, anime community, payment"} title={"Anime Store | Payment 💵"}>
      <div>
        <div className="home-page-settings">
            <div className="container">
                <div className='tools-page'>
                  <h4 data-aos="fade-down" className='tools-page-h4'>Making an order ✍️</h4>
                  <div data-aos="fade-down" className='tools-page-images'>
                    <h4 data-aos="fade-up">Basic data</h4>
                    <div  className='tools-page-about-inputs'>
                      <div className='tools-page-about-inputs-file'>
                        <input  placeholder="What's your name?" type="text" value={name} onChange={e => setName(e.target.value)} className="text"/>
                      </div>
                      <div className='tools-page-about-inputs-file'>
                        <input  placeholder="What's your email?" type="text" value={email} onChange={e => setEmail(e.target.value)} className="text"/>
                      </div>
                      <div className='tools-page-about-inputs-file'>
                        <input  placeholder="What's your address?" type="text" value={address} onChange={e => setAddress(e.target.value)} className="text"/>
                      </div>
                      <div className='tools-page-images-inputs-post'>
                        <div data-aos="fade-down" className='tools-page-images-inputs-file-post'>
                            <input type="file" id="avatar" onChange={selectFileToBlog} className="tools-page-images-inputs-file__file-post"/>
                            <label htmlFor="avatar">
                                Upload an image
                            <p className="file-name-post"></p>
                            </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div data-aos="fade-down" className='tools-page-images'>
                    <h4 data-aos="fade-up">Total:</h4>
                    <div data-aos="fade-down" className='tools-page-about-inputs'>
                        <div className='tools-page-about-inputs__block'>
                            {userBasket.map((s) => {
                                return (
                                    <h4>{s.name}</h4>
                                )
                            })}
                        </div>
                        <h4 className='tools-page-about-inputs__h4 '>Total: {totalCount} ₽</h4>
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

export default Payment