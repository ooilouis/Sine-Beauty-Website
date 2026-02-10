
import React from 'react';

const CreateAccount: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500 pt-20">
      <div className="relative min-h-[600px] flex items-center justify-center py-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
            <img 
                src="https://caringskin.com.sg/wp-content/uploads/2023/11/forgot-masthead.jpg" 
                alt="Background" 
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
            <div className="flex justify-end">
                <div className="w-full lg:w-5/12 bg-white p-8 md:p-12 rounded-lg shadow-2xl">
                    <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">Create Account</h1>
                    
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                                <input type="text" placeholder="Type first name here" className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:border-teal-500 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                                <input type="text" placeholder="Type last name here" className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:border-teal-500 transition-colors" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                            <input type="email" placeholder="Type email here" className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:border-teal-500 transition-colors" />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                            <input type="password" placeholder="Type password here" className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:border-teal-500 transition-colors" />
                        </div>

                        <div className="flex items-start gap-3">
                            <input type="checkbox" id="privacy" className="mt-1" />
                            <label htmlFor="privacy" className="text-sm text-gray-600">
                                By submitting this data you agree that it will be processed in accordance with our <a href="#" className="text-teal-600 hover:underline">Privacy Policy</a>
                            </label>
                        </div>

                        <button type="submit" className="w-full bg-teal-600 text-white font-bold py-3 rounded hover:bg-teal-700 transition-colors uppercase tracking-widest text-sm">
                            Create Account
                        </button>

                        <div className="text-center pt-4 border-t border-gray-100">
                            <p className="text-gray-600">
                                Already have account? <a href="#" className="text-teal-600 font-bold hover:underline">Login</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
