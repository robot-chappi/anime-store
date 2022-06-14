import axios from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { NotifyTimer } from '../../../components/notification'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import MainLayout from '../../../layouts/MainLayout'
import { LOCAL_NAME } from '../../../utils/consts'

const CreatePost: NextPage = () => {

  const {user, error} = useTypedSelector(state => state.user)

  const [postImage, setPostImage] = useState<any>(null)
  const [title, setTitle] = useState<string>("")
  const [subtitle, setSubtitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [link, setLink] = useState<string>("")
  const [hashtag, setHashtag] = useState<string>("")

  const router = useRouter()

  const selectPost = (e:any) => {
    setPostImage(e.target.files[0])
  }

  const makePost = async () => {
    try {
      if (user._id) {
        const formData = new FormData()
        formData.append("art", postImage) 
        formData.append("userId", user._id) 
        formData.append("title", title) 
        formData.append("subtitle", subtitle) 
        formData.append("description", description) 
        formData.append("socialAdd", link) 
        formData.append("hashtag", hashtag) 
        await axios.post(LOCAL_NAME + 'api/community/create', formData)
        return NotifyTimer(2000, 'You have made a post! Go to community!')
      }
      return NotifyTimer(2000, 'You are not logged in!')
    } catch(e) {
      return NotifyTimer(2000, 'Something went wrong...')
    }
  }

  return (
    <>
      <MainLayout description={"We are a large anime online store that has everything from clothes to its own community! Come to us! You'll like it, honey!"} key={"Anime Make a Community Post"} keywords={"anime, store, anime hoodie, anime clothes, anime community"} title={"Anime Store | Make a Community Post 📝"}>
      <div>
        <div className="home-page-settings">
            <div className="container">
                <div className='tools-page'>
                  <h4 data-aos="fade-down" className='tools-page-h4'>Create a new post! ❤️</h4>
                  <div data-aos="fade-down" className='tools-page-images'>
                    <h4 data-aos="fade-up">The content maker's Den 🏡</h4>
                    <div  className='tools-page-images-inputs'>
                      <div className='tools-page-images-inputs-post'>
                        <div data-aos="fade-down" className='tools-page-images-inputs-file-post'>
                            <input type="file" id="avatar" onChange={selectPost} className="tools-page-images-inputs-file__file-post"/>
                            <label htmlFor="avatar">
                                Upload an image
                            <p className="file-name-post"></p>
                            </label>
                        </div>
                      </div>
                      <div  className='tools-page-about-inputs'>
                      <div className='tools-page-about-inputs-file'>
                        <input placeholder='The title of your post' type="text" value={title} onChange={e => setTitle(e.target.value)} className="text"/>
                      </div>
                      <div className='tools-page-about-inputs-file'>
                        <input placeholder='The subtitle of your post' type="text" value={subtitle} onChange={e => setSubtitle(e.target.value)} className="text"/>
                      </div>
                      <div className='tools-page-about-inputs-file'>
                        <textarea placeholder='The description of your post' value={description} onChange={e => setDescription(e.target.value)} className="tools-page-about-inputs-file_textarea"/>
                      </div>
                      <div className='tools-page-about-inputs-file'>
                        <input placeholder='Leave a link to the social network' type="text" value={link} onChange={e => setLink(e.target.value)} className="text"/>
                      </div>
                      <div className='tools-page-about-inputs-file'>
                        <input placeholder='What hashtags?' type="text" value={hashtag} onChange={e => setHashtag(e.target.value)} className="text"/>
                      </div>
                      <div data-aos="zoom-in-up" className='anime_clothing-info__buttons'>
                        <a onClick={makePost} className='anime_clothing-info__buttons_button'>Create!</a>
                      </div>
                    </div>
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

export default CreatePost