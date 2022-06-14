import type { NextPage } from 'next'
import MainLayout from '../../layouts/MainLayout'
import ClothingList from '../../components/ClothingList'
import { useState } from 'react'
import axios from 'axios'


const ClothingSearch: NextPage = ({serverClothing}: any) => {

  const [clothing, setClothing] = useState<any[]>(serverClothing)

  return (
    <>
      <MainLayout description={"We are a large anime online store that has everything from clothes to its own community! Come to us! You'll like it, honey!"} key={"Anime Clothing Store"} keywords={"anime, store, anime hoodie, anime clothes, anime community"} title={"Anime Store | Clothing 🍓"}>
      
      <div>
        <div className='info-page'>
          <div className='container'>
            <div className='user-info-footer'>
              <div className='user-info-cart'>
              <h4 data-aos="fade-up">What you wanted ʕ•ᴥ•ʔ</h4>
                  <ClothingList clothings={clothing} />
              </div>
            </div>
      </div>
      </div>
      </div>
      </MainLayout>
    </>
  )
}

export default ClothingSearch;

export const getServerSideProps: GetServerSideProps = async ({params}:any) => {
    const response = await axios.get('http://localhost:5000/api/clothing/search/item?query=' + params.id)


    return {
        props: {
            serverClothing: response.data,
        },
        
    }
}