import React from 'react';
import iconleft from '@/assets/iconleft.png'
import iconmid from '@/assets/iconmid.png'
import iconright from '@/assets/iconright.png'

const Card = ({ iconSrc, title, description, items, buttonText }) => {
  return (
    <div className="relative bg-white p-1 rounded-[90px] flex flex-col items-center md:space-y-8 border border-black w-full max-w-sm h-[300px] md:h-[480px]">
      {/* Icon */}
      <div className="relative md:absolute md:-top-10 flex items-center justify-center w-[15vw] md:w-[7vw] h-[15vw] md:h-[7vw] rounded-full bg-blue-600">
        <img src={iconSrc} alt={title} className="w-[70%] h-[70%]" />
      </div>

      {/* Content */}
      <div className="w-full md:pt-12">
        <h3 className="text-lg font-semibold text-gray-900 text-center">{title}</h3>
        <p className="text-sm text-gray-500 text-center mt-4 p-2">{description}</p>
      </div>

      {/* Bullets */}
      <ul className="list-disc text-left text-sm text-gray-600 pl-6">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      {/* Button */}
      <button className="mt-4 py-2 px-6 bg-blue-600 text-white rounded-full hover:bg-blue-700">
        {buttonText}
      </button>
    </div>
  );
};

const CardsSection = () => {
  const cardsData = [
    {
      iconSrc: `${iconleft}`, 
      title: 'Meet the New People',
      description: 'Expand your network and connect with a diverse community of professionals.',
      items: [
        'Connect with like-minded professionals.',
        'Build valuable relationships and network.',
        'Engage with mentors and experienced members.'
      ],
      buttonText: 'Learn More'
    },
    {
      iconSrc: `${iconmid}`, 
      title: 'Explore Opportunities',
      description: 'Uncover new roles, projects, and learning experiences to boost your career.',
      items: [
        'Discover various roles and projects.',
        'Learn through hands-on experience.',
        'Grow your skills and expertise.'
      ],
      buttonText: 'Get Involved'
    },
    {
      iconSrc: `${iconright}`, 
      title: 'Join Us',
      description: 'Be a part of our journey and make an impact with your contribution.',
      items: [
        'Become part of an innovative team.',
        'Contribute to impactful projects.',
        'Kickstart your career with DOC-Q!'
      ],
      buttonText: 'Apply Now'
    }
  ];

  return (
    <div className="flex flex-col md:flex-row justify-center items-center md:gap-[13%] space-y-[10px] w-[85%] md:w-[80%] mt-[6%]">
      {cardsData.map((card, index) => (
        <Card
          key={index}
          iconSrc={card.iconSrc}
          title={card.title}
          description={card.description}
          items={card.items}
          buttonText={card.buttonText}
        />
      ))}
    </div>
  );
};

export default CardsSection;
