import React from 'react';

const awards = [
  'https://caringskin.com.sg/wp-content/uploads/2025/12/SPBA-2025-CS.001-e1765268297938.png',
  'https://caringskin.com.sg/wp-content/uploads/2023/10/Top-Brand.png',
  'https://caringskin.com.sg/wp-content/uploads/2024/10/Exsa.001.png',
  'https://caringskin.com.sg/wp-content/uploads/2023/10/Made-With-Passion-1.png',
  'https://caringskin.com.sg/wp-content/uploads/2024/10/GPTW-Badge-Homepage.001.png',
  'https://caringskin.com.sg/wp-content/uploads/2023/10/Beauty-Treatment-2022.png',
  'https://caringskin.com.sg/wp-content/uploads/2023/10/Women-Weekly-2020.png',
];

const Awards: React.FC = () => {
  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-sm font-bold text-gray-400 tracking-widest uppercase mb-8">
          Award-Winning Singapore Facial Spa Brand
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          {awards.map((src, i) => (
            <img key={i} src={src} alt="Award Logo" className="h-12 md:h-16 object-contain" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;
