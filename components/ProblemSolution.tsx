import React from 'react';
import { Pill, AlertTriangle, DollarSign } from 'lucide-react';

const ProblemSolution: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image */}
          <div className="w-full lg:w-1/2">
            <img 
              src="https://picsum.photos/600/700?random=20" 
              alt="Skin Problems" 
              className="w-full h-auto rounded-sm shadow-xl"
            />
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-gray-900 mb-6">
              Experiencing Persistent & Recurring Skin Problems?
            </h2>
            <p className="text-gray-600 mb-10 leading-relaxed">
              Did you undergo any of the following to tackle your skin concerns? For many, caring for your skin can be overwhelming. We understand how frustrating it is to experience persistent, recurring skin problems without sustainable results.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4 text-teal-600">
                     <Pill size={32} />
                  </div>
                  <span className="font-semibold text-gray-800">Prescribed Medication</span>
               </div>
               <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4 text-teal-600">
                     <AlertTriangle size={32} />
                  </div>
                  <span className="font-semibold text-gray-800">Invasive Procedures</span>
               </div>
               <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4 text-teal-600">
                     <DollarSign size={32} />
                  </div>
                  <span className="font-semibold text-gray-800">Expensive Products</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
