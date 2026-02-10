import React from 'react';
import { Phone, Mail } from 'lucide-react';

const outlets = [
    {
        name: "321 Clementi",
        address: "321 Clementi Avenue 3 , #02-09 Singapore 129905",
        phone: "+65 6737 7797",
        image: "https://caringskin.com.sg/wp-content/uploads/2023/11/ac78891f0881d299f5b70c02948031ac.png",
        mapLink: "https://www.google.com/maps/place/Caring+Skin+Clementi+-+Best+Sensitive+%26+Acne+Solutions+Singapore/@1.3119954,103.7624922,17z/data=!3m2!4b1!5s0x31da10058bfcb5b7:0x5b6d0f5d2162d4ea!4m6!3m5!1s0x31da198d04d8b81f:0x6eee3a7fbe39392!8m2!3d1.3119954!4d103.7650671!16s%2Fg%2F11c4bnbjml?entry=ttu"
    },
    {
        name: "Heartland Mall",
        address: "205 Hougang Street 21, #03-10, Singapore 530205",
        phone: "+65 6242 3668",
        image: "https://caringskin.com.sg/wp-content/uploads/2023/11/35d0e73e637799f5155e85319f96e9d1.png",
        mapLink: "https://www.google.com/maps/place/Caring+Skin+Heartland+Mall+-+Best+Sensitive+%26+Acne+Solutions+Singapore/@1.3595355,103.8829221,17z/data=!3m2!4b1!5s0x31da17b3ff283765:0x8cae21af81e5cee4!4m6!3m5!1s0x31da17e376b3b96b:0xf7bd912e162a041c!8m2!3d1.3595355!4d103.885497!16s%2Fg%2F11fqswqmd3?entry=ttu"
    },
    {
        name: "Ngee Ann City",
        address: "Ngee Ann City , 391B Orchard Road, #05-22, Singapore 238873",
        phone: "+65 6235 3551",
        image: "https://caringskin.com.sg/wp-content/uploads/2023/11/784245b7742e3d1fb34cea114dc0cb4b.png",
        mapLink: "https://www.google.com/maps/place/Caring+Skin+Ngee+Ann+City+-+Best+Sensitive+%26+Acne+Solutions+Singapore/@1.3027623,103.8317152,17z/data=!3m2!4b1!5s0x31da1991ed6cf3db:0xf5e44993c822d509!4m6!3m5!1s0x31da193c9aaedc3f:0x37cfa295e3edf5b6!8m2!3d1.3027623!4d103.8342901!16s%2Fg%2F11fp9xtfdr?entry=ttu"
    },
    {
        name: "Bedok",
        address: "445 Bedok North Street 1, #02-04/05 Djitsun Mall, Singapore 469661",
        phone: "+65 6241 1711",
        image: "https://caringskin.com.sg/wp-content/uploads/2023/11/5bc95d42b9554bd13066c663124b5371.png",
        mapLink: "https://www.google.com/maps/place/Caring+Skin+Bedok+-+Best+Sensitive+%26+Acne+Solutions+Singapore/@1.302761,103.7518881,12z/data=!4m10!1m2!2m1!1sbedok+caring+skin!3m6!1s0x31da236afdab2bd3:0x61810b35dfbd1141!8m2!3d1.3260945!4d103.9294772!15sChFiZWRvayBjYXJpbmcgc2tpbiIDiAEBkgEKZmFjaWFsX3NwYeABAA!16s%2Fg%2F11grsqs5hb?entry=ttu"
    }
];

const ContactUs: React.FC = () => {
    return (
        <div className="animate-in fade-in duration-500">
            {/* Get In Touch Section */}
            <section className="pt-32 pb-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Left Info */}
                        <div className="lg:w-1/2">
                            <div className="mb-10">
                                <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">Get In Touch</h1>
                                <p className="text-gray-600 text-lg">Start your journey to healthier & brighter skin</p>
                            </div>

                            <div className="space-y-8 text-gray-700">
                                <div>
                                    <h3 className="font-bold text-gray-400 tracking-widest uppercase text-sm mb-2">Corporate Office</h3>
                                    <address className="not-italic leading-relaxed">
                                        Caring Group Pte Ltd<br />
                                        67 Ubi Road 1 #07-11, Oxley Bizhub,<br />
                                        Singapore 408730
                                    </address>
                                </div>

                                <div>
                                    <h3 className="font-bold text-gray-400 tracking-widest uppercase text-sm mb-2">For General Enquiries</h3>
                                    <div className="flex flex-col gap-1">
                                        <a href="mailto:enquiry@caringskin.com.sg" className="hover:text-teal-600 transition-colors inline-flex items-center gap-2">
                                            <Mail size={16} /> enquiry@caringskin.com.sg
                                        </a>
                                        <a href="tel:+6587680183" className="hover:text-teal-600 transition-colors inline-flex items-center gap-2">
                                            <Phone size={16} /> +65 8768 0183
                                        </a>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-bold text-gray-400 tracking-widest uppercase text-sm mb-2">For Media Enquiries</h3>
                                    <a href="mailto:media@caringskin.com.sg" className="hover:text-teal-600 transition-colors inline-flex items-center gap-2">
                                        <Mail size={16} /> media@caringskin.com.sg
                                    </a>
                                </div>

                                <div>
                                    <h3 className="font-bold text-gray-400 tracking-widest uppercase text-sm mb-2">For Customer Feedback</h3>
                                    <a href="mailto:subrina.liew@caringskin.com.sg" className="hover:text-teal-600 transition-colors inline-flex items-center gap-2">
                                        <Mail size={16} /> subrina.liew@caringskin.com.sg
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Right Form (Iframe) */}
                        <div className="lg:w-1/2">
                            <div className="bg-gray-50 rounded-lg overflow-hidden h-full min-h-[600px] border border-gray-100">
                                <iframe 
                                    src="https://forms.zohopublic.com/caringgrouppteltd/form/ContactUs1/formperma/3Dhe-PHhtcCksVX3QiY3CEctPj4oVF2fEIyGxlpe9tU?zf_rszfm=1"
                                    className="w-full h-full min-h-[1100px] border-none"
                                    title="Contact Us Form"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Visit Our Outlets Section */}
            <section className="py-20 bg-[#f9fafb]">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-serif text-center mb-12 text-gray-900">Visit Our Outlets</h2>
                    
                    <div className="space-y-8">
                        {outlets.map((outlet, idx) => (
                            <div key={idx} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                                <div className="flex flex-col lg:flex-row gap-8">
                                    <div className="lg:w-1/4">
                                        <img src={outlet.image} alt={outlet.name} className="w-full h-auto rounded-sm object-cover" />
                                    </div>
                                    <div className="lg:w-3/4 flex flex-col justify-center">
                                        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">{outlet.name}</h3>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                            <div>
                                                <address className="not-italic text-gray-600 mb-2 leading-relaxed">
                                                    {outlet.address}
                                                </address>
                                                <a href={`tel:${outlet.phone.replace(/\s/g, '')}`} className="text-teal-600 font-bold hover:text-teal-800">
                                                    {outlet.phone}
                                                </a>
                                            </div>
                                            
                                            <div>
                                                <h4 className="font-bold text-gray-800 text-sm mb-2 uppercase tracking-wide">Opening Hours</h4>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    <li>Mon – Fri 11:00 am – 9:00 pm</li>
                                                    <li>Sat, Sun and P.H 10:00 am – 8:00 pm</li>
                                                </ul>
                                            </div>
                                            
                                            <div className="flex items-center md:justify-end">
                                                <a 
                                                    href={outlet.mapLink} 
                                                    target="_blank" 
                                                    rel="noreferrer"
                                                    className="inline-block border border-gray-300 text-gray-700 px-6 py-3 text-xs font-bold tracking-widest uppercase hover:bg-gray-800 hover:text-white transition-all rounded"
                                                >
                                                    Visit Location
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactUs;