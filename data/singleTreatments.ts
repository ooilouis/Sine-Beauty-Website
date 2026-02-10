
import { SingleTreatmentPageData } from '../types';

export const singleTreatmentPages: Record<string, SingleTreatmentPageData> = {
  'plantomer-soothing': {
    id: 'plantomer-soothing',
    category: 'Active Acne',
    title: 'Plantomer Soothing Treatment',
    recommendedFor: 'Dehydrated Skin with Acne (Dry Skin), Sensitive & Acne Skin',
    summary: 'Experience the ultimate acne solution tailored for dry and sensitive skin. Dive into the rejuvenating benefits of the Plantomer Treatment, designed to target acne at its root while soothing and hydrating your delicate skin.',
    heroImage: 'https://caringskin.com.sg/wp-content/uploads/2023/10/Plantomer_730px-x-487px_.jpg',
    benefits: {
      didYouKnow: 'Failing to address dehydrated skin can result in various skin issues, such as acne breakouts. A compromised skin barrier due to dehydration can stimulate excess sebum production, leading to acne, dryness, irritation, and a dull complexion.',
      about: 'The Plantomer Soothing Treatment is an effective solution to combat acne. It harnesses the power of seaweed and marine extracts from the ocean to detoxify, reduce inflammation, and fight acne-causing bacteria. This treatment not only heals existing acne wounds but also accelerates the skin’s natural recovery process.'
    },
    featuredOn: [
      'https://caringskin.com.sg/wp-content/uploads/2022/03/award-beauty-insider-e1742026028815.png'
    ],
    howItWorks: {
      videoThumbnail: 'https://caringskin.com.sg/wp-content/uploads/2023/10/Plantomer-Thumbnail.png',
      videoLink: 'https://youtu.be/IkhlAzKDqRs',
      steps: [
        { number: '01', title: 'Welcome Massage', description: 'Our signature massage to relax the senses and primes the skin for better absorption of treatment benefits.' },
        { number: '02', title: 'Double Cleansing', description: 'Gently removes daily impurities with a thorough double cleanse.' },
        { number: '03', title: 'Exfoliation', description: 'Employs a charcoal mask to extract skin impurities, diminish inflammation, and clear pores.' },
        { number: '04', title: 'Deep Cleanse', description: 'A gel formula ensures a profound cleanse, eliminating impurities and regulating oil without dehydrating the skin.' },
        { number: '05', title: 'Extraction', description: 'Our signature gentle, painless extraction method to unclog pores.' },
        { number: '06', title: 'Moisture Boost', description: 'Soothes and hydrates, setting the stage for maximum skincare benefits in subsequent steps.' },
        { number: '07', title: 'Propolis Antiseptic', description: 'Reduces redness and swelling caused by acne, with its anti-inflammatory & anti-bacterial benefits.' },
        { number: '08', title: 'Mask', description: 'Addresses skin sensitivity and fosters healing.' },
        { number: '09', title: 'Finishing Care', description: 'Concludes with essential skincare and protective sunscreen.' }
      ]
    },
    ingredients: [
      {
        name: 'Bamboo Charcoal',
        image: 'https://caringskin.com.sg/wp-content/uploads/2023/02/Bamboo-Charcoal_LR-1.png',
        description: ['Helps reduce acne and improve skin texture', 'Cleanses impurities and pollutants in pores', 'Exfoliates dead skin cells']
      },
      {
        name: 'Propolis',
        image: 'https://caringskin.com.sg/wp-content/uploads/2023/02/Propolis_LR.png',
        description: ['Powerful healing properties', 'Promotes skin cell regeneration', 'Promotes acne recovery']
      }
    ],
    faq: {
      title: 'Common Questions',
      description: 'We’ve listed some frequently asked questions to help you find the answers you’re looking for.',
      items: [
        { question: 'What is Plantomer Soothing?', answer: 'Plantomer treatment uses 80% organic plant-based ingredients. It naturally reduces acne inflammation with propolis and is rich in Vitamin A for quick healing and skin support.' },
        { question: 'How much does Plantomer Soothing cost?', answer: '$324.82 w/GST (Trial @ $162.41 w/GST)' },
        { question: 'Is the Plantomer Soothing treatment uncomfortable?', answer: 'There’s no downtime. Some might feel a slight tingling during the procedure.' }
      ]
    }
  },
  'plasma-treatment': {
    id: 'plasma-treatment',
    category: 'Active Acne',
    title: 'Plasma Treatment',
    recommendedFor: 'All skin types, ideal for acne-prone skin',
    summary: 'Experience PLASONIC\'s specialised acne treatment that targets bacteria, reduces redness, and promotes faster healing for healthier skin. This cutting-edge technology aids in absorption and sterilization.',
    heroImage: 'https://caringskin.com.sg/wp-content/uploads/2023/10/Plasma_1200px-x-1360px_.jpg',
    benefits: {
      didYouKnow: 'Acne bacteria can thrive deep within the pores where traditional topical treatments struggle to reach. Plasma energy can penetrate specific depths to target these bacteria directly.',
      about: 'Our Plasma Treatment utilizes advanced PLASONIC technology to generate plasma ions. These ions effectively sterilize the skin, destroying acne-causing bacteria and stimulating skin regeneration. It also enhances the absorption of subsequent skincare products, ensuring deep nourishment and faster recovery from breakouts.'
    },
    howItWorks: {
      videoThumbnail: 'https://caringskin.com.sg/wp-content/uploads/2023/10/Plasma-Thumbnail.jpg',
      videoLink: 'https://youtu.be/example1',
      steps: [
        { number: '01', title: 'Cleansing', description: 'Thorough removal of makeup and impurities.' },
        { number: '02', title: 'Plasma Application', description: 'Application of plasma energy to sterilize skin and open cell absorption channels.' },
        { number: '03', title: 'Ultrasonic Infusion', description: 'Deep delivery of active acne-fighting ingredients using ultrasound.' },
        { number: '04', title: 'Masking', description: 'A soothing mask to calm the skin and seal in moisture.' }
      ]
    },
    ingredients: [
      { name: 'Plasma Ions', image: 'https://caringskin.com.sg/wp-content/uploads/2023/10/Iconacne-severity.svg', description: ['Sterilizes acne bacteria', 'Stimulates collagen'] }
    ],
    faq: {
      title: 'Common Questions',
      items: [
        { question: 'Is Plasma treatment painful?', answer: 'No, it is generally painless. You may feel a slight warmth.' },
        { question: 'How many sessions do I need?', answer: 'We typically recommend a series of 4-6 sessions for optimal acne control.' }
      ]
    }
  },
  'probiotic-treatment': {
    id: 'probiotic-treatment',
    category: 'Active Acne / Sensitive',
    title: 'Probiotic Treatment',
    recommendedFor: 'Hypersensitive, Reactive, Weak Skin Barrier, Oily Skin',
    summary: 'Indulge in our Probiotic Treatment, designed for acne-prone and sensitive skin. This transformative facial not only fights breakouts but also restores your skin\'s natural balance.',
    heroImage: 'https://caringskin.com.sg/wp-content/uploads/2022/03/Probiotics-treatment_1200px-x-1360px_.jpg',
    benefits: {
      didYouKnow: 'Your skin has a microbiome. When the balance of good and bad bacteria is disrupted, it leads to inflammation and acne. Probiotics help restore this delicate balance.',
      about: 'Our Probiotic Treatment introduces beneficial bacteria to your skin environment. This helps to strengthen the skin barrier, reduce inflammation caused by acne, and regulate oil production. It is a gentle yet powerful approach to achieving long-term skin health.'
    },
    howItWorks: {
      videoThumbnail: 'https://caringskin.com.sg/wp-content/uploads/2022/03/Probiotics-Thumbnail.jpg',
      videoLink: 'https://youtu.be/example2',
      steps: [
        { number: '01', title: 'Gentle Cleanse', description: 'Preserves the skin barrier while cleaning.' },
        { number: '02', title: 'Probiotic Infusion', description: 'Application of serum rich in lactobacillus ferments.' },
        { number: '03', title: 'Calming Massage', description: 'Improves circulation and relaxation.' }
      ]
    },
    ingredients: [
      { name: 'Lactobacillus', image: 'https://caringskin.com.sg/wp-content/uploads/2023/10/Iconskin-aggresion.svg', description: ['Restores microbiome balance', 'Reduces redness'] }
    ],
    faq: {
      title: 'Common Questions',
      items: [
         { question: 'Is this suitable for active acne?', answer: 'Yes, it helps reduce the inflammation associated with active acne.' }
      ]
    }
  },
  'sensivital-plus': {
    id: 'sensivital-plus',
    category: 'Active Acne / Sensitive',
    title: 'SensiVital Plus Treatment',
    recommendedFor: 'Hypersensitive, Reactive, Weak Skin Barrier, Oily Skin',
    summary: 'Enter the world of SensiVital Plus, an expertly formulated remedy designed to cater to the needs of sensitive skin that is prone to acne and dehydration.',
    heroImage: 'https://caringskin.com.sg/wp-content/uploads/2023/10/Sensivital-Plus_1200px-x-1360px_.jpg',
    benefits: {
      didYouKnow: 'Sensitive skin often has a thinner barrier, making it susceptible to environmental aggressors. SensiVital helps thicken and fortify this barrier.',
      about: 'SensiVital Plus uses a unique blend of soothing botanical extracts and barrier-repairing ingredients. It provides immediate relief from stinging and redness while working long-term to reduce skin reactivity.'
    },
    howItWorks: {
      videoThumbnail: 'https://caringskin.com.sg/wp-content/uploads/2023/10/SensiVital-Thumbnail.jpg',
      videoLink: 'https://youtu.be/example3',
      steps: [
        { number: '01', title: 'Soothe', description: 'Application of cooling gels.' },
        { number: '02', title: 'Repair', description: 'Infusion of barrier-strengthening serums.' }
      ]
    },
    ingredients: [],
    faq: {
      title: 'Common Questions',
      items: [{ question: 'Can I do this if I have rosacea?', answer: 'Yes, it is excellent for managing rosacea symptoms.' }]
    }
  },
  'proskin-medical-peel': {
    id: 'proskin-medical-peel',
    category: 'Active Acne / Scars',
    title: 'ProSkin Medical Peel',
    recommendedFor: 'Acne, Acne Marks, Acne Scars, Large Pores, Congested Pores',
    summary: 'Discover the clarifying power of ProSkin Medical Peel, expertly formulated to target congestion, breakouts, and excess oil.',
    heroImage: 'https://caringskin.com.sg/wp-content/uploads/2022/03/Matricol-Refiner_1200px-x-1360px_.jpg',
    benefits: {
      didYouKnow: 'Chemical peels are one of the most effective ways to accelerate cell turnover, preventing pores from clogging.',
      about: 'Our ProSkin Medical Peel uses controlled exfoliation to remove dead skin cells and debris. This reveals fresher, clearer skin underneath and helps fade post-acne marks and superficial scars.'
    },
    howItWorks: {
      videoThumbnail: 'https://caringskin.com.sg/wp-content/uploads/2022/03/ProSkin-Thumbnail.jpg',
      videoLink: 'https://youtu.be/example4',
      steps: [
        { number: '01', title: 'Prep', description: 'Protecting sensitive areas.' },
        { number: '02', title: 'Peel Application', description: 'Professional application of the peel solution.' },
        { number: '03', title: 'Neutralization', description: 'Stopping the peel action at the precise moment.' }
      ]
    },
    ingredients: [],
    faq: {
      title: 'Common Questions',
      items: [{ question: 'Will I peel visibly?', answer: 'Depending on the strength used, you may experience mild flaking for a few days.' }]
    }
  },
  'matricol-refiner': {
    id: 'matricol-refiner',
    category: 'Acne Scars',
    title: 'Matricol Refiner',
    recommendedFor: 'Large Pores, Fine Lines, Acne, Chronic Dry Skin, Uneven Pigmentation',
    summary: 'Discover the transformative effects of Matricol Refiner\'s chemical peels, expertly designed to tackle acne scars, skin discolouration, and uneven texture.',
    heroImage: 'https://caringskin.com.sg/wp-content/uploads/2022/03/Matricol-Refiner_1200px-x-1360px_.jpg',
    benefits: {
        didYouKnow: 'Matricol is native collagen that is highly compatible with human skin, aiding significantly in repair.',
        about: 'This treatment combines the benefits of refined chemical peeling with pure native collagen to plump up scars and improve skin texture instantly.'
    },
    howItWorks: {
        videoThumbnail: 'https://caringskin.com.sg/wp-content/uploads/2022/03/Matricol-Thumbnail.jpg',
        videoLink: 'https://youtu.be/example5',
        steps: [
            { number: '01', title: 'Exfoliation', description: 'Removal of surface irregularities.' },
            { number: '02', title: 'Collagen Mask', description: 'Application of Matricol collagen sheet.' }
        ]
    },
    ingredients: [{ name: 'Native Collagen', image: 'https://caringskin.com.sg/wp-content/uploads/2023/10/Icondelayed.svg', description: ['Plumps skin', 'Hydrates deeply'] }],
    faq: {
        title: 'Common Questions',
        items: [{ question: 'Is this good for deep scars?', answer: 'It is best for superficial to medium depth scars.' }]
    }
  },
  'shr-treatment': {
    id: 'shr-treatment',
    category: 'Acne Scars',
    title: 'SHR Treatment',
    recommendedFor: 'Acne Marks, Brown Spots, Sun-Damaged Skin',
    summary: 'Experience the transformative power of SHR technology, designed to target and lighten acne scars, reduce pigmentation, and refine skin texture.',
    heroImage: 'https://caringskin.com.sg/wp-content/uploads/2022/03/SHR_1200px-x-1360px_.jpg',
    benefits: {
        didYouKnow: 'SHR uses low energy at high frequency, making it painless compared to traditional IPL.',
        about: 'Super Hair Removal (SHR) technology isn\'t just for hair. Using specific wavelengths, it gently heats the skin to stimulate collagen and break down pigmentation, effectively lightening acne marks.'
    },
    howItWorks: {
        videoThumbnail: 'https://caringskin.com.sg/wp-content/uploads/2022/03/SHR-Thumbnail.jpg',
        videoLink: 'https://youtu.be/example6',
        steps: [
            { number: '01', title: 'Gel Application', description: 'Cooling gel is applied.' },
            { number: '02', title: 'SHR Gliding', description: 'The applicator glides over the skin delivering pulses of light.' }
        ]
    },
    ingredients: [],
    faq: {
        title: 'Common Questions',
        items: [{ question: 'Is there downtime?', answer: 'No, you can return to daily activities immediately.' }]
    }
  },
  'endymed-fsr': {
    id: 'endymed-fsr',
    category: 'Acne Scars',
    title: 'Endymed FSR',
    recommendedFor: 'Acne Scars, Pitted Scars, Large Pores, Hyperpigmentation, Wrinkles',
    summary: 'Experience the pinnacle of skin regeneration technology with our advanced facial treatment. Dive deep into the layers of your skin with the revolutionary FracPulseTM and 3Deep(R) RF technology.',
    heroImage: 'https://caringskin.com.sg/wp-content/uploads/2022/03/Endy-Med_1200px-x-1360px_-1.jpg',
    benefits: {
        didYouKnow: 'Fractional Skin Resurfacing (FSR) treats micro-fractions of the skin, leaving surrounding tissue intact for faster healing.',
        about: 'Endymed FSR combines fractional ablation with deep radiofrequency heat. This dual action resurfaces the top layer of skin while stimulating collagen deep within, effectively treating pitted acne scars.'
    },
    howItWorks: {
        videoThumbnail: 'https://caringskin.com.sg/wp-content/uploads/2022/03/EndyMed-Thumbnail.jpg',
        videoLink: 'https://youtu.be/example7',
        steps: [
            { number: '01', title: 'Numbing', description: 'Topical cream applied for comfort.' },
            { number: '02', title: 'FSR Treatment', description: 'Applicator delivers RF energy to target areas.' },
            { number: '03', title: 'Cooling', description: 'Skin cooling to soothe heat sensation.' }
        ]
    },
    ingredients: [],
    faq: {
        title: 'Common Questions',
        items: [{ question: 'Does it hurt?', answer: 'You may feel heat, but numbing cream is used to minimize discomfort.' }]
    }
  },
  'nir-cell-light': {
    id: 'nir-cell-light',
    category: 'Ageing / Scars',
    title: 'NIR Cell Light',
    recommendedFor: 'Acne Scars, Large Pores, Hyperpigmentation, Wrinkles, Fine Lines, Sagging Skin, Dull Skin',
    summary: 'The NIR Cell Light Treatment is an advanced skin rejuvenation therapy that uses OPT and NIR to non-invasively improve skin quality.',
    heroImage: 'https://caringskin.com.sg/wp-content/uploads/2024/04/NIR-website-banner-2.jpg',
    benefits: {
        didYouKnow: 'Near Infrared (NIR) light penetrates deep to heat the tissue and contract collagen fibers instantly.',
        about: 'This treatment uses high-power light technology to heat the sub-dermal tissue. This thermal effect causes immediate collagen contraction and stimulates long-term collagen remodeling, resulting in tighter, smoother skin.'
    },
    howItWorks: {
        videoThumbnail: 'https://caringskin.com.sg/wp-content/uploads/2024/04/NIR-Thumbnail.jpg',
        videoLink: 'https://youtu.be/example8',
        steps: [
            { number: '01', title: 'Cleanse', description: 'Skin preparation.' },
            { number: '02', title: 'NIR Application', description: 'Continuous motion of the applicator to build heat.' }
        ]
    },
    ingredients: [],
    faq: {
        title: 'Common Questions',
        items: [{ question: 'Is it safe?', answer: 'Yes, it is a non-invasive and safe procedure for most skin types.' }]
    }
  },
  'rejuran-depglow': {
    id: 'rejuran-depglow',
    category: 'Ageing',
    title: 'REJURAN®️ DEPGlow Treatment',
    recommendedFor: 'Dehydrated Skin, Ageing Skin, Dull Skin, Uneven Skin Tone, Mature Skin and Damaged Skin',
    summary: 'Experience advanced skin rejuvenation with REJURAN®️ DEPGlow Treatment. This needle-free, painless, and downtime-free treatment uses DermoElectroporation (DEP) technology.',
    heroImage: 'https://caringskin.com.sg/wp-content/uploads/2024/06/rejuran_1360px-x-1200px_.jpg',
    benefits: {
        didYouKnow: 'Rejuran Healer contains polynucleotides (PN) derived from salmon DNA, known for its powerful skin repair capabilities.',
        about: 'We combine the healing power of Rejuran with DEP technology, which allows macromolecules to penetrate the skin without needles. This boosts skin elasticity, hydration, and overall health without the pain of injections.'
    },
    howItWorks: {
        videoThumbnail: 'https://caringskin.com.sg/wp-content/uploads/2024/06/Rejuran-Thumbnail.jpg',
        videoLink: 'https://youtu.be/example9',
        steps: [
            { number: '01', title: 'Exfoliation', description: 'Preparing skin for absorption.' },
            { number: '02', title: 'DEP Infusion', description: 'Transdermal delivery of Rejuran complex.' }
        ]
    },
    ingredients: [
        { name: 'Polynucleotides (PN)', image: 'https://caringskin.com.sg/wp-content/uploads/2023/10/Iconlifestyle-habit.svg', description: ['Repairs DNA', 'Improves elasticity'] }
    ],
    faq: {
        title: 'Common Questions',
        items: [{ question: 'Is this the same as Rejuran injection?', answer: 'It uses the same active ingredients but delivers them painlessly via electroporation instead of needles.' }]
    }
  },
  'collagen-veil-plus': {
    id: 'collagen-veil-plus',
    category: 'Dry / Dehydrated',
    title: 'Collagen Veil Plus',
    recommendedFor: 'Dehydrated Skin, Dull Skin, Uneven Skin Texture',
    summary: 'Indulge in Caring Skin\'s Collagen Veil Plus facial for the ultimate hydration boost. This treatment not only boosts collagen production but also highlights hydration.',
    heroImage: 'https://caringskin.com.sg/wp-content/uploads/2022/06/Collagen-Veil_1200px-x-1360px_-1.jpg',
    benefits: {
        didYouKnow: 'Collagen is the main structural protein in the skin. Replenishing it topically can improve hydration levels immediately.',
        about: 'This facial involves the application of a specialized collagen velvet mask. It provides an intensive moisture surge, plumping up fine lines caused by dehydration and leaving the skin silky smooth.'
    },
    howItWorks: {
        videoThumbnail: 'https://caringskin.com.sg/wp-content/uploads/2022/06/Collagen-Thumbnail.jpg',
        videoLink: 'https://youtu.be/example10',
        steps: [
            { number: '01', title: 'Massage', description: 'Stimulating blood flow.' },
            { number: '02', title: 'Collagen Veil', description: 'Application of the collagen sheet mask activated with lotions.' }
        ]
    },
    ingredients: [],
    faq: {
        title: 'Common Questions',
        items: [{ question: 'How often should I do this?', answer: 'It is gentle enough to be done every 2-3 weeks.' }]
    }
  },
  'cs-hydra-mesotherapy': {
    id: 'cs-hydra-mesotherapy',
    category: 'Dry / Dehydrated',
    title: 'CS-Hydra Mesotherapy',
    recommendedFor: 'Normal, Dehydrated and Oxidized skin',
    summary: 'Get ready to enjoy the benefits of three facials in a single session with CS-Hydra Mesotherapy facial. This facial treatment helps in skin rejuvenation.',
    heroImage: 'https://caringskin.com.sg/wp-content/uploads/2023/06/Mesotherapy_1200px-x-1360px_-1.jpg',
    benefits: {
        didYouKnow: 'Mesotherapy allows for the delivery of vitamins and nutrients directly into the mesoderm (middle layer) of the skin.',
        about: 'Using a needle-free mesotherapy device, we infuse a cocktail of hyaluronic acid, vitamins, and antioxidants. This revitalizes dull skin and restores optimal moisture levels instantly.'
    },
    howItWorks: {
        videoThumbnail: 'https://caringskin.com.sg/wp-content/uploads/2023/06/Meso-Thumbnail.jpg',
        videoLink: 'https://youtu.be/example11',
        steps: [
            { number: '01', title: 'Exfoliation', description: 'Removing dead cells.' },
            { number: '02', title: 'Infusion', description: 'Electroporation of active nutrients.' }
        ]
    },
    ingredients: [],
    faq: {
        title: 'Common Questions',
        items: [{ question: 'Is it painful?', answer: 'No, it is a relaxing, non-invasive procedure.' }]
    }
  },
  'hydralock-swiss': {
    id: 'hydralock-swiss',
    category: 'Dry / Dehydrated',
    title: 'HydraLock Swiss Therapy',
    recommendedFor: 'Dry & Dehydrated Skin, Fine Lines, Dull Skin, Enlarged Pores',
    summary: 'With advanced Swiss formulation, HydraLock Swiss Therapy deeply replenishes and locks hydration deep within, fortifies the skin barrier, and refreshes tired skin.',
    heroImage: 'https://caringskin.com.sg/wp-content/uploads/2025/09/HydraLock-Website-Thumbnail.png',
    benefits: {
        didYouKnow: 'Swiss skincare technology is renowned for its purity and precision in hydration.',
        about: 'This premium treatment focuses on "locking" moisture into the skin layers. It uses bio-compatible ingredients that mimic the skin’s natural moisturizing factors to repair the barrier and prevent water loss.'
    },
    howItWorks: {
        videoThumbnail: 'https://caringskin.com.sg/wp-content/uploads/2025/09/HydraLock-Thumbnail.jpg',
        videoLink: 'https://youtu.be/example12',
        steps: [
            { number: '01', title: 'Hydra-Cleanse', description: 'Gentle moisturizing cleanse.' },
            { number: '02', title: 'Locking Mask', description: 'Application of the proprietary Swiss mask.' }
        ]
    },
    ingredients: [],
    faq: {
        title: 'Common Questions',
        items: [{ question: 'Who is this for?', answer: 'Anyone feeling their skin is tight, rough, or lacking bounce.' }]
    }
  },
  'h2-infusion': {
    id: 'h2-infusion',
    category: 'Congested / Large Pores',
    title: 'H2 Infusion Treatment',
    recommendedFor: 'All skin types, including sensitive & acne-prone skin',
    summary: 'Indulge in the ultimate skincare experience with our Caring Skin H2 Infusion facial. Our state-of-the-art technology provides deep pore cleansing, brightening, and rejuvenation.',
    heroImage: 'https://caringskin.com.sg/wp-content/uploads/2023/07/H2-Infusion_1200px-x-1360px_.jpg',
    benefits: {
        didYouKnow: 'Hydrogen water is a powerful antioxidant that can neutralize free radicals in the skin.',
        about: 'The H2 Infusion treatment uses hydrogen-rich water to deeply flush out pores and remove oxidative stress. It is excellent for congested skin, helping to suck out blackheads while infusing hydration.'
    },
    howItWorks: {
        videoThumbnail: 'https://caringskin.com.sg/wp-content/uploads/2023/07/H2-Thumbnail.jpg',
        videoLink: 'https://youtu.be/example13',
        steps: [
            { number: '01', title: 'H2 Cleanse', description: 'Suction and hydrogen water flush.' },
            { number: '02', title: 'Infusion', description: 'Delivery of serums into clean pores.' }
        ]
    },
    ingredients: [{ name: 'Hydrogen Water', image: 'https://caringskin.com.sg/wp-content/uploads/2023/09/img-icon-treatment-3.svg', description: ['Anti-oxidant', 'Deep cleansing'] }],
    faq: {
        title: 'Common Questions',
        items: [{ question: 'Does the suction hurt?', answer: 'No, it is adjustable and generally feels like a light massage.' }]
    }
  },
  'celluglow': {
    id: 'celluglow',
    category: 'Congested / Large Pores',
    title: 'CelluGlow',
    recommendedFor: 'Acne Prone Skin, Vascular Issues, Skin Rejuvenation, Skin Dullness, Large Pores',
    summary: 'CelluGlow represents a cutting-edge treatment solution meticulously designed to address a spectrum of skin concerns with precision and efficacy.',
    heroImage: 'https://caringskin.com.sg/wp-content/uploads/2024/04/NIR-website-banner-2.jpg',
    benefits: {
        didYouKnow: 'Improving micro-circulation can significantly aid in detoxification of the skin.',
        about: 'CelluGlow targets cellular health. By stimulating the skin cells and improving circulation, it helps the skin naturally expel toxins and tighten pores, resulting in a distinct "glow".'
    },
    howItWorks: {
        videoThumbnail: 'https://caringskin.com.sg/wp-content/uploads/2024/04/CelluGlow-Thumbnail.jpg',
        videoLink: 'https://youtu.be/example14',
        steps: [
            { number: '01', title: 'Stimulation', description: 'Cellular massage.' },
            { number: '02', title: 'Glow Mask', description: 'Brightening mask application.' }
        ]
    },
    ingredients: [],
    faq: {
        title: 'Common Questions',
        items: [{ question: 'Is it good for dull skin?', answer: 'Yes, it is specifically designed to bring back radiance.' }]
    }
  },
  'rosa-c3': {
    id: 'rosa-c3',
    category: 'Sensitive',
    title: 'Rosa C3 Treatment',
    recommendedFor: 'Rosacea, Sensitive, Redness, Reactive Skin, Dry Skin',
    summary: 'Indulge in the revolutionary ROSA C3 facial, designed to treat rosacea effectively. This facial aims to eliminate the root causes of redness, offering you relief from frequent flare-ups.',
    heroImage: 'https://caringskin.com.sg/wp-content/uploads/2022/01/Rosa-C_1200px-x-1360px_.jpg',
    benefits: {
        didYouKnow: 'Rosacea often involves weakened capillaries. Strengthening them can reduce persistent redness.',
        about: 'Rosa C3 is a targeted treatment for managing Rosacea (Couperose, Congestion, Calm). It uses active ingredients to constrict dilated capillaries, cool the skin, and fortify the barrier against triggers.'
    },
    howItWorks: {
        videoThumbnail: 'https://caringskin.com.sg/wp-content/uploads/2022/01/Rosa-Thumbnail.jpg',
        videoLink: 'https://youtu.be/example15',
        steps: [
            { number: '01', title: 'Gentle Cleanse', description: 'Non-stripping cleansing.' },
            { number: '02', title: 'Vaso-constricting Serum', description: 'Reduces redness.' },
            { number: '03', title: 'Cryo Massage', description: 'Cooling therapy to soothe skin.' }
        ]
    },
    ingredients: [],
    faq: {
        title: 'Common Questions',
        items: [{ question: 'Can this cure Rosacea?', answer: 'It cannot cure it (as it is chronic), but it effectively manages symptoms and prevents flare-ups.' }]
    }
  },
  'oxyvital': {
    id: 'oxyvital',
    category: 'Sensitive',
    title: 'Oxyvital Treatment',
    recommendedFor: 'Eczema, Sensitive, Post-Laser / Damaged Skin',
    summary: 'Experience the power of Oxyvital\'s advanced formulation, specifically designed to address non-active eczema and a myriad of other skin conditions.',
    heroImage: 'https://caringskin.com.sg/wp-content/uploads/2022/03/Oxyvital_1200px-x-1360px_.jpg',
    benefits: {
        didYouKnow: 'Oxygen is vital for cell repair. Increasing oxygen levels in the skin speeds up healing.',
        about: 'Oxyvital uses medical-grade oxygen diffusion to calm irritated skin and accelerate healing. It is ideal for post-procedure skin or skin recovering from allergic reactions.'
    },
    howItWorks: {
        videoThumbnail: 'https://caringskin.com.sg/wp-content/uploads/2022/03/Oxy-Thumbnail.jpg',
        videoLink: 'https://youtu.be/example16',
        steps: [
            { number: '01', title: 'Oxygen Spray', description: 'Cool mist of oxygen.' },
            { number: '02', title: 'Masking', description: 'Calming algae mask.' }
        ]
    },
    ingredients: [{ name: 'Aloe Vera', image: 'https://caringskin.com.sg/wp-content/uploads/2023/10/Iconskin-aggresion.svg', description: ['Soothes', 'Heals'] }],
    faq: {
        title: 'Common Questions',
        items: [{ question: 'Is it safe for eczema?', answer: 'Yes, it is designed for sensitive and eczematous skin.' }]
    }
  }
};
