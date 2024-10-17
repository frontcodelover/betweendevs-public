import { Link } from 'react-router-dom';
import ImageMelissa from '../../assets/melissa.jpg';
import ImageSamuel from '../../assets/samuel.jpg';
import ImageFodil from '../../assets/fodil.jpg';
import ImageNicolas from '../../assets/nicolas.jpg';

function About() {
  const people = [
    {
      name: 'Melissa',
      role: 'Scrum Master / Développeuse Front-End',
      picture: `${ImageMelissa}`,
      linkedin: 'https://www.linkedin.com/in/melissa-chemmama-aidan-8b7161150/',
    },
    {
      name: 'Samuel',
      role: 'Lead développeur Back-End',
      picture: `${ImageSamuel}`,
      linkedin: 'https://www.linkedin.com/in/samuel-besson-dev-web/',
    },
    {
      name: 'Fodil',
      role: 'Référent technique / Développeur Back-End',
      picture: `${ImageFodil}`,
      linkedin: 'https://www.linkedin.com/in/fodil-boudjema-a5b12b181/',
    },
    {
      name: 'Nicolas',
      role: 'Lead développeur Front-End',
      picture: `${ImageNicolas}`,
      linkedin: 'https://www.linkedin.com/in/nicolas-de-raemy/',
    },
  ];

  return (
    <div className='bg-white pb-24 sm:py-32'>
      <div className='mx-auto grid max-w-7xl gap-x-8 gap-y-20 xl:grid-cols-3'>
        <div className='max-w-2xl'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>Rencontrez notre équipe </h2>
          <p className='mt-6 text-lg leading-8 text-gray-600'>Une application développée par quatre étudiants de l'école O'Clock, tous passionnés par la programmation informatique.</p>
        </div>
        <ul role='list' className='grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2'>
          {people.map((person) => (
            <li key={person.name}>
              <div className='flex items-center gap-x-6'>
                <img className='h-16 w-16 rounded-full' src={person.picture} alt='' />
                <div>
                  <Link to={person.linkedin} target='_blank' title={`Profil Linkedin de ${person.name}`}>
                    <h3 className='text-base font-semibold leading-7 tracking-tight text-gray-900'>{person.name}</h3>
                  </Link>
                  <p className='text-sm font-semibold leading-6 text-indigo-600'>{person.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default About;
