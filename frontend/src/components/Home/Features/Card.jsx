function Card({ title, description, image }) {
  return (
    <div className='text-center'>
      <div className='flex-shrink-0'>
        <div className='flex items-center justify-center rounded-md h-40 w-40 m-auto'>
          <img src={image} alt={title} />
        </div>
      </div>
      <div className='mt-5'>
        <h3 className='text-2xl font-medium text-gray-900'>{title}</h3>
        <p className='mt-2 text-base text-gray-500'>{description}</p>
      </div>
    </div>
  );
}

export default Card;
