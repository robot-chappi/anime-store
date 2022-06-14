import { faRemove, faSignInAlt, faSignOut, faTools, faUserNinja } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import MainLayout from '../../../layouts/MainLayout'
import { LOCAL_NAME } from '../../../utils/consts'


interface IUser {
    _id: string;
    email: string;
    role: string;
    name: string;
    avatar: string;
    back: string;
    about: string;
    social: string;
}

const UserPublicAccount: NextPage = ({serverUser}:any) => {

  const router = useRouter()

  const [userPublic, setUserPublic] = useState<IUser>(serverUser)
  
  return (
    <>
        <MainLayout description={userPublic.about} title={`Anime Store | ${userPublic.name} ❤️`}>
        <div>
          <div className="home-page">
              <div className="container">
                  <div className='user-info'>
                    <div className='user-info-header'>
                        <div data-aos="fade-down" className='user-info-back'>
                          <img src={LOCAL_NAME + userPublic.back} className='user-info-back_img'/>
                        </div>
                        <div data-aos="fade-up" className='user-info-avatar'>
                          <img src={LOCAL_NAME + userPublic.avatar} className='user-info-avatar_img'/>
                        </div>
                    </div>
                    <div data-aos="fade-up" className='user-info-middle'>
                      <h4 data-aos="fade-down">{userPublic.name} </h4>
                      <div className='user-info-middle_add'>
                        <p data-aos="fade-up">Description: {userPublic.about}</p>
                        <p data-aos="fade-up">Social: <a href={userPublic.social} target={'_blank'}>{userPublic.social}</a></p>
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

export default UserPublicAccount;

export const getServerSideProps: GetServerSideProps = async ({params}:any) => {
    const response = await axios.get(LOCAL_NAME + 'api/user/find/public/' + params.id)
    const user = response.data

    return {
        props: {
            serverUser: user['_doc'],
        }
        
    }
}