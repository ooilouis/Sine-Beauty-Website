import React from 'react';
import Hero from './Hero';
import Awards from './Awards';
import ProblemSolution from './ProblemSolution';
import ValueProposition from './ValueProposition';
import SignatureTreatments from './SignatureTreatments';
import Steps from './Steps';
import Guarantee from './Guarantee';
import Stories from './Stories';
import Reviews from './Reviews';
import FAQ from './FAQ';
import AsSeenOn from './AsSeenOn';

const Home: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <Hero />
      <Awards />
      <ProblemSolution />
      <ValueProposition />
      <SignatureTreatments />
      <Steps />
      <Guarantee />
      <div className="container mx-auto px-4"><hr className="border-gray-200" /></div>
      <Stories />
      <div className="container mx-auto px-4"><hr className="border-gray-200" /></div>
      <Reviews />
      <FAQ />
      <AsSeenOn />

      <section className="bg-[#f5f7f9] py-16 text-center">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif mb-6 text-gray-800">Book A Therapeutic Facial Today</h2>
            <a href="#" className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 uppercase tracking-wide">
                Book Trial Session
            </a>
        </div>
      </section>
    </div>
  );
};

export default Home;