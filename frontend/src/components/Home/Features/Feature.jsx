import Card from './Card';
import DevChat from '../../../assets/devChat.svg';
import DevSearch from '../../../assets/devSearch.svg';
import DevMatch from '../../../assets/devMatch.svg';

function Feature() {
  const featuresContent = [
    {
      id: 1,
      title: 'Rechercher des développeurs',
      description: 'Recherchez des développeurs en fonction de leurs compétences.',
      image: DevSearch,
    },
    {
      id: 2,
      title: 'Matcher avec des développeurs',
      description: "Matcher avec des développeurs en fonction de vos centres d'intérêts.",
      image: DevMatch,
    },
    {
      id: 3,
      title: 'Echanger avec des développeurs ',
      description: 'Echangez avec des développeurs du monde entier et réaliser des projets ensemble.',
      image: DevChat,
    },
  ];

  return (
    <>
      <div className='max-w-7xl mx-auto py-12 lg:py-16 '>
        <div className='lg:grid lg:grid-cols-3 lg:gap-8'>
          <div>
            <h2 className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>Comment ça marche ?</h2>
            <p className='mt-6 text-md leading-8 text-gray-700'>
              Vous êtes passionnés de programmation et souhaitez rencontrer des personnes partageant cette même passion ? BetweenDevs est là pour vous aider. Notre plateforme permet de mettre en
              relation des développeurs du monde entier, que ce soit pour des projets professionnels ou simplement pour échanger et se rencontrer.
            </p>
          </div>
          <div className='mt-12 lg:mt-0 lg:col-span-2'>
            <div className='space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8'>
              {featuresContent.map((feature) => (
                <Card key={feature.id} title={feature.title} description={feature.description} image={feature.image} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Feature;
