import type { GetServerSideProps, NextPage } from 'next'
import MainLayout from '../../../layouts/MainLayout'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove, faShare } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { IBlog } from '../../../types/blog';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { NextThunkDispatch } from '../../../store';
import { deleteBlogs } from '../../../store/actions-creators/blogs';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { NotifyTimer } from '../../../components/Notification';
import { LOCAL_NAME } from '../../../utils/consts';



const BlogPost: NextPage = ({serverBlog, blogAll}:any) => {

  const {user, error} = useTypedSelector(state => state.user)

    useEffect(() => {
        setArticleBlog(serverBlog)
        setBlogs(blogAll)
        setRatingComment(1)
        setTextComment("")
        setLimitLikes(0)
    }, [serverBlog])

    const [articleBlog, setArticleBlog] = useState<IBlog>(serverBlog)
    const [blogs, setBlogs] = useState<IBlog[]>(blogAll)

    const [ratingComment, setRatingComment] = useState<number>(1)
    const [textComment, setTextComment] = useState<string>("")

    const [limitLikes, setLimitLikes] = useState(0)

  const router = useRouter()
  const dispatch = useDispatch() as NextThunkDispatch;

  const removeBlogPost = async () => {
      try {
        if(user.role === "ADMIN") {
        return Swal.fire({
            title: 'Are you sure you want to delete this article?',
            background: "#e84393",
            color: "#fff",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteBlogs(articleBlog._id))
                Swal.fire({title: 'Successfully deleted!', background: "#e84393",
                color: "#fff", icon: 'success'})
                return router.push('/blog')
            } else if (result.isDenied) {
                return Swal.fire({title: 'The article remained intact!', background: "#e84393",
                color: "#fff", icon: 'info'})
            }
          })
        }

        return NotifyTimer(2000, 'You are not the author of this post and cannot delete it')
        
      } catch (e) {
          console.log(e)
      }
  }

  const addComment = async () => {
    try {
        const response = await axios.post(LOCAL_NAME + 'api/blog/add/comment', {
            userId: user._id,
            username: user.name,
            avatar: user.avatar,
            text: textComment,
            rating: ratingComment,
            blogId: articleBlog._id
        })
        return setArticleBlog({...articleBlog, comments: [...articleBlog.comments, response.data]})
    } catch (e) {
        console.log(e)
    }
}
  const like = async () => {
      try {
        if (limitLikes === 0) {
            await axios.post(LOCAL_NAME + 'api/blog/like/'+articleBlog._id)
            setLimitLikes(1)
            return setArticleBlog({...articleBlog, like: articleBlog.like+1}); 
        } 

        return NotifyTimer(2000, 'You have already evaluated this blog!')
      } catch (e) {
         console.log(e)
      }
  }

  const dislike = async () => {
    try {
        
        if(limitLikes === 0) {
            await axios.post(LOCAL_NAME + 'api/blog/dislike/'+articleBlog._id)
            setLimitLikes(1)
            return setArticleBlog({...articleBlog, dislike: articleBlog.dislike+1});
        }

        return NotifyTimer(2000, 'You have already evaluated this blog!')
    } catch (e) {
       console.log(e)
    }
}


    const copy = () => {
        const postShare = articleBlog.title
        const postShareImg = articleBlog.image
        const url = document.location.href
        navigator.clipboard.writeText(`${postShare}! \nSuch a nice blog post! \n\n Just look: ${url} \n\n ${'http://localhost:5000/' + postShareImg}`)
        .then(() => {
            console.log(url)
        })
        .catch(err => {
            console.log('Something went wrong', err);
        });
    }

  return (
    <>
      <MainLayout description={articleBlog.description} key={"Anime Blog Post"} keywords={articleBlog.seo} title={`Anime Store ❤️ | ${articleBlog.title}`}>
      <div>
        <div className="anime_clothing">
            <div className="container">
                <div className='row'>
                    <div className='col-lg-6 col-md-6 col-xs-6'>
                        <div className='anime_clothing-image'>
                            <img
                                src={LOCAL_NAME + articleBlog.image}
                                className="anime_clothing-image_image"
                                alt="Anime image"
                                data-aos="zoom-in-up"
                                    />
                        </div>
                        <div data-aos="zoom-in-up" className='anime_clothing-user'>
                            <div className='anime_clothing-user-data'>
                                <img
                                    src={LOCAL_NAME + articleBlog.image}
                                    className="anime_clothing-user-data__image"
                                    alt="Anime image"
                                    data-aos="zoom-in-up"
                                    
                                        />
                                <h4 data-aos="fade-up" className="anime_clothing-user-data__h4">Anime Shop</h4>
                                <FontAwesomeIcon onClick={removeBlogPost} className="anime_clothing-user-data__icon" icon={faRemove}/>
                                <FontAwesomeIcon onClick={copy} className="anime_clothing-user-data__icon" icon={faShare}/>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-6 col-xs-6'>
                        <div data-aos="zoom-in-up" className='anime_clothing-info'>
                            <h4 data-aos="fade-up" className='anime_clothing-info_h4'>{articleBlog.title} ❤️</h4>
                            <div className='anime_clothing-info_rating'>
                                <p data-aos="fade-up" data-aos-delay="100">{articleBlog.subtitle}</p>
                            </div>
                            <div className='anime_clothing-info__description'>
                                <p data-aos="fade-up" data-aos-delay="200"><a onClick={like}>❤️</a> {articleBlog.like}  <a onClick={dislike}>💔</a> {articleBlog.dislike}</p>
                            </div>
                            <div className='anime_clothing-info__description'>
                                <p data-aos="fade-up" data-aos-delay="900">Description: {articleBlog.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div>
          <div  className='anime-clothing__comments'>
              <div className='container'>
                  <div data-aos="zoom-in-up" className='anime-clothing__comments-block'>
                    <h4 data-aos="fade-up" className='anime-clothing__comments-block__h4'>Comments 💞</h4>
                    <div data-aos="zoom-in-up" className='anime-clothing__comments-block-create'>
                    <h4 data-aos="fade-up" className='anime-clothing__comments-block-create__h4'>Create a comment 🙃</h4>
                        <div data-aos="fade-down" className='anime-clothing__comments-block-create-inputs'>
                            <div className='anime-clothing__comments-block-create-inputs_block'>
                                <input placeholder='What do you think about this?' type="text" value={textComment} onChange={e => setTextComment(e.target.value)} className="text"/>
                            </div>
                        </div>
                        <div  className="anime-dropdown-comments">
                            <div className="dropdown-comments">
                                <button className="dropbtn">Rating: {ratingComment} ❤️</button>
                                <div className="dropdown-comments-content">
                                    <a onClick={() => setRatingComment(1)}>1x❤️</a>
                                    <a onClick={() => setRatingComment(2)}>2x❤️</a>
                                    <a onClick={() => setRatingComment(3)}>3x❤️</a>
                                    <a onClick={() => setRatingComment(4)}>4x❤️</a>
                                    <a onClick={() => setRatingComment(5)}>5x❤️</a>
                                </div>
                            </div>
                        </div>
                        <div className='anime_clothing-info__buttons'>
                            <a className='anime_clothing-info__buttons_button' onClick={addComment}>Create!</a>
                        </div>
                    </div>
                    <div className='anime-clothing__comments-block-all'>
                        <h4 className='anime-clothing__comments-block__h4 anime-clothing__comments-block-all__h4'>All Comments 👀</h4>
                        <div data-aos="zoom-in-up" className='anime-clothing__comments-block-all__items'>
                            {articleBlog.comments.map((c) => {
                                return (
                                    <div key={c.userId} className='anime-clothing__comments-block-all__items-item'>
                                        <div className='anime-clothing__comments-block-all__items-item_info'>
                                            <img
                                                src={LOCAL_NAME + c.avatar}
                                                className="anime-clothing__comments-block-all__items-item_info_image"
                                                alt="Anime image"
                                                data-aos="fade-up"
                                                    />
                                            <p data-aos="fade-down">{c.username}</p>
                                        </div>
                                        <h4 data-aos="fade-up">Rating: {c.rating}❤️</h4>
                                        <div className='anime-clothing__comments-block-all__items-item_text'>
                                            <p data-aos="fade-down">{c.text}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
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
                  <ul className="cards-clothing">
              {blogs.slice(0, 3).map((s) => (
                    <li data-aos="slide-up" key={s._id}>
                      <a onClick={() => router.push('/world/blog/'+s._id)} className="card-favorite">
                        <img src={LOCAL_NAME +s.image} className="card__image" alt="" />
                        <div className="card__overlay">
                          <div className="card__header">                    
                            <img className="card__thumb" src={LOCAL_NAME + s.image} alt="" />
                            <div className="card__header-text">
                              <h3 className="card__title">{s.title}</h3>            
                              <span className="card__status">{s.like} ❤️{"| "}{s.dislike} 💔</span>
                            </div>
                          </div>
                          <p className="card__description">{s.description}</p>
                        </div>
                      </a>      
                    </li>
                ))}
                </ul>
              </div>
            </div>
      </div>
      </div>
      </div>
      </MainLayout>
    </>
  )
}

export default BlogPost;

export const getServerSideProps: GetServerSideProps = async ({params}:any) => {
    const response = await axios.get(LOCAL_NAME + 'api/blog/' + params.id)
    const responseBlog = await axios.get(LOCAL_NAME + `api/blog`)

    function shuffleArray(array:any) {
        let i = array.length - 1;
        for (; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        }
        return array;
    }
    return {
        props: {
            serverBlog: response.data,
            blogAll: shuffleArray(responseBlog.data)
        },
        
    }
}