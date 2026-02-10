
import { TreatmentPageData } from '../types';

export const treatmentPages: Record<string, TreatmentPageData> = {
  'active-acne': {
    id: 'active-acne',
    masthead: {
      title: 'PROFESSIONAL ACNE TREATMENT SINGAPORE',
      subtitle: 'Struggling with Acne? Regain Your Confidence.',
      description: 'At Caring Skin, we understand the frustration and self-consciousness of dealing with acne. Our professional acne treatments are designed to help you achieve clear, healthy, and confident skin.',
      image: 'https://caringskin.com.sg/wp-content/uploads/2023/10/skin-active-acne.jpg'
    },
    causes: {
      subtitle: 'CAUSES OF ACNE',
      title: 'Understanding Acne Development',
      description: "Acne is a common skin condition that can be influenced by various factors, especially living in Singapore's hot and humid climate. Understanding the causes of acne can help you take steps to manage and prevent it effectively.",
      items: [
        {
          title: 'Hormonal Changes',
          description: "Fluctuations in hormones, e.g. during puberty, menstruation, or hormonal imbalances, trigger the overproduction of sebum - the skin's natural oil. Coupled with dead skin cells and clogged pores, this creates an ideal environment for acne-causing bacteria to thrive.",
          icon: 'https://caringskin.com.sg/wp-content/uploads/2023/09/img-icon-treatment-1.svg'
        },
        {
          title: 'Stress & Diet',
          description: 'The pressures of modern life can lead to increased stress levels, affecting hormonal activity and triggering inflammatory responses in the body. Stress-induced hormonal imbalances contribute to acne development.',
          icon: 'https://caringskin.com.sg/wp-content/uploads/2023/09/img-icon-treatment-2.svg'
        },
        {
          title: 'Climate & Lifestyle',
          description: 'Environmental factors like humidity and pollution can contribute to pore-clogging and acne formation. Certain lifestyle habits like excessive sun exposure without proper protection or inadequate skincare routine can exacerbate acne-related issues.',
          icon: 'https://caringskin.com.sg/wp-content/uploads/2023/09/img-icon-treatment-3.svg'
        },
        {
          title: 'Medication & Other Factors',
          description: 'Steroids, contraceptives, and some anti-epileptic medications are among those that can influence acne development. Underlying health conditions like polycystic ovary syndrome (PCOS) or hormonal disorders may also contribute to persistent acne concerns.',
          icon: 'https://caringskin.com.sg/wp-content/uploads/2023/09/img-icon-treatment-4.svg'
        }
      ]
    },
    types: {
      subtitle: 'TYPES OF ACNE',
      title: 'Identify Your Acne Type',
      description: 'Understanding the type of acne you have is vital for choosing the most effective treatment.',
      items: [
        {
          title: 'Non-Inflammatory',
          description: 'Excess oil and dead skin cells clog hair follicles, leading to blackheads and whiteheads.',
          image: 'https://caringskin.com.sg/wp-content/uploads/2023/10/img-iyat-1.jpg',
          tags: ['Blackheads', 'Whiteheads']
        },
        {
          title: 'Inflammatory',
          description: 'Inflammatory acne is a severe form of acne that can cause scarring and requires treatment by an esthetician.',
          image: 'https://caringskin.com.sg/wp-content/uploads/2023/10/img-iyat-2.jpg',
          tags: ['Papules', 'Postules', 'Nodular & Cystic Acne']
        }
      ]
    },
    treatments: {
      subtitle: 'RECOMMENDED TREATMENTS',
      title: 'Find The Right Treatment For Acne',
      description: 'Whether your acne is mild or severe, our team of experienced estheticians are dedicated to helping you achieve clear, healthy skin and improved self-esteem. We offer personalised acne treatment options in Singapore that are tailored to your unique skin needs and goals.',
      items: [
        {
          title: 'ProSkin Medical Peel',
          tag: 'CLARIFY™',
          description: 'Discover the clarifying power of ProSkin Medical Peel, expertly formulated to target congestion, breakouts, and excess oil. This advanced peel gently yet effectively exfoliates the skin.',
          forSkinType: 'Acne, Acne Marks, Acne Scars, Large Pores, Congested Pores',
          benefits: 'Oil and Acne Control, Acne Scar Lightening, Skin Smoothing, Pores Minimizing',
          price: '$324.82 w/GST (Trial @ $162.41 w/GST)',
          duration: '45min',
          image: 'https://caringskin.com.sg/wp-content/uploads/2022/03/Matricol-Refiner_1200px-x-1360px_.jpg',
          link: 'treatment/proskin-medical-peel'
        },
        {
          title: 'Plasma Treatment',
          tag: 'ANTI MICROBIAL™',
          description: 'Experience PLASONIC\'s specialised acne treatment that targets bacteria, reduces redness, and promotes faster healing for healthier skin.',
          forSkinType: 'All skin types, ideal for acne-prone skin',
          benefits: 'Acne Annihilation, Anti-Bacterial Powerhouse, Skin Regeneration, Sebum Control, Enhanced Absorption',
          price: '$272.50 w/GST (Trial @ $136.25 w/GST)',
          duration: '90min',
          image: 'https://caringskin.com.sg/wp-content/uploads/2023/10/Plasma_1200px-x-1360px_.jpg',
          link: 'treatment/plasma-treatment'
        },
        {
          title: 'Plantomer Soothing Treatment',
          tag: 'ACNE PREVENTION™',
          description: 'Experience the ultimate acne solution tailored for dry and sensitive skin. Dive into the rejuvenating benefits of the Plantomer Treatment.',
          forSkinType: 'Dehydrated Skin with Acne (Dry Skin), Sensitive & Acne Skin',
          benefits: 'Acne Control, Soothing & Calming, Deep Hydration, Skin Regeneration, Natural Balance',
          price: '$324.82 w/GST (Trial @ $162.41 w/GST)',
          duration: '90min',
          image: 'https://caringskin.com.sg/wp-content/uploads/2023/10/Platomer_1200px-x-1360px_.jpg',
          link: 'treatment/plantomer-soothing'
        },
        {
          title: 'Probiotic Treatment for Acne',
          description: 'Indulge in our Probiotic Treatment, designed for acne-prone and sensitive skin. This transformative facial not only fights breakouts but also restores your skin\'s natural balance.',
          forSkinType: 'Hypersensitive, Reactive, Weak Skin Barrier, Oily Skin',
          benefits: 'Acne Alleviation, Soothes Sensitive Skin, Restores Skin Balance, Strengthens Skin Barrier',
          price: '$324.82 w/GST (Trial @ $162.41 w/GST)',
          duration: '90min',
          image: 'https://caringskin.com.sg/wp-content/uploads/2022/03/Probiotics-treatment_1200px-x-1360px_.jpg',
          link: 'treatment/probiotic-treatment'
        }
      ]
    },
    faq: {
      title: 'Help & Support',
      items: [
        { question: "What is the main cause of acne?", answer: "Acne can be caused by several factors, including hormonal changes, stress, diet, genetics, and skin inflammation. Severity can range from mild acne, to stubborn acne that requires advanced acne treatment." },
        { question: "How can I prevent acne breakouts?", answer: "Maintaining good hygiene, avoiding excessive sun exposure, reducing stress levels, and maintaining a healthy diet can help prevent acne breakouts. You can also explore our acne treatment options listed above." },
        { question: "Can acne scars be permanent?", answer: "Acne scars can be permanent, but there are treatments available that can reduce the appearance of scars, such as laser therapy and microdermabrasion." },
        { question: "Do you use any topical medications or oral medications?", answer: "At Caring Skin, our acne treatment comes without any oral medications and topic medications needed. Our natural and effective treatments are safe and do not have any medical or other side-effects." },
        { question: "Do you provide laser treatments?", answer: "No, we do not use laser treatments at Caring Skin. Our treatments focus on non-invasive, natural methods to effectively treat acne and promote healthy skin." }
      ]
    },
    testimonials: {
      videos: [
        { title: "Nazmi | Caring Skin Success Story | Acne-Free in 11 Months", thumbnail: "https://caringskin.com.sg/wp-content/uploads/2023/12/Nazmi_269px-x-165px_.jpg", videoLink: "https://www.youtube.com/ZiHpF9AKkFE" },
        { title: "Xener | Caring Skin Success Story | Acne-Free in 7 Weeks", thumbnail: "https://caringskin.com.sg/wp-content/uploads/2023/12/Xener_269px-x-165px_.jpg", videoLink: "https://www.youtube.com/watch?v=76D9qaRKH3c" },
        { title: "Adi | Caring Skin Success Story | I Have Conquered Acne", thumbnail: "https://caringskin.com.sg/wp-content/uploads/2023/12/Adi_269px-x-165px_-1.jpg", videoLink: "https://www.youtube.com/watch?v=uGcq-vPdId0" }
      ]
    }
  },
  'acne-scars': {
    id: 'acne-scars',
    masthead: {
      title: 'SOLUTION FOR ACNE SCARS REMOVAL',
      subtitle: 'Struggling To Get Rid of Stubborn Acne Scars?',
      description: 'Acne scars can leave lasting reminders of past breakouts, affecting self-confidence and skin\'s appearance. We help you regain confidence and reveal smoother, scar-free skin.',
      image: 'https://caringskin.com.sg/wp-content/uploads/2023/10/skin-acne-scars.jpg'
    },
    causes: {
      subtitle: 'Causes of Acne Scars',
      title: 'Understanding Acne Scarring',
      description: 'In order to comprehend the development of acne scarring, it is crucial to take into account several factors.',
      items: [
        { title: 'Inflammation & Breakouts', description: 'Acne scars can result from untreated or severe acne breakouts, with deeper inflammation leading to more lasting scars.', icon: 'https://caringskin.com.sg/wp-content/uploads/2023/10/Iconinflammation.svg' },
        { title: 'Skin Aggression', description: 'Picking or popping acne blemishes can worsen skin and increase scarring risk. It\'s important to resist the urge to minimise scarring.', icon: 'https://caringskin.com.sg/wp-content/uploads/2023/10/Iconskin-aggresion.svg' },
        { title: 'Acne Severity', description: 'The severity of acne plays a crucial role in scar formation. Severe or cystic acne is more likely to result in significant scarring compared to milder forms of acne.', icon: 'https://caringskin.com.sg/wp-content/uploads/2023/10/Iconacne-severity.svg' },
        { title: 'Delayed Treatment', description: 'Delaying or neglecting acne treatment can cause the condition to worsen, leading to a higher likelihood of scarring. Early intervention is key to minimising scarring risk.', icon: 'https://caringskin.com.sg/wp-content/uploads/2023/10/Icondelayed.svg' }
      ]
    },
    types: {
      subtitle: 'TYPES OF ACNE SCAR',
      title: 'Identify Your Acne Scar Type',
      description: 'Understanding the type of acne scars you have is essential for choosing an effective treatment, ensuring optimal results and a smoother complexion.',
      items: [
        { title: 'Ice Pick Scars', description: 'Small and deep pits resembling needle marks. Often narrow and extend deep into the skin.', image: 'https://caringskin.com.sg/wp-content/uploads/2023/10/acne-icepick-scars.jpg' },
        { title: 'Boxed Scars', description: 'Broad, rectangular depressions with defined edges that resemble chickenpox scars varying in size and depth.', image: 'https://caringskin.com.sg/wp-content/uploads/2023/10/acne-boxed-scars.jpg' },
        { title: 'Rolling Scars', description: 'Rolling Scars occur due to damage beneath the skin’s surface, causing a rolling or “wave-like” texture.', image: 'https://caringskin.com.sg/wp-content/uploads/2023/10/acne-rolling-scars.jpg' },
        { title: 'Hypertrophic & Keloid Scars', description: 'Raised thickened scars due to excessive collagen production during the healing process.', image: 'https://caringskin.com.sg/wp-content/uploads/2023/10/acne-keloid.jpg' }
      ]
    },
    treatments: {
      subtitle: 'RECOMMENDED TREATMENTS',
      title: 'Find The Right Treatment For Acne Scars',
      description: 'Are you looking to get rid of acne scars and achieve clear, radiant skin? Our skilled estheticians will assess your skin and scars and create a customised treatment plan.',
      items: [
        {
          title: 'ProSkin Medical Peel',
          tag: 'CLARIFY™',
          description: 'Discover the clarifying power of ProSkin Medical Peel, expertly formulated to target congestion, breakouts, and excess oil.',
          forSkinType: 'Acne, Acne Marks, Acne Scars, Large Pores, Congested Pores',
          benefits: 'Oil and Acne Control, Acne Scar Lightening, Skin Smoothing, Pores Minimizing',
          price: '$324.82 w/GST (Trial @ $162.41 w/GST)',
          duration: '45min',
          image: 'https://caringskin.com.sg/wp-content/uploads/2022/03/Matricol-Refiner_1200px-x-1360px_.jpg',
          link: 'treatment/proskin-medical-peel'
        },
        {
          title: 'Matricol Refiner',
          tag: 'REFINE™',
          description: 'Discover the transformative effects of Matricol Refiner\'s chemical peels, expertly designed to tackle acne scars, skin discolouration, and uneven texture.',
          forSkinType: 'Large Pores, Fine Lines, Acne, Chronic Dry Skin, Uneven Pigmentation',
          benefits: 'Acne Scar Lightening, Pigmentation Lightening, Skin Smoothing, Collagen Boost',
          price: '$368.42 w/GST (Trial @ $184.21 w/GST)',
          duration: '90min',
          image: 'https://caringskin.com.sg/wp-content/uploads/2022/03/Matricol-Refiner_1200px-x-1360px_.jpg',
          link: 'treatment/matricol-refiner'
        },
         {
          title: 'SHR Treatment',
          tag: 'LIGHTEN™',
          description: 'Experience the transformative power of SHR technology, designed to target and lighten acne scars, reduce pigmentation, and refine skin texture.',
          forSkinType: 'Acne Marks, Brown Spots, Sun-Damaged Skin',
          benefits: 'Acne Scar Lightening, Pigmentation Reduction, Improved Skin Texture, Collagen Boost',
          price: '$272.50 w/GST (Trial @ $136.25 w/GST)',
          duration: '60min',
          image: 'https://caringskin.com.sg/wp-content/uploads/2022/03/SHR_1200px-x-1360px_.jpg',
          link: 'treatment/shr-treatment'
        },
        {
          title: 'Endymed FSR',
          tag: 'COLLAGEN REMODEL™',
          description: 'Experience the pinnacle of skin regeneration technology with our advanced facial treatment. Dive deep into the layers of your skin.',
          forSkinType: 'Acne Scars, Pitted Scars, Large Pores, Hyperpigmentation, Wrinkles',
          benefits: 'Pigmented Scar Reduction, Pitted Acne Scar Improvement, Deep Dermis Treatment',
          price: 'from $381.50 w/GST (Trial from @ $190.75 w/GST)',
          duration: '60min',
          image: 'https://caringskin.com.sg/wp-content/uploads/2022/03/Endy-Med_1200px-x-1360px_-1.jpg',
          link: 'treatment/endymed-fsr'
        }
      ]
    },
    faq: {
        title: "Help & Support",
        items: [
            { question: "What are the common types of acne scars?", answer: "The most common are ice pick scars, rolling scars, boxcar scars, hypertrophic scars, and post-inflammatory hyperpigmentation (PIH)." },
            { question: "Can I prevent acne scars?", answer: "Prevention starts with proper acne management. Avoid picking or squeezing blemishes, and treat acne early." },
            { question: "Are acne scar removal treatments painful?", answer: "Most treatments are well-tolerated. You may experience mild discomfort, but our esthetician will ensure your comfort throughout the process." }
        ]
    },
    testimonials: {
        videos: [
            { title: "Jooyee | Caring Skin Success Story", thumbnail: "https://caringskin.com.sg/wp-content/uploads/2024/03/Jooyee_COVER_-min-scaled.jpg", videoLink: "https://youtu.be/3_1lMO_bDNw" },
            { title: "Shafiqah | Caring Skin Success Story", thumbnail: "https://caringskin.com.sg/wp-content/uploads/2023/12/shafiqah__269px-x-165px_.jpg", videoLink: "https://www.youtube.com/EBdu1R5UVdU" },
            { title: "Ashley | Caring Skin Success Story", thumbnail: "https://caringskin.com.sg/wp-content/uploads/2023/12/Ashley_269px-x-165px_.jpg", videoLink: "https://www.youtube.com/pC6QkaKtDOA" }
        ]
    }
  },
  'ageing-skin': {
    id: 'ageing-skin',
    masthead: {
      title: 'PROFESSIONAL AGEING SKIN TREATMENT SINGAPORE',
      subtitle: 'Struggling With Ageing Skin? Rediscover Youthful Radiance.',
      description: 'At Caring Skin, we understand that the signs of ageing can impact not only how your skin looks but also how you feel. Our anti-ageing treatments are crafted to help rejuvenate, restore, and preserve your skin’s youthful glow.',
      image: 'https://caringskin.com.sg/wp-content/uploads/2024/09/cs-medispa_website_anti-aging_953-x-1063-px_.jpg'
    },
    causes: {
      subtitle: 'Causes of Ageing Skin',
      title: 'Understanding Skin Ageing',
      description: 'Ageing is a natural process, but various factors, both intrinsic and environmental, can accelerate the signs of ageing. Living in Singapore can further intensify the visible effects.',
      items: [
        { title: 'Natural Ageing Process', description: 'As we age, collagen and elastin production decreases, leading to sagging skin, fine lines, and wrinkles.', icon: 'https://caringskin.com.sg/wp-content/uploads/2023/09/img-icon-treatment-2.svg' },
        { title: 'Sun Exposure & UV Damage', description: 'Overexposure to the sun accelerates collagen breakdown, leading to premature wrinkles, pigmentation, and uneven skin tone.', icon: 'https://caringskin.com.sg/wp-content/uploads/2023/10/Iconsun-damage.svg' },
        { title: 'Lifestyle & External Factors', description: 'A hectic lifestyle, poor diet, smoking, and pollution can greatly affect skin health.', icon: 'https://caringskin.com.sg/wp-content/uploads/2023/10/Iconlifestyle-habit.svg' },
        { title: 'Hormonal Changes', description: 'Hormonal changes can lead to decreased oestrogen levels, resulting in thinner, drier, and less elastic skin.', icon: 'https://caringskin.com.sg/wp-content/uploads/2023/09/img-icon-treatment-1.svg' }
      ]
    },
    types: {
      subtitle: 'TYPES OF AGEING SKIN',
      title: 'Recognise the Signs to Choose the Right Treatment',
      description: 'Every skin type ages uniquely, but there are common signs of aging that many experience.',
      items: [
        { title: 'Fine Lines & Wrinkles', description: 'As collagen production declines, fine lines appear, gradually deepening into wrinkles.', image: 'https://caringskin.com.sg/wp-content/uploads/2024/09/Skin-Types_Wrinkles-and-fine-line.png' },
        { title: 'Sagging Skin', description: 'Loss of elasticity causes the skin to sag, particularly around the jawline and neck.', image: 'https://caringskin.com.sg/wp-content/uploads/2024/09/Skin-Types_Saggin-Skin.png' },
        { title: 'Pigmentation & Dark Spots', description: 'Prolonged UV exposure can result in hyperpigmentation, leading to dark spots and uneven skin tone.', image: 'https://caringskin.com.sg/wp-content/uploads/2024/09/Skin-Types_Pigmentation.png' },
        { title: 'Dull & Dry Skin', description: 'As natural moisture levels diminish with age, the skin can become dull, flaky, or dry.', image: 'https://caringskin.com.sg/wp-content/uploads/2024/09/Skin-Types_Dull-and-dry-skin.png' }
      ]
    },
    treatments: {
      subtitle: 'RECOMMENDED TREATMENTS',
      title: 'Find The Right Treatment For Ageing Skin',
      description: 'Our expert team offers personalised treatments designed to target these signs of ageing. Whether you’re looking to reduce fine lines, boost collagen, or improve skin texture, our tailored solutions ensure your skin is cared for.',
      items: [
         {
          title: 'REJURAN®️ DEPGlow Treatment',
          tag: 'REJUVENATE™',
          description: 'Experience advanced skin rejuvenation with REJURAN®️ DEPGlow Treatment. This needle-free, painless, and downtime-free treatment uses DermoElectroporation (DEP) technology.',
          forSkinType: 'Dehydrated Skin, Ageing Skin, Dull Skin, Uneven Skin Tone',
          benefits: 'Deep Skin Hydration, Wrinkle Reduction, Skin Firming, Brightening Effect',
          price: '$414.20 w/GST',
          duration: '90mins',
          image: 'https://caringskin.com.sg/wp-content/uploads/2024/06/rejuran_1360px-x-1200px_.jpg',
          link: 'treatment/rejuran-depglow'
        },
        {
          title: 'NIR Cell Light',
          tag: 'COLLAGEN REMODEL™',
          description: 'The NIR Cell Light Treatment is an advanced skin rejuvenation therapy that uses OPT and NIR to non-invasively improve skin quality.',
          forSkinType: 'Acne Scars, Large Pores, Hyperpigmentation, Wrinkles, Fine Lines',
          benefits: 'Skin Regeneration, Collagen Boost, Skin Tightening, Skin Lifting',
          price: 'from $324.82 w/GST (Trial from @ $139.52 w/GST)',
          duration: '60min',
          image: 'https://caringskin.com.sg/wp-content/uploads/2024/04/NIR-website-banner-2.jpg',
          link: 'treatment/nir-cell-light'
        }
      ]
    },
    faq: {
        title: 'Help & Support',
        items: [
            { question: "What causes aging skin?", answer: "Aging skin is primarily caused by a combination of intrinsic factors (like genetics) and extrinsic factors (such as UV exposure)." },
            { question: "Can professional treatments help with aging skin?", answer: "Yes, professional treatments can help reduce signs of aging by promoting skin renewal and improving texture and tone." },
            { question: "Is it too late to start an anti-aging routine?", answer: "It’s never too late to start an anti-aging skincare routine. Even individuals in their 50s and beyond can benefit." }
        ]
    }
  },
  'dry-skin': {
      id: 'dry-skin',
      masthead: {
          title: 'SOLUTION FOR DRY / DEHYDRATED SKIN',
          subtitle: 'Struggling with Dry or Dehydrated Skin?',
          description: 'Dry and dehydrated skin can affect anyone, regardless of their skin type, causing irritation, itchiness, and a dull appearance.',
          image: 'https://caringskin.com.sg/wp-content/uploads/2023/10/treatment-dull-dehydrated-skin-banner.jpg'
      },
      causes: {
          subtitle: 'Causes of Dryness & Dehydration',
          title: 'Understanding Dry vs. Dehydrated Skin',
          description: "To grasp why your skin is dry or dehydrated, it's essential to consider various factors.",
          items: [
              { title: 'Environmental Influences', description: 'Extreme weather conditions, pollution, or drastic climate changes can sap your skin\'s moisture.', icon: 'https://caringskin.com.sg/wp-content/uploads/2023/09/img-icon-treatment-3.svg' },
              { title: 'Lifestyle Habits', description: 'Habits like staying in air-conditioned environments, not drinking enough water, or indulging in hot showers can contribute to skin dehydration.', icon: 'https://caringskin.com.sg/wp-content/uploads/2023/10/Iconlifestyle-habit.svg' },
              { title: 'Medical Treatments', description: 'Certain medical treatments or medications may affect your skin\'s hydration levels.', icon: 'https://caringskin.com.sg/wp-content/uploads/2023/09/img-icon-treatment-4.svg' },
              { title: 'Harsh Skincare Products', description: 'Products that are too harsh or drying can strip your skin of its natural oils, leading to dryness.', icon: 'https://caringskin.com.sg/wp-content/uploads/2023/10/Iconharsh.svg' }
          ]
      },
      types: {
          subtitle: 'SPOT THE DIFFERENCE',
          title: 'Is Your Skin Dry Or Dehydrated?',
          description: 'It\'s crucial to distinguish between dehydrated and dry skin to determine if your skin needs hydration or moisturisation.',
          items: [
              { title: 'Dry Skin', description: 'Results from a lack of natural oils, leading to rough, scaly patches that can feel tight.', image: 'https://caringskin.com.sg/wp-content/uploads/2023/10/skin-dry.jpg', tags: ['Redness', 'White Flakes', 'Scaly Patches'] },
              { title: 'Dehydrated Skin', description: 'Stems from insufficient water within the skin, leading to a lack of skin radiance and premature ageing signs.', image: 'https://caringskin.com.sg/wp-content/uploads/2023/10/skin-dehydrated.jpg', tags: ['Skin Dullness', 'Itchiness', 'Fine Lines'] }
          ]
      },
      treatments: {
          subtitle: 'RECOMMENDED TREATMENTS',
          title: 'Find The Right Treatment',
          description: 'Whether your skin needs hydration or moisturisation, our team of experienced estheticians is committed to helping you achieve balanced, supple and radiant skin.',
          items: [
              {
                  title: 'HydraLock Swiss Therapy',
                  tag: 'REPLENISHES™',
                  description: 'With advanced Swiss formulation, HydraLock Swiss Therapy deeply replenishes and locks hydration deep within, fortifies the skin barrier, and refreshes tired skin.',
                  forSkinType: 'Dry & Dehydrated Skin, Fine Lines, Dull Skin',
                  benefits: 'Reactivation of Hydration, Re-Nourishment, Plump and Revive Skin',
                  price: '$324.82 w/GST (Trial from $106.82 w/GST)',
                  duration: '90min',
                  image: 'https://caringskin.com.sg/wp-content/uploads/2025/09/HydraLock-Website-Thumbnail.png',
                  link: 'treatment/hydralock-swiss'
              },
              {
                  title: 'CS-Hydra Mesotherapy',
                  tag: 'SUPPLY™',
                  description: 'Get ready to enjoy the benefits of three facials in a single session. This facial treatment helps in skin rejuvenation.',
                  forSkinType: 'Normal, Dehydrated and Oxidized skin',
                  benefits: 'Intense Hydration, Brightening Effect, Cell Metabolism Activation',
                  price: '$368.42 w/GST (Trial @ $184.21 w/GST)',
                  duration: '90min',
                  image: 'https://caringskin.com.sg/wp-content/uploads/2023/06/Mesotherapy_1200px-x-1360px_-1.jpg',
                  link: 'treatment/cs-hydra-mesotherapy'
              },
              {
                  title: 'Collagen Veil Plus',
                  tag: 'RESILIENT™',
                  description: 'Indulge in Caring Skin\'s Collagen Veil Plus facial for the ultimate hydration boost. This treatment boosts collagen production.',
                  forSkinType: 'Dehydrated Skin, Dull Skin, Uneven Skin Texture',
                  benefits: 'Hydration Boost, Natural Plumping, Soothing & Nourishing',
                  price: '$250 w/GST (Trial from @ $125 w/GST)',
                  duration: '90min',
                  image: 'https://caringskin.com.sg/wp-content/uploads/2022/06/Collagen-Veil_1200px-x-1360px_-1.jpg',
                  link: 'treatment/collagen-veil-plus'
              }
          ]
      },
      faq: {
          title: 'Help & Support',
          items: [
              { question: "What causes dull, dry, and dehydrated skin?", answer: "Dehydration is often due to inadequate water intake and environmental factors. Dryness is mainly a result of insufficient natural oil production." },
              { question: "How can I tell if my skin is dehydrated or dry?", answer: "Dehydrated skin feels tight and looks dull. Dry skin feels rough and flaky. Dehydrated skin lacks water; dry skin lacks oil." },
              { question: "How do I maintain healthy, radiant skin long-term?", answer: "Consistency is key. Stick to a suitable skincare routine, protect your skin from UV rays, and stay hydrated." }
          ]
      },
      testimonials: {
        videos: [
          { title: "Eka | Caring Skin Success Story", thumbnail: "https://caringskin.com.sg/wp-content/uploads/2023/12/Eka_269px-x-165px_.jpg", videoLink: "https://www.youtube.com/sxcP1PEdX_k" },
          { title: "Yan | Caring Skin Success Story", thumbnail: "https://caringskin.com.sg/wp-content/uploads/2023/12/Yan_269px-x-165px_.jpg", videoLink: "https://www.youtube.com/SInwJCh4Jxk" },
          { title: "Lee Ling | Caring Skin Success Story", thumbnail: "https://caringskin.com.sg/wp-content/uploads/2023/12/Leeling_269px-x-165px_.jpg", videoLink: "https://www.youtube.com/watch?v=hQwvLVtxj-U" }
        ]
      }
  },
  'congested-skin': {
    id: 'congested-skin',
    masthead: {
        title: 'SOLUTION FOR LARGE, CLOGGED PORES',
        subtitle: 'Struggling With Large, Congested Pores?',
        description: 'At Caring Skin, we understand how frustrating large pores can be. They make your skin appear rough, uneven, and prone to blemishes. We can help you achieve a clear, radiant complexion.',
        image: 'https://caringskin.com.sg/wp-content/uploads/2023/12/CONGESTED-LARGE-PORES_image_956px-x-1063px_.jpg'
    },
    causes: {
        subtitle: 'Causes of Large Pores',
        title: 'What\'s Behind Those Large Pores?',
        description: 'Large, congested pores are a common concern, but not all pores are the same. Understanding your skin type and specific pore issues is crucial.',
        items: [
            { title: 'Genetics', description: 'Some of us are genetically predisposed to have larger pores. However, that doesn\'t mean you\'re stuck with them.', icon: 'https://caringskin.com.sg/wp-content/uploads/2023/09/img-icon-treatment-1.svg' },
            { title: 'Excess Oil Production', description: 'When your skin produces too much oil, it can clog your pores and make them look larger.', icon: 'https://caringskin.com.sg/wp-content/uploads/2023/10/Iconexcess-oil.svg' },
            { title: 'Dead Skin Cells', description: 'Dead skin cells can build up on your skin\'s surface, making pores appear larger.', icon: 'https://caringskin.com.sg/wp-content/uploads/2023/09/img-icon-treatment-2.svg' },
            { title: 'Sun Damage', description: 'Overexposure to the sun\'s harmful rays can weaken your skin\'s elasticity, making pores more visible.', icon: 'https://caringskin.com.sg/wp-content/uploads/2023/10/Iconsun-damage.svg' }
        ]
    },
    types: {
        subtitle: 'Common Symptoms',
        title: 'Signs of Congested Skin',
        description: 'Understanding the skin symptoms you have is essential for choosing an effective treatment.',
        items: [
            { title: 'Blackheads', description: 'Tiny, dark spots on the skin formed when the blocked follicles are exposed to the air.', image: 'https://caringskin.com.sg/wp-content/uploads/2023/11/blackhead.jpg' },
            { title: 'Whiteheads', description: 'Small, raised white spots that contain the same dead skin and natural oil but are enclosed within a pore.', image: 'https://caringskin.com.sg/wp-content/uploads/2023/10/img-iyat-1.jpg' },
            { title: 'Enlarged Pores', description: 'Indentations on the skin surface appearing like small dots, caused by excessive oil production.', image: 'https://caringskin.com.sg/wp-content/uploads/2023/11/Enlarged-pores.jpg' }
        ]
    },
    treatments: {
        subtitle: 'RECOMMENDED TREATMENTS',
        title: 'Say Hello to Clear, Refined Skin',
        description: 'At Caring Skin, we offer a range of treatments designed to target large, congested pores. Our team of skincare professionals will assess your skin and recommend the best options.',
        items: [
             {
                title: 'CelluGlow',
                tag: 'COLLAGEN REMODEL™',
                description: 'CelluGlow represents a cutting-edge treatment solution meticulously designed to address a spectrum of skin concerns with precision and efficacy.',
                forSkinType: 'Acne Prone Skin, Vascular Issues, Skin Rejuvenation, Large Pores',
                benefits: 'Acne Prevention, Pores Reduction, Skin Brightening, Skin Rejuvenation',
                price: 'from $218.00 w/GST',
                duration: '45mins',
                image: 'https://caringskin.com.sg/wp-content/uploads/2024/04/NIR-website-banner-2.jpg',
                link: 'treatment/celluglow'
            },
            {
                title: 'H2 Infusion Treatment',
                description: 'Indulge in the ultimate skincare experience with our Caring Skin H2 Infusion facial. Our state-of-the-art technology provides deep pore cleansing.',
                forSkinType: 'All skin types, including sensitive & acne-prone skin',
                benefits: 'Deep Pore Cleansing, Brightening, Plumped Up Skin, Anti-Aging',
                price: '$324.82 w/GST (Trial @ $162.41 w/GST)',
                duration: '90min',
                image: 'https://caringskin.com.sg/wp-content/uploads/2023/07/H2-Infusion_1200px-x-1360px_.jpg',
                link: 'treatment/h2-infusion'
            }
        ]
    },
    faq: {
        title: 'Help & Support',
        items: [
            { question: "What causes large, congested pores?", answer: "Large pores often result from excess oil production, leading to clogs and congestion. Genetics, aging, and environmental factors can also contribute." },
            { question: "Can I shrink my pores with skincare products?", answer: "While you can’t permanently change pore size, proper skincare can minimize their appearance. Look for products with salicylic acid or niacinamide." },
            { question: "How can I prevent pore congestion and blackheads?", answer: "Regular cleansing, exfoliation, and using non-comedogenic products are essential. Avoid touching your face." }
        ]
    }
  },
  'sensitive-skin': {
      id: 'sensitive-skin',
      masthead: {
          title: 'TREATMENT FOR SENSITIVE SKIN',
          subtitle: 'Struggling With Recurring Flare-Ups & Skin Discomfort?',
          description: 'Dealing with recurrent flare-ups and discomfort caused by sensitive skin can be frustrating. At Caring Skin, our gentle, effective skincare solutions are tailored to address your specific skin concerns.',
          image: 'https://caringskin.com.sg/wp-content/uploads/2023/10/treatment-sensitive-skin-bnr.jpg'
      },
      causes: {
          subtitle: 'Causes of Sensitive Skin',
          title: 'Understanding Skin Sensitivity',
          description: 'Sensitive skin is a common condition characterised by increased sensitivity to irritants, which may lead to redness, itching, dryness, and discomfort.',
          items: [
              { title: 'Genetics', description: 'Genetics can determine skin sensitivity and how quickly it reacts to irritants. If your family has a history of sensitive skin, you\'re more likely to develop it.', icon: 'https://caringskin.com.sg/wp-content/uploads/2023/09/img-icon-treatment-1.svg' },
              { title: 'Environmental Factors', description: 'Exposure to pollutants, UV radiation, and harsh weather can weaken your skin\'s natural barrier, making it more sensitive.', icon: 'https://caringskin.com.sg/wp-content/uploads/2023/09/img-icon-treatment-3.svg' },
              { title: 'Skincare Products', description: 'Some ingredients in skincare products (e.g. fragrance, essential oil) can irritate sensitive skin, causing redness and itching.', icon: 'https://caringskin.com.sg/wp-content/uploads/2023/10/Iconskincare-product.svg' },
              { title: 'Medical Conditions', description: 'Skin conditions like eczema, rosacea, and psoriasis can weaken the skin\'s barrier, making it easier for irritants to penetrate.', icon: 'https://caringskin.com.sg/wp-content/uploads/2023/09/img-icon-treatment-4.svg' }
          ]
      },
      types: {
          subtitle: 'COMMON SYMPTOMS',
          title: 'Signs of Sensitive Skin',
          description: 'Understanding your skin symptoms is essential for choosing an effective treatment.',
          items: [
              { title: 'Eczema', description: 'Also known as atopic dermatitis, is a chronic skin condition that can cause persistent skin dryness and itchiness.', image: 'https://caringskin.com.sg/wp-content/uploads/2023/11/eczema-2.jpg', tags: ['Dryness', 'Itchiness', 'Blistering'] },
              { title: 'Rosacea', description: 'A chronic inflammatory condition that can result in pustules, flushing, and visible blood vessels.', image: 'https://caringskin.com.sg/wp-content/uploads/2023/11/rosacea.jpg', tags: ['Pustules', 'Flushing'] },
              { title: 'Other Skin Sensitivity', description: 'Sensitive skin may also show signs like rashes when exposed to irritating chemicals or physical agents.', image: 'https://caringskin.com.sg/wp-content/uploads/2023/11/sensitive.jpg' }
          ]
      },
      treatments: {
          subtitle: 'RECOMMENDED SENSITIVE SKIN FACIALS',
          title: 'Find The Right Treatment For Sensitive Skin',
          description: 'Unlock newfound confidence with our sensitive skin facial treatments that aim to address common skin concerns such as rosacea, sensitivity, and eczema.',
          items: [
               {
                  title: 'Rosa C3 Treatment',
                  tag: 'SOOTHE™',
                  description: 'Indulge in the revolutionary ROSA C3 facial, designed to treat rosacea effectively. This facial aims to eliminate the root causes of redness.',
                  forSkinType: 'Rosacea, Sensitive, Redness, Reactive Skin, Dry Skin',
                  benefits: 'Rosacea Control, Microcapillary Management, Immediate Relief, Enhanced Skin Defense',
                  price: '$324.82 w/GST (Trial @ $162.41 w/GST)',
                  duration: '90min',
                  image: 'https://caringskin.com.sg/wp-content/uploads/2022/01/Rosa-C_1200px-x-1360px_.jpg',
                  link: 'treatment/rosa-c3'
              },
              {
                  title: 'Oxyvital Treatment',
                  tag: 'REPAIR™',
                  description: 'Experience the power of Oxyvital\'s advanced formulation, specifically designed to address non-active eczema and a myriad of other skin conditions.',
                  forSkinType: 'Eczema, Sensitive, Post-Laser / Damaged Skin',
                  benefits: 'Eczema Relief, Redness Reduction, Immediate Soothing, Deep Nourishment',
                  price: '$324.82 w/GST (Trial @ $162.41 w/GST)',
                  duration: '75min',
                  image: 'https://caringskin.com.sg/wp-content/uploads/2022/03/Oxyvital_1200px-x-1360px_.jpg',
                  link: 'treatment/oxyvital'
              },
               {
                  title: 'SensiVital Plus Treatment',
                  tag: 'STRENGTHEN™',
                  description: 'Enter the world of SensiVital Plus, an expertly formulated remedy designed to cater to the needs of sensitive skin that is prone to acne and dehydration.',
                  forSkinType: 'Hypersensitive, Reactive, Weak Skin Barrier, Oily Skin',
                  benefits: 'Soothe & Calm, Deep Hydration, Rapid Recovery, Environmental Defense',
                  price: '$272.50 w/GST (Trial @ $136.25 w/GST)',
                  duration: '90min',
                  image: 'https://caringskin.com.sg/wp-content/uploads/2023/10/Sensivital-Plus_1200px-x-1360px_.jpg',
                  link: 'treatment/sensivital-plus'
              },
              {
                  title: 'Probiotic Treatment for Sensitive Skin',
                  description: 'Probiotic Treatment is an effective way to reduce skin sensitivity by nurturing the growth of beneficial bacteria in the skin\'s microbiome.',
                  forSkinType: 'Hypersensitive, Reactive, Weak Skin Barrier',
                  benefits: 'Reduces Redness & Inflammation, Strengthens Skin Barrier, Minimizes Breakouts',
                  price: '$324.82 w/GST (Trial @ $162.41 w/GST)',
                  duration: '90min',
                  image: 'https://caringskin.com.sg/wp-content/uploads/2022/03/Probiotics-treatment_1200px-x-1360px_.jpg',
                  link: 'treatment/probiotic-treatment'
              }
          ]
      },
      faq: {
          title: 'Help & Support',
          items: [
              { question: "What are the common signs of sensitive skin?", answer: "Sensitive skin often manifests as redness, itching, burning, or dryness. It can feel tight or uncomfortable." },
              { question: "Can I use regular skincare products if I have sensitive skin?", answer: "It’s best to opt for products specifically designed for sensitive skin. Look for gentle, hypoallergenic, and fragrance-free options." },
              { question: "Can I undergo professional skincare treatments with sensitive skin?", answer: "Yes, but it’s essential to inform your skincare specialist about your sensitivity. At Caring Skin, we offer treatments designed specifically for sensitive skin." }
          ]
      }
  }
};
