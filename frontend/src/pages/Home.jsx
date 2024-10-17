import ContentSection from '../components/Home/ContentSection/ContentSection';
import Hero from '../components/Home/Hero/Hero';
import Feature from '../components/Home/Features/Feature';

function Home() {
  const userID = localStorage.getItem('userID');

  return (
    <>
      <div className='max-w-screen-xl m-auto'>
        <Hero user={userID} />
        <Feature />
      </div>
      <ContentSection user={userID} />
    </>
  );
}

export default Home;
