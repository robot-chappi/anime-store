import { useRouter } from 'next/router';
import React from 'react';
import { IAds } from '../types/ads';
import { LOCAL_NAME } from '../utils/consts';

// CHANGED IT
interface AdsListProps {
    ads: IAds[]
}

const AdsBanner: React.FC<AdsListProps> = ({ads}) => {

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
    
      const adsArray = shuffleArray(ads)

    return (
        <div className='ads'>
            <div className='container'>
            {adsArray.slice(0, 1).map((s:any) => {
                return (
                <div data-aos="zoom-in-up" className='ads_block' key={s._id}>
                    <a className='ads_block__a' href={s.name}>
                    <img src={LOCAL_NAME + s.image} className="ads_block__image" alt="" />
                    </a>
                </div>
                )
            })}
            </div>
        </div>
    )
}

export default AdsBanner;