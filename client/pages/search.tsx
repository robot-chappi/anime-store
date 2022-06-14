import type { NextPage } from 'next'
import Image from 'next/image'
import MainLayout from '../layouts/MainLayout'
import home_img from '../images/search.png'
import { useRouter } from 'next/router'
import { useState } from 'react'


const Search: NextPage = () => {
  const router = useRouter()

  const [search, setSearch] = useState<string>("")

  return (
    <>
      <MainLayout description={"We are a large anime online store that has everything from clothes to its own community! Come to us! You'll like it, honey!"} key={"Anime Search"} keywords={"anime, store, anime hoodie, anime clothes, anime community, search"} title={"Anime Store | Search 📱"}>
      <div>
        <div className="home-page">
            <div className="container">
                <div className='home-page-search'>
                    <div id="cover">
                    <form className='home-page-search__form' method="get" action="">
                        <div className="tb">
                        <div className="td"><input value={search} onChange={e => setSearch(e.target.value)} data-aos="fade-up" className='home-page-search__input' type="text" placeholder="Don't touch me >_<" required/></div>
                        <div className="td" id="s-cover">
                            <button className='home-page-search__button' type="button" onClick={() => router.push('/search/'+search)}>
                            <div id="s-circle"></div>
                            <span></span>
                            </button>
                        </div>
                        </div>
                    </form>
                    </div>
                    <div className='home-page-search__illustration'>
                        <div className='row'>
                            <div className="col col-lg col-md col-sm col-xs home-page-illustraitions_image">
                                <Image
                                        data-aos="fade-up"
                                        className='home-page-illustraitions_image-search'
                                        src={home_img}
                                        alt="Chappic image"
                                        style={{ marginBottom: `1.45rem` }}
                                    />
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

export default Search;

