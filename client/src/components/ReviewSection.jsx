import React from 'react';
import profile1 from '@/assets/profile1.png'; 
import profile2 from '@/assets/profile2.png';
import profile3 from '@/assets/profile3.png';
import profile4 from '@/assets/profile4.png'
import star from '@/assets/star.png'

const ReviewCard = ({ profileSrc, name, review, rating, cardStyle, isRightAligned }) => {
  return (
    <div className={`relative bg-blue-600 text-white rounded-lg p1 pr-[3%] md:w-[300px] md:h-[10vw] flex flex-col space-y-4 border border-black ${cardStyle} pt-[1vw]`}>
      
      {isRightAligned ? (
        <div className="absolute -right-[15%] top-1/2 transform translate-x-3/4 -translate-y-1/2">
          <img src={profileSrc} alt={name} className="w-[25%] h-[25%] rounded-full" />
        </div>
      ) : (
        <div className="absolute -left-[15%] top-1/2 transform -translate-y-1/2">
          <img src={profileSrc} alt={name} className="w-[25%] h-[25%] rounded-full" />
        </div>
      )}

      
      <div className={`flex flex-col ${isRightAligned ? 'items-end pr-[20%]' : 'items-start pl-[10%]'} ml-8`}>
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className={`md:pb-0 text-sm md:w-[90%] ${isRightAligned ? 'text-right' : 'text-left'}`}>{review}</p>
        {/* <div className="flex space-x-1 mt-2">
          {Array.from({ length: rating }).map((_, index) => (
            <span key={index} className="pb-1 md:pb-0 text-yellow-400"><img src={star} alt="" className='h-4 md:h-[2vw]'/></span>
          ))}
        </div> */}
      </div>
    </div>
  );
};

const ReviewsSection = () => {
  const reviews = [
    {
      profileSrc: profile1,
      name: 'S Kumar Rishi',
      review: '"Amazing experience! Learned so much in a short time."',
      rating: 4,
      isRightAligned: false,
    },
    {
      profileSrc: profile2,
      name: 'K Shreyas',
      review: '"Supportive mentors and great projects to work on."',
      rating: 5,
      isRightAligned: true,
    },
    {
      profileSrc: profile3,
      name: 'Muzzafar',
      review: '"Gained practical skills and made real contributions."',
      rating: 4,
      isRightAligned: false,
    },
    {
      profileSrc: profile4,
      name: 'Vikhas Sharma',
      review: '"Best place to grow and explore new opportunities!"',
      rating: 5,
      isRightAligned: true,
    },
  ];

  return (
    <div className="flex flex-col items-start p-8">
      
      <div className="mb-4 md:hidden md:translate-y-[36vw] -translate-x-[3vw]">
        <h2 className="text-4xl text-gray-800 font-bold">Reviews</h2>
        <div className="flex space-x-1 mt-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <span key={index} className="text-black"><img src={star} alt="" className='md:h-[3vw]'/></span>
          ))}
        </div>
      </div>

      
      <div className="relative grid grid-cols-1 gap-6">
        <ReviewCard {...reviews[0]} cardStyle="md:ml-[6%] md:mt-[0%]" />
        <ReviewCard {...reviews[1]} cardStyle="md:ml-[80%] md:mt-[6%]" />
        <ReviewCard {...reviews[2]} cardStyle="md:ml-[155%] md:mt-[6%]" />
        <ReviewCard {...reviews[3]} cardStyle="md:ml-[230%] md:mt-[6%]" />
      </div>
    </div>
  );
};

export default ReviewsSection;
