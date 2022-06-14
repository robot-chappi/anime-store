import { useRouter } from 'next/router';
import React from 'react';
import { ICommunity } from '../types/community';
import { LOCAL_NAME } from '../utils/consts';

interface CommunityListProps {
    communities: ICommunity[]
}

const CommunityList: React.FC<CommunityListProps> = ({communities}) => {

    const router = useRouter()

    return (
        <div>
            <ul className="cards-clothing">
              {communities.map((s) => (
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
    )
}

export default CommunityList;