import axios from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Swal from 'sweetalert2'
import MainLayout from '../../../layouts/MainLayout'
import { LOCAL_NAME } from '../../../utils/consts'

const CreateBlogPost: NextPage = () => {

  const [title, setTitle] = useState<string>("")
  const [subtitle, setSubtitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [seo, setSeo] = useState<string>("")
  const [image, setImage] = useState<any>(null)

  const selectFileToBlog = (e:any) => {
    setImage(e.target.files[0])
  }

  const router = useRouter()

  const makeBlogPost = () => {
    const formData = new FormData()
    formData.append("title", title) 
    formData.append("subtitle", subtitle) 
    formData.append("description", description) 
    formData.append("seo", seo) 
    formData.append("image", image) 
    axios.post(LOCAL_NAME + 'api/blog/create', formData)
    .then(Notification)
    .catch(e => console.log(e))
  }

  const Notification = () => {
    
    let timerInterval:any;

    return Swal.fire({
        title: "You have created a new blog post!",
        html: 'I will close in <b></b> milliseconds.',
        background: "#e84393",
        color: "#fff",
        
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            const b:any = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft()
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
        }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            return router.push(`/blog`)
        }
        })

  }

  return (
    <>
      <MainLayout description={"We are a large anime online store that has everything from clothes to its own community! Come to us! You'll like it, honey!"} key={"Anime Make a Blog"} keywords={"anime, store, anime hoodie, anime clothes, anime community, blog"} title={"Anime Store | Make a Blog 📝"}>
      <div>
        <div className="home-page-settings">
            <div className="container">
                <div className='tools-page'>
                  <h4 data-aos="fade-down" className='tools-page-h4'>Create a new blog post! ❤️</h4>
                  <div data-aos="fade-down" className='tools-page-images'>
                    <h4 data-aos="fade-up">The content maker's Den 🏡</h4>
                    <div  className='tools-page-images-inputs'>
                      <div className='tools-page-images-inputs-post'>
                        <div data-aos="fade-down" className='tools-page-images-inputs-file-post'>
                            <input type="file" id="avatar" onChange={selectFileToBlog} className="tools-page-images-inputs-file__file-post"/>
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
                        <input placeholder='What SEO title?' type="text" value={seo} onChange={e => setSeo(e.target.value)} className="text"/>
                      </div>
                      <div data-aos="zoom-in-up" className='anime_clothing-info__buttons'>
                        <a onClick={makeBlogPost} className='anime_clothing-info__buttons_button'>Create!</a>
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

export default CreateBlogPost