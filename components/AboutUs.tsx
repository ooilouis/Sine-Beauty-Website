import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import Guarantee from './Guarantee';

const opportunities = [
    {
        title: "Senior/Customer Service Officer",
        location: "Singapore",
        type: "Full Time",
        description: "The CSO is the ambassador and advocate of Caring brand. She is responsible for receiving, greeting, identifying queries and needs of customers, providing them with suitable resolution and total customer service. The CSO interacts positively to ensure satisfying experience for the customers.",
        responsibilities: [
            "Provide customers at the front desk with total customer service that delivers Caring Experience",
            "Act as an ambassador for Caring brand, projecting the brand image and culture",
            "Attend to walk-in and in-coming call/email enquiries professionally",
            "Handle all customers’ requests promptly and that they are resolved to customers’ satisfaction"
        ],
        benefits: [
            "Special incentives and rewards programs",
            "Referral Incentives",
            "AWS and Annual Performance Bonus",
            "Medical benefits",
            "Products and Services Benefits"
        ]
    },
    {
        title: "Esthetician",
        location: "Singapore",
        type: "Full Time",
        description: "The Esthetician is the heart of our service delivery, providing professional treatments and advice to help customers achieve their skin goals.",
        responsibilities: [
            "Perform professional facial treatments and skin analysis",
            "Provide professional skincare advice and recommendations",
            "Build and maintain good relationship with customers",
            "Maintain cleanliness and hygiene of treatment rooms"
        ],
        benefits: [
            "Special incentives and rewards programs",
            "Referral Incentives",
            "AWS and Annual Performance Bonus",
            "Medical benefits",
            "Products and Services Benefits"
        ]
    }
];

const AboutUs: React.FC = () => {
    const [openJob, setOpenJob] = useState<number | null>(null);

    return (
        <div className="animate-in fade-in duration-500">
            {/* Masthead */}
            <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
                <div className="absolute inset-0">
                    <img
                        src="https://caringskin.com.sg/wp-content/uploads/2023/10/masthead-about-us.jpg"
                        alt="About Masthead"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-4xl md:text-6xl font-bold font-serif mb-4 drop-shadow-md">Face Life With Confidence</h1>
                </div>
            </section>

            {/* Description */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-4xl text-center text-gray-600 leading-relaxed space-y-6 text-lg">
                    <p>Founded in 2013, Caring Skin is committed to providing result-driven treatments and holistic skincare solutions, specialising in Sensitive and Acne skin concerns by using all-natural plant-based ingredients.</p>
                    <p>Backed by the latest skincare technology and a team of professionally trained estheticians, Caring Skin delivers highly effective treatments that are gentle and delicate on your skin.</p>
                    <p>Being customer-centric is our priority. We value every customer, ensuring 100% customer satisfaction with a strict no-hard selling policy and sincere service. With over 10,000+ 5 stars reviews, Caring Skin is blessed to have emerged as Singapore’s top-rated facial spa.</p>
                </div>
            </section>

            {/* Founder */}
            <section className="py-20 bg-[#f9fafb]">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                        <div className="md:w-1/2 flex justify-center md:justify-end">
                            <img src="https://caringskin.com.sg/wp-content/uploads/2024/10/cs-medispa_website_founder_sub_520px-x-640px_-1.jpg" alt="Subrina Liew" className="w-full max-w-md rounded shadow-lg" />
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-2 leading-tight">Delivering Confidence, <br/>Through Genuine Care</h2>
                            <div className="text-xl text-teal-600 font-medium mb-6 mt-4">Subrina Liew, <span className="text-gray-500 text-base font-normal">Founder</span></div>
                            <hr className="border-t-2 border-dotted border-gray-300 w-24 mb-6" />
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>Subrina founded Caring Skin in 2013 with a clear mission: to make it easy for everyone to achieve clear and healthy skin. What started as a specialized facial spa has now become one of Singapore’s most trusted names, recognized for its transformative skincare solutions and genuine customer care.</p>
                                <p>Driven by her belief in ‘Caring from the Heart,’ Subrina has instilled a customer-centric philosophy at the core of Caring Skin. Her vision focuses on personalized treatment, professional expertise, and creating a supportive environment where every client feels truly understood and valued.</p>
                                <p>As Caring Skin evolves into a Medispa, we are embracing advanced beauty technologies and medical aesthetics, all while staying true to our commitment to care from the heart—not just for your skin, but for the person within.</p>
                            </div>
                            <img src="https://caringskin.com.sg/wp-content/uploads/2025/03/2025-core-values_510px-x-125px_-1024x251.jpg" alt="Core Values" className="mt-8 w-full max-w-md" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Commitment (Reuse Guarantee) */}
            <Guarantee />

            {/* Certificates */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-16">
                         <h2 className="text-3xl font-serif text-gray-900 md:w-5/12 mb-6 md:mb-0">Certified Estheticians With Caring Skin</h2>
                         <p className="text-gray-600 md:w-6/12 leading-relaxed">Caring Skin, Singapore's top sensitive and acne skin specialist, offers a holistic approach to transforming your skin. Achieve lasting results through our award-winning facials and expert care from our certified, experienced estheticians.</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-16 md:gap-32">
                        <div className="text-center group">
                            <a href="#" className="block transform transition-transform group-hover:scale-110 duration-300">
                                <img src="https://caringskin.com.sg/wp-content/uploads/2023/10/Cibtac-Logo.png" alt="CIBTAC" className="h-32 mx-auto mb-4" />
                            </a>
                            <p className="font-bold text-gray-800 max-w-[250px] mx-auto text-sm leading-snug">Confederation of International Beauty Therapy & Cosmotology (CIBTAC)</p>
                        </div>
                        <div className="text-center group">
                            <a href="#" className="block transform transition-transform group-hover:scale-110 duration-300">
                                <img src="https://caringskin.com.sg/wp-content/uploads/2023/10/Cidesco-Logo.png" alt="CIDESCO" className="h-32 mx-auto mb-4" />
                            </a>
                            <p className="font-bold text-gray-800 max-w-[250px] mx-auto text-sm leading-snug">Comite International Desthetique Et De Cosmetologie (CIDESCO)</p>
                        </div>
                    </div>
                </div>
            </section>

             {/* Team Photo */}
             <section className="relative h-[60vh] min-h-[500px]">
                 <img src="https://caringskin.com.sg/wp-content/uploads/2024/09/cs-medispa_website_group-photo_1920px-x-1280px_green_-e1727668835876.jpg" className="w-full h-full object-cover" alt="Team" />
                 <div className="absolute inset-0 bg-teal-900/80 flex items-center justify-center text-center px-4">
                      <div className="max-w-3xl text-white">
                          <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">There Is No Elevator To Success - Only Stairs</h2>
                          <p className="text-lg md:text-xl opacity-90 font-light max-w-2xl mx-auto">It can never be done alone, it's done and achieved by a team of amazing people from different backgrounds with a common goal.</p>
                      </div>
                 </div>
             </section>

             {/* Opportunities */}
             <section className="py-24 bg-white">
                 <div className="container mx-auto px-4 max-w-3xl">
                     <h3 className="text-3xl font-serif text-center mb-12 text-gray-900">Explore Our Opportunities</h3>
                     <div className="space-y-4">
                        {opportunities.map((job, idx) => (
                            <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md">
                                <button 
                                    onClick={() => setOpenJob(openJob === idx ? null : idx)}
                                    className="w-full flex justify-between items-center p-6 bg-white transition-colors text-left focus:outline-none"
                                >
                                    <div>
                                        <div className="font-bold text-gray-900 text-lg">{job.title}</div>
                                        <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                                            <span>{job.location}</span>
                                            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                            <span>{job.type}</span>
                                        </div>
                                    </div>
                                    {openJob === idx ? <Minus className="text-teal-500" /> : <Plus className="text-gray-400" />}
                                </button>
                                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openJob === idx ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="p-6 pt-0 border-t border-gray-100 bg-gray-50/30">
                                        <div className="prose prose-sm max-w-none text-gray-600 pt-6">
                                            <p className="mb-6 leading-relaxed">{job.description}</p>
                                            
                                            <h6 className="font-bold text-gray-900 mb-3 text-base">Core Responsibilities</h6>
                                            <ul className="list-disc pl-5 mb-6 space-y-2">
                                                {job.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                                            </ul>
                                            
                                            <h6 className="font-bold text-gray-900 mb-3 text-base">You Will Get Enjoy</h6>
                                            <ul className="list-disc pl-5 mb-8 space-y-2">
                                                {job.benefits.map((b, i) => <li key={i}>{b}</li>)}
                                            </ul>
                                            
                                            <a href="#" className="inline-block bg-teal-600 text-white px-8 py-3 rounded hover:bg-teal-700 transition-colors font-bold text-xs uppercase tracking-widest shadow-sm">
                                                Join Us
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                     </div>
                 </div>
             </section>
             
             <section className="bg-[#f5f7f9] py-16 text-center border-t border-gray-200">
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

export default AboutUs;