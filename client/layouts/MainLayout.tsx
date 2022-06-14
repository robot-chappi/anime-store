
import Head from 'next/head';
import React, { useEffect, PropsWithChildren } from 'react';
import Footer from '../components/Footer';
import { Header } from '../components/NavBar';
import AOS from "aos";
import "aos/dist/aos.css";


interface MainLayoutProps {
    children: any;
    title?: string;
    description: string;
    keywords?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({children, title, description, keywords}) => {

    useEffect(() => {
        AOS.init({duration: 1000});
        AOS.refresh();
    }, []);

    return (
        <>
            <Head>
                <title>{title || 'Anime Store'}</title>
                <meta name='description' content={`Anime Community, clothing, arts and more more and more other things` + ' ' + description}/>
                <meta name='robots' content='index, follow'/>
                <meta name='keywords' content={keywords || "Anime, Anime Clothing, Anime arts"}/>
                <meta name='viewport' content="width=device-width, initial-scale=1"/>
            </Head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous"></link>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossOrigin="anonymous"></script>
            <Header/>
            <div>
                {children}
            </div>
            <Footer/>
        </>
    );
};

export default MainLayout;