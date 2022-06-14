import { useRouter } from 'next/router';
import React from 'react';
import { IClothing } from '../types/clothing';
import { LOCAL_NAME } from '../utils/consts';

// CHANGED IT
interface ClothingListProps {
    clothings: IClothing[]
}

const ClothingList: React.FC<ClothingListProps> = ({clothings}) => {

    const router = useRouter()

    return (
        <div>
            <ul className="cards-clothing">
              {clothings.map((s) => (
                    <li data-aos="slide-up" key={s._id}>
                      <a onClick={() => router.push('/product/'+s._id)} className="card-favorite">
                        <img src={LOCAL_NAME + s.picture} className="card__image" alt="" />
                        <div className="card__overlay">
                          <div className="card__header">                    
                            <img className="card__thumb" src={LOCAL_NAME + s.picture} alt="" />
                            <div className="card__header-text">
                              <h3 className="card__title">{s.name}</h3>            
                              <span className="card__status">{s.price} ₽</span>
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

export default ClothingList;