import type { GetServerSideProps, NextPage } from 'next'
import MainLayout from '../../../layouts/MainLayout'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove, faShare } from '@fortawesome/free-solid-svg-icons';
import { NextThunkDispatch } from '../../../store';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import Swal from 'sweetalert2';
import { deleteCommunities } from '../../../store/actions-creators/communities';
import { NotifyTimer } from '../../../components/notification';
import { LOCAL_NAME } from '../../../utils/consts';



const Post: NextPage = ({serverCommunity, communityAll}:any) => {

    const {user, error} = useTypedSelector(state => state.user)

    useEffect(() => {
        setCommunityP(serverCommunity)
        setCommunityPosts(communityAll)
        setRatingComment(1)
        setTextComment("")
        setLimitLikes(0)
    }, [serverCommunity])

    const [community, setCommunityP] = useState<any>(serverCommunity)
    const [communityPosts, setCommunityPosts] = useState<any[]>(communityAll)

    const [ratingComment, setRatingComment] = useState<number>(1)
    const [checkingData, setCheckingData] = useState<number>(0)
    const [checkingDataFavorite, setCheckingDataFavorite] = useState<number>(0)
    const [textComment, setTextComment] = useState<string>("")

    const [limitLikes, setLimitLikes] = useState(0)

  const router = useRouter()
  const dispatch = useDispatch() as NextThunkDispatch;


  const removeCommunityPost = async () => {
    try {
        if(user._id === community.user._id) {
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
                    dispatch(deleteCommunities(community.community._id))
                    Swal.fire({title: 'Successfully deleted!', background: "#e84393",
                    color: "#fff", icon: 'success'})
                    return router.push('/community')
                } else if (result.isDenied) {
                    return Swal.fire({title: 'The article remained intact!', background: "#e84393",
                    color: "#fff", icon: 'info'})
                }
                })
            }

            return NotifyTimer(2000, 'You are not the author of this post and cannot delete it!')
         
    } catch (e) {
        console.log(e)
    }
}

const addComment = async () => {
  try {
      const response = await axios.post(LOCAL_NAME + 'api/community/add/comment', {
            userId: user._id,
            username: user.name,
            avatar: user.avatar,
            text: textComment,
            rating: ratingComment,
            communityId: community.community._id
      })
      return setCommunityP({community: {...community.community, comments: [...community.community.comments, response.data]}, user: {...community.user}})
  } catch (e) {
      console.log(e)
  }
}
const like = async () => {
    try {
      if (limitLikes === 0) {
          await axios.post(LOCAL_NAME + 'api/community/like/'+community.community._id)
          setLimitLikes(1)
          return setCommunityP({community: {...community.community, like: community.community.like+1}, user: {...community.user}})
      } 
      let timerInterval:any;

      return Swal.fire({
          title: 'You have already evaluated this post!',
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
            console.log('I was closed by the timer')
          }
        })
    } catch (e) {
       console.log(e)
    }
}

const dislike = async () => {
  try {
      if (limitLikes === 0) {
        await axios.post(LOCAL_NAME + 'api/community/dislike/'+community.community._id)
        setLimitLikes(1)
        return setCommunityP({community: {...community.community, dislike: community.community.dislike+1}, user: {...community.user}})
    } 
      let timerInterval:any;

      return Swal.fire({
          title: 'You have already evaluated this post!',
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
            console.log('I was closed by the timer')
          }
        })
  } catch (e) {
     console.log(e)
  }
}

    const copy = () => {
        const postShare = community.community.title
        const postShareImg = LOCAL_NAME +  community.community.art
        const url = document.location.href
        navigator.clipboard.writeText(`${postShare}! \nSuch a nice art! \n\n Just look: ${url} \n\n ${postShareImg}`)
        .then(() => {
            console.log(url)
        })
        .catch(err => {
            console.log('Something went wrong', err);
        });
    }
    

  return (
    <>
      <MainLayout description={community.community.description} key={"Anime Community Post"} keywords={community.community.hashtag} title={`Anime Store ❤️ | ${community.community.title}`}>
      <div>
        <div className="anime_clothing">
            <div className="container">
                <div className='row'>
                    <div className='col-lg-6 col-md-6 col-xs-6'>
                        <div className='anime_clothing-image'>
                            <img
                                src={LOCAL_NAME +  community.community.art}
                                className="anime_clothing-image_image"
                                alt="Anime image"
                                data-aos="zoom-in-up"
                                    />
                        </div>
                        <div data-aos="zoom-in-up" className='anime_clothing-user'>
                            <div className='anime_clothing-user-data'>
                                <img
                                    src={LOCAL_NAME +  community.user.avatar}
                                    className="anime_clothing-user-data__image"
                                    alt="Anime image"
                                    data-aos="zoom-in-up"
                                    onClick={() => router.push('/world/users/'+community.user._id)}
                                        />
                                <h4 data-aos="fade-up" className="anime_clothing-user-data__h4">{serverCommunity.user.name}</h4>
                                <FontAwesomeIcon onClick={removeCommunityPost} className="anime_clothing-user-data__icon" icon={faRemove}/>
                                <FontAwesomeIcon onClick={copy} className="anime_clothing-user-data__icon" icon={faShare}/>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-6 col-xs-6'>
                        <div data-aos="zoom-in-up" className='anime_clothing-info'>
                            <h4 data-aos="fade-up" className='anime_clothing-info_h4'>{community.community.title} ❤️</h4>
                            <div className='anime_clothing-info_rating'>
                                <p data-aos="fade-up" data-aos-delay="100">{community.community.subtitle}</p>
                            </div>
                            <div className='anime_clothing-info__description'>
                                <p data-aos="fade-up" data-aos-delay="200"><a onClick={like}>❤️</a> {community.community.like}  <a onClick={dislike}>💔</a> {community.community.dislike}</p>
                            </div>
                            <div className='anime_clothing-info__brand-type'>
                                <h3 data-aos="fade-up" data-aos-delay="300"> Social: {community.community.socialAdd}</h3>
                                <h4 data-aos="fade-up" data-aos-delay="400">HashTag: {community.community.hashtag}</h4>
                            </div>
                            <div className='anime_clothing-info__description'>
                                <p data-aos="fade-up" data-aos-delay="900">Description: {community.community.description}</p>
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
                            {community.community.comments.map((c) => {
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
              {communityPosts.slice(0, 3).map((s) => (
                    <li data-aos="slide-up" key={s._id}>
                      <a onClick={() => router.push('/world/post/'+s._id)} className="card-favorite">
                        <img src={LOCAL_NAME + s.art} className="card__image" alt="" />
                        <div className="card__overlay">
                          <div className="card__header">                    
                            <img className="card__thumb" src={LOCAL_NAME + s.art} alt="" />
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

export default Post;

export const getServerSideProps: GetServerSideProps = async ({params}:any) => {
    const response = await axios.get(LOCAL_NAME + 'api/community/' + params.id)
    const responseCommunity = await axios.get(LOCAL_NAME + `api/community`)

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
            serverCommunity: response.data,
            communityAll: shuffleArray(responseCommunity.data)
        },
        
    }
}