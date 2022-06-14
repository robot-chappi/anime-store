import type { NextPage } from 'next'
import MainLayout from '../../layouts/MainLayout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchange, faRemove } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { NotifyTimer } from '../../components/Notification'
import axios from 'axios'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useRouter } from 'next/router'
import ErrorPage from '../../components/errorPage'
import { LOCAL_NAME } from '../../utils/consts'


const AdminTools: NextPage = () => {

    const {user, error} = useTypedSelector(state => state.user)
    const router = useRouter()

    const [paymentId, setPaymentId] = useState<string>("")
    const [paymentStatusCode, setPaymentStatusCode] = useState<number>()

    const [userIdForDelete, setUserIdForDelete] = useState<string>("")
    const [userPasswordForDelete, setUserPasswordForDelete] = useState<string>("")

    const [blogIdToRemove, setBlogIdToRemove] = useState<string>("")

    const [blogIdToRemoveAllComment, setBlogIdToRemoveAllComment] = useState<string>("")

    const [blogIdToRemoveComment, setBlogIdToRemoveComment] = useState<string>("")
    const [commentBlogIdToRemove, setCommentBlogIdToRemove] = useState<string>("")

    const [communityIdToRemove, setCommunityIdToRemove] = useState<string>("")

    const [communityIdToRemoveAllComment, setCommunityIdToRemoveAllComment] = useState<string>("")

    const [communityIdToRemoveComment, setCommunityIdToRemoveComment] = useState<string>("")
    const [commentCommunityIdToRemove, setCommentCommunityIdToRemove] = useState<string>("")

    const [nameAds, setNameAds] = useState<string>("")
    const [typeAds, setTypeAds] = useState<number>()
    const [pictureAds, setPictureAds] = useState<any>(null)


    const [nameClothing, setNameClothing] = useState<string>("")
    const [descriptionClothing, setDescriptionClothing] = useState<string>("")
    const [pictureClothing, setPictureClothing] = useState<any>(null)
    const [brandClothing, setBrandClothing] = useState<string>("")
    const [typeClothing, setTypeClothing] = useState<number>()
    const [deliveryClothing, setDeliveryClothing] = useState<string>("")
    const [careClothing, setCareClothing] = useState<string>("")
    const [priceClothing, setPriceClothing] = useState<number>()
    const [colors, setColors] = useState<any>([{color: "", id: Date.now()}])
    const [sizes, setSizes] = useState<any>([{size: "", id: Date.now()}])

    const [clothingToRemove, setClothingToRemove] = useState<string>("")
    const [adsToRemove, setAdsToRemove] = useState<string>("")
    const [clothingIdToRemoveAllComments, setClothingIdToRemoveAllComments] = useState<string>("")
    const [clothingIdToRemove, setClothingIdToRemove] = useState<string>("")
    const [commentClothingIdToRemove, setCommentClothingIdToRemove] = useState<string>("")

    const selectFileToClothing = (e:any) => {
        setPictureClothing(e.target.files[0])
    }

    const selectFileToAds = (e:any) => {
        setPictureAds(e.target.files[0])
    }

    const addColors = () => {
        setColors([...colors, {color: "", id: Date.now()}])
    }
    const removeColors = (id:any)=> {
        setColors(colors.filter((i:any) => i.id !== id))
    }
    const changeColors = (key:any, value:any, id:any) => {
        setColors(colors.map((i:any) => i.id === id ? {...i, [key]: value} : i))
    }

    const addSizes = () => {
        setSizes([...sizes, {size: "", id: Date.now()}])
    }
    const removeSizes = (id:any)=> {
        setSizes(sizes.filter((i:any) => i.id !== id))
    }
    const changeSizes = (key:any, value:any, id:any) => {
        setSizes(sizes.map((i:any) => i.id === id ? {...i, [key]: value} : i))
    }

    const cnslLOG = () => {
        let test:any = [];
        let i:number = 0
        colors.map((e:any) => {
            test[i] = e.color
            return i++
        })
        return console.log(colors)
    }

    const createClothing = async () => {
        try {
            let color:any = [];
            let c:number = 0
            colors.map((e:any) => {
                color[c] = e.color
                return c++
            })
            let size:any = [];
            let s:number = 0
            sizes.map((e:any) => {
                size[s] = e.size
                return s++
            })
            const formData = new FormData()
            formData.append("name", nameClothing) 
            formData.append("description", descriptionClothing) 
            formData.append("brand", brandClothing) 
            formData.append("type", typeClothing) 
            formData.append("delivery", deliveryClothing) 
            formData.append("care", careClothing) 
            formData.append("price", priceClothing) 
            formData.append("color", color) 
            formData.append("size", size) 
            formData.append("picture", pictureClothing) 
            await axios.post(LOCAL_NAME + 'api/clothing/create', formData)
            return NotifyTimer(2000, 'Successful!')
        } catch (e) {
            return NotifyTimer(2000, 'Something went wrong...')
        }
    }

    const removeClothingId = async () => {
        try {
            await axios.delete(LOCAL_NAME + 'api/clothing/'+clothingToRemove)
            return NotifyTimer(2000, 'Successful!')
        } catch (e) {
            return NotifyTimer(2000, 'Something went wrong...')
        }
    }

    const removeCommentClothing = async () => {
        try {
            const arrayToRequest = {data: {clothingId: clothingIdToRemove, commentId: commentClothingIdToRemove}}
            await axios.delete(LOCAL_NAME + 'api/clothing/delete/comment', arrayToRequest)
            return NotifyTimer(2000, 'Successful!')
        } catch (e) {
            return NotifyTimer(2000, 'Something went wrong...')
        }
    }

    const removeAllCommentsClothing = async () => {
        try {
            await axios.delete(LOCAL_NAME + 'api/clothing/delete/comment/all/'+clothingIdToRemoveAllComments)
            return NotifyTimer(2000, 'Successful!')
        } catch (e) {
            return NotifyTimer(2000, 'Something went wrong...')
        }
    }

    const removeBlogAnime = async () => {
        try {
            await axios.delete(LOCAL_NAME + 'api/blog/'+blogIdToRemoveComment)
            return NotifyTimer(2000, 'Successful!')
        } catch (e) {
            return NotifyTimer(2000, 'Something went wrong...')
        }
    }

    const removeCommentBlog = async () => {
        try {
            const arrayToRequest = {data: {blogId: blogIdToRemoveComment, commentId: commentBlogIdToRemove}}
            await axios.delete(LOCAL_NAME + 'api/blog/delete/comment', arrayToRequest)
            return NotifyTimer(2000, 'Successful!')
        } catch (e) {
            return NotifyTimer(2000, 'Something went wrong...') 
        }
    }

    const removeAllCommentsBlog = async () => {
        try {
            await axios.delete(LOCAL_NAME + 'api/blog/delete/comment/all/'+blogIdToRemoveAllComment)
            return NotifyTimer(2000, 'Successful!')
        } catch (e) {
            return NotifyTimer(2000, 'Something went wrong...')
        }
    }

    const removeCommunityAnime = async () => {
        try {
            await axios.delete(LOCAL_NAME + 'api/community/'+communityIdToRemove)
            return NotifyTimer(2000, 'Successful!')
        } catch (e) {
            return NotifyTimer(2000, 'Something went wrong...')
        }
    }

    const removeCommentCommunity = async () => {
        try {
            const arrayToRequest = {data: {communityId: communityIdToRemoveComment, commentId: commentCommunityIdToRemove}}
            await axios.delete(LOCAL_NAME + 'api/community/delete/comment', arrayToRequest)
            return NotifyTimer(2000, 'Successful!')
        } catch (e) {
            return NotifyTimer(2000, 'Something went wrong...') 
        }
    }

    const removeAllCommentsCommunity = async () => {
        try {
            await axios.delete(LOCAL_NAME + 'api/community/delete/comment/all/'+communityIdToRemoveAllComment)
            return NotifyTimer(2000, 'Successful!')
        } catch (e) {
            return NotifyTimer(2000, 'Something went wrong...')
        }
    }

    const createAds = async () => {
        try {
            const formData = new FormData()
            formData.append("image", pictureAds) 
            formData.append("name", nameAds) 
            formData.append("type", typeAds) 
            await axios.post(LOCAL_NAME + 'api/ads/create', formData)
            return NotifyTimer(2000, 'Successful!')
        } catch (e) {
            return NotifyTimer(2000, 'Something went wrong...')
        }
    }

    const removeAdsPost = async () => {
        try {
            await axios.delete(LOCAL_NAME + 'api/ads/'+adsToRemove)
            return NotifyTimer(2000, 'Successful!')
        } catch (e) {
            return NotifyTimer(2000, 'Something went wrong...')
        }
    }

    const changePaymentStatus = async () => {
        try {
            await axios.post(LOCAL_NAME + `api/payment/change/status?paymentId=${paymentId}&statusCode=${paymentStatusCode}`)
            return NotifyTimer(2000, 'Successful!')
        } catch (e) {
            return NotifyTimer(2000, 'Something went wrong...')
        }
    }

  if (user.role === 'USER') {
    return <ErrorPage/>
  }

  return (
    <>
      <MainLayout description={"We are a large anime online store that has everything from clothes to its own community! Come to us! You'll like it, honey!"} key={"Anime Admin Panel"} keywords={"anime, store, anime hoodie, anime clothes, anime community, admin"} title={`Anime Store | Admin Panel 💻`}>
      <div>
        <div className="home-page-settings">
            <div className="container">
                <div className='tools-page'>
                  <h4 data-aos="fade-down" className='tools-page-h4'>Hello, my beautiful lord ❤️</h4>
                  <div data-aos="fade-down" className='tools-page-images'>
                    <h4>Create clothes for the store!</h4>
                    <div className='tools-page-about-inputs-file'>
                        <input  placeholder='Clothing name:' type="text" value={nameClothing} onChange={e => setNameClothing(e.target.value)} className="text"/>
                    </div>
                    <div className='tools-page-about-inputs-file'>
                        <textarea placeholder='Clothing description:' value={descriptionClothing} onChange={e => setDescriptionClothing(e.target.value)} className="tools-page-about-inputs-file_textarea"/>
                      </div>
                    <div className='tools-page-images-inputs-post'>
                        <div  className='tools-page-images-inputs-file-post'>
                            <input type="file" id='fileToClothing' onChange={selectFileToClothing} className="tools-page-images-inputs-file__file-post"/>
                            <label htmlFor="fileToClothing">
                                Upload an image
                            <p className="file-name-post"></p>
                            </label>
                        </div>
                      </div>
                    <div className='tools-page-about-inputs-file'>
                        <input  placeholder='Clothing brand:' type="text" value={brandClothing} onChange={e => setBrandClothing(e.target.value)} className="text"/>
                    </div>
                    <div className='tools-page-about-inputs-file'>
                        <input  placeholder='Clothing type: 1-Mens 2-Women 3-Child' type="number" value={typeClothing} onChange={(e:any) => setTypeClothing(e.target.value)} className="text"/>
                    </div>
                    <div className='tools-page-about-inputs-file'>
                        <input  placeholder='What kind of delivery?' type="text" value={deliveryClothing} onChange={e => setDeliveryClothing(e.target.value)} className="text"/>
                    </div>
                    <div className='tools-page-about-inputs-file'>
                        <input  placeholder='How to take care of clothes?' type="text" value={careClothing} onChange={e => setCareClothing(e.target.value)} className="text"/>
                    </div>
                    <div className='tools-page-about-inputs-file'>
                        <input  placeholder='The price of clothing (RUB)' type="number" value={priceClothing} onChange={(e:any) => setPriceClothing(e.target.value)} className="text"/>
                    </div>
                    {/* <div  className='anime_clothing-info__buttons'>
                        <a onClick={addColors} className='anime_clothing-info__buttons_button'>Create a color</a>
                    </div> */}
                    {colors.map((i:any) => {
                        return (
                            <div className='tools-page-about-inputs-file'>
                                <input  placeholder='Blue, green, white, black and other colors' type="text" value={i.color} onChange={(e) => changeColors('color', e.target.value, i.id)} className="text"/>
                                {/* <button onClick={() => removeColors(i.id)} className='tools-page-images-inputs-file__button'><FontAwesomeIcon icon={faRemove}/></button> */}
                            </div>
                        )
                    })}
                    {/* <div  className='anime_clothing-info__buttons'>
                        <a onClick={addSizes} className='anime_clothing-info__buttons_button'>Create a size</a>
                    </div> */}
                    {sizes.map((i:any) => {
                        return (
                            <div className='tools-page-about-inputs-file'>
                                <input  placeholder='S, M, L, X, XL, XXL and other sizes' type="text" value={i.size} onChange={(e) => changeSizes('size', e.target.value, i.id)} className="text"/>
                                {/* <button onClick={() => removeSizes(i.id)}  className='tools-page-images-inputs-file__button'><FontAwesomeIcon icon={faRemove}/></button> */}
                            </div>
                        )
                    })}
                    <div  className='anime_clothing-info__buttons'>
                        <a onClick={createClothing}  className='anime_clothing-info__buttons_button '>Create!</a>
                    </div>
                    

                    <h4  className='admin-text-paragraph'>Remove the clothing in this store!</h4>
                    <div className='tools-page-about-inputs-file'>
                        <input  placeholder='Enter the clothing id to remove it' type="text" value={clothingToRemove} onChange={e => setClothingToRemove(e.target.value)}  className="text"/>
                    </div>
                    <div  className='anime_clothing-info__buttons'>
                        <a onClick={removeClothingId} className='anime_clothing-info__buttons_button '>Remove!</a>
                    </div>
                    <h4  className='admin-text-paragraph'>Delete a comment about clothing</h4>
                    <div className='tools-page-about-inputs-file'>
                        <input  placeholder='Clothing id where the desired comment is located' type="text" value={clothingIdToRemove} onChange={e => setClothingIdToRemove(e.target.value)} className="text"/>
                    </div>
                    <div className='tools-page-about-inputs-file'>
                        <input  placeholder='Enter the comment id' type="text" value={commentClothingIdToRemove} onChange={e => setCommentClothingIdToRemove(e.target.value)} className="text"/>
                    </div>
                    <div  className='anime_clothing-info__buttons'>
                        <a onClick={removeCommentClothing} className='anime_clothing-info__buttons_button '>Remove!</a>
                    </div>

                    <h4  className='admin-text-paragraph'>Delete all comments about clothing</h4>
                    <div className='tools-page-about-inputs-file'>
                        <input  placeholder='Enter the clothing id to remove it' type="text" value={clothingIdToRemoveAllComments} onChange={e => setClothingIdToRemoveAllComments(e.target.value)} className="text"/>
                    </div>
                    <div  className='anime_clothing-info__buttons'>
                        <a onClick={removeAllCommentsClothing} className='anime_clothing-info__buttons_button'>Remove!</a>
                    </div>
                    
                  </div>
                  <div data-aos="fade-down" className='tools-page-images'>
                    <h4>Remove the blog in this store!</h4>
                    <div className='tools-page-about-inputs-file'>
                        <input  placeholder='Enter the blog id to remove it' type="text" value={blogIdToRemove} onChange={e => setBlogIdToRemove(e.target.value)}  className="text"/>
                    </div>
                    <div  className='anime_clothing-info__buttons'>
                        <a onClick={removeBlogAnime} className='anime_clothing-info__buttons_button '>Remove!</a>
                    </div>
                    <h4  className='admin-text-paragraph'>Delete a comment about blog</h4>
                    <div className='tools-page-about-inputs-file'>
                        <input  placeholder='Blog id where the desired comment is located' type="text" value={blogIdToRemoveComment} onChange={e => setBlogIdToRemoveComment(e.target.value)} className="text"/>
                    </div>
                    <div className='tools-page-about-inputs-file'>
                        <input  placeholder='Enter the blog id comment' type="text" value={commentBlogIdToRemove} onChange={e => setCommentBlogIdToRemove(e.target.value)} className="text"/>
                    </div>
                    <div  className='anime_clothing-info__buttons'>
                        <a onClick={removeCommentBlog} className='anime_clothing-info__buttons_button '>Remove!</a>
                    </div>

                    <h4  className='admin-text-paragraph'>Delete all comments about blog</h4>
                    <div className='tools-page-about-inputs-file'>
                        <input  placeholder='Enter the blog id to remove it' type="text" value={blogIdToRemoveAllComment} onChange={e => setBlogIdToRemoveAllComment(e.target.value)} className="text"/>
                    </div>
                    <div  className='anime_clothing-info__buttons'>
                        <a onClick={removeAllCommentsBlog} className='anime_clothing-info__buttons_button'>Remove!</a>
                    </div>
                    
                  </div>
                  <div data-aos="fade-down" className='tools-page-images'>
                    <h4>Remove the community post in this store!</h4>
                    <div className='tools-page-about-inputs-file'>
                        <input  placeholder='Enter the community id to remove it' type="text" value={communityIdToRemove} onChange={e => setCommunityIdToRemove(e.target.value)}  className="text"/>
                    </div>
                    <div  className='anime_clothing-info__buttons'>
                        <a onClick={removeCommunityAnime} className='anime_clothing-info__buttons_button '>Remove!</a>
                    </div>
                    <h4  className='admin-text-paragraph'>Delete a comment about community</h4>
                    <div className='tools-page-about-inputs-file'>
                        <input  placeholder='community id where the desired comment is located' type="text" value={communityIdToRemoveComment} onChange={e => setCommunityIdToRemoveComment(e.target.value)} className="text"/>
                    </div>
                    <div className='tools-page-about-inputs-file'>
                        <input  placeholder='Enter the community id' type="text" value={commentCommunityIdToRemove} onChange={e => setCommentCommunityIdToRemove(e.target.value)} className="text"/>
                    </div>
                    <div  className='anime_clothing-info__buttons'>
                        <a onClick={removeCommentCommunity} className='anime_clothing-info__buttons_button '>Remove!</a>
                    </div>

                    <h4  className='admin-text-paragraph'>Delete all comments about community</h4>
                    <div className='tools-page-about-inputs-file'>
                        <input  placeholder='Enter the community id to remove it' type="text" value={communityIdToRemoveAllComment} onChange={e => setCommunityIdToRemoveAllComment(e.target.value)} className="text"/>
                    </div>
                    <div  className='anime_clothing-info__buttons'>
                        <a onClick={removeAllCommentsCommunity} className='anime_clothing-info__buttons_button'>Remove!</a>
                    </div>
                    
                  </div>

                  <div data-aos="fade-down" className='tools-page-images'>
                    <h4>Create ads for the store!</h4>
                    <div className='tools-page-images-inputs-post'>
                        <div  className='tools-page-images-inputs-file-post'>
                            <input type="file" id='fileToAds' onChange={selectFileToAds} className="tools-page-images-inputs-file__file-post"/>
                            <label htmlFor="fileToAds">
                                Upload an image
                            <p className="file-name-post"></p>
                            </label>
                        </div>
                      </div>
                    <div className='tools-page-about-inputs-file'>
                        <input  placeholder='Ads name:' type="text" value={nameAds} onChange={e => setNameAds(e.target.value)} className="text"/>
                    </div>
                    <div className='tools-page-about-inputs-file'>
                        <input  placeholder='Type of ads:' type="number" value={typeAds} onChange={(e:any) => setTypeAds(e.target.value)} className="text"/>
                    </div>
                    <div  className='anime_clothing-info__buttons'>
                        <a onClick={createAds} className='anime_clothing-info__buttons_button '>Create!</a>
                    </div>
                    

                    <h4  className='admin-text-paragraph'>Remove the ads in this store!</h4>
                    <div className='tools-page-about-inputs-file'>
                        <input  placeholder='Enter the clothing id to remove it' type="text" value={adsToRemove} onChange={e => setAdsToRemove(e.target.value)}  className="text"/>
                    </div>
                    <div  className='anime_clothing-info__buttons'>
                        <a onClick={removeAdsPost} className='anime_clothing-info__buttons_button '>Remove!</a>
                    </div>
                    </div>

                    <div data-aos="fade-down" className='tools-page-images'>
                    <h4>Change for payment status for the user!</h4>
                    <div className='tools-page-about-inputs-file'>
                        <input  placeholder='Enter the payment id' type="text" value={paymentId} onChange={e => setPaymentId(e.target.value)}  className="text"/>
                    </div>
                    <div className='tools-page-about-inputs-file'>
                        <input  placeholder='Enter the status code: 100: Fly; 200: Completed;' type="number" value={paymentStatusCode} onChange={(e:any)=> setPaymentStatusCode(e.target.value)}  className="text"/>
                    </div>
                    <div  className='anime_clothing-info__buttons'>
                        <a onClick={changePaymentStatus} className='anime_clothing-info__buttons_button '>Change!</a>
                    </div>
                    </div>
                    {/* <div data-aos="fade-down" className='tools-page-images'>
                    <h4>Delete a user acount!</h4>
                    <div className='tools-page-about-inputs-file'>
                        <input  placeholder='Enter the user id' type="text" value={userIdForDelete} onChange={e => setUserIdForDelete(e.target.value)}  className="text"/>
                    </div>
                    <div className='tools-page-about-inputs-file'>
                        <input  placeholder='Enter the user password' type="text" value={userPasswordForDelete} onChange={(e)=> setUserPasswordForDelete(e.target.value)}  className="text"/>
                    </div>
                    <div  className='anime_clothing-info__buttons'>
                        <a onClick={() => console.log(priceClothing)} className='anime_clothing-info__buttons_button '>Delete!</a>
                    </div>
                    </div> */}
                </div>
            </div>
        </div>
      </div>
      </MainLayout>
    </>
  )
}

export default AdminTools

