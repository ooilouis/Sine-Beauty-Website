
import { ProductDetailData } from '../types';

const defaultDetails = {
    images: [],
    categories: ["Skincare"],
    recommendedFor: "All Skin Types",
    shortDescription: "A high-quality skincare product designed to improve your skin health.",
    benefits: {
        whatItIs: "A premium skincare formulation.",
        whatItDoes: ["Hydrates", "Nourishes", "Revitalizes"]
    },
    ingredients: {
        highlighted: [],
        fullList: "Aqua, Glycerin, Butylene Glycol, etc."
    },
    safeForSkin: "Paraben free, Alcohol free",
    promises: [
        { text: "Quality Guaranteed" }
    ],
    directions: {
        howToUse: "Apply to clean skin.",
        specialNote: "Patch test before use.",
        routine: "Use daily."
    },
    faq: [
        { question: "How often should I use this?", answer: "Daily usage is recommended." }
    ],
    reviewsList: []
};

export const products: ProductDetailData[] = [
    {
        id: "sensitive-skin-cleansing-milk",
        name: "Sensitive Skin Cleansing Milk",
        image: "https://caringskin.com.sg/wp-content/uploads/2022/01/Sensitive-Skin-Cleansing-Milk_1-x-1_-min-scaled.jpg",
        images: [
            "https://caringskin.com.sg/wp-content/uploads/2022/01/Sensitive-Skin-Cleansing-Milk_1-x-1_-min-scaled.jpg",
            "https://caringskin.com.sg/wp-content/uploads/2022/01/Sensitive-Skin-Cleansing-Milk.jpg"
        ],
        isBestSeller: true,
        reviews: 14,
        rating: 4,
        priceText: "This Product is Not Available in Your Country",
        categories: ["Congested / Large Pores", "Sensitive"],
        recommendedFor: "Cystic Acne",
        shortDescription: "A gentle cleanser that is suitable for sensitive skin or skin that gets easily irritated. The milky texture will gently yet thoroughly remove fine impurities and debris inside pores while soothing and purifying your skin. 150ml",
        benefits: {
            whatItIs: "Sensitive Skin Cleansing Milk is a gentle and nutrient cleanser that is suitable for sensitive skin. It balances skins tolerance threshold & reduces its sensitivity lastingly. Formulated with natural plants extract and free from paraben, this cleanser will leave your skin calm & comfortable.",
            whatItDoes: ["Vitalizes", "Moisturizes", "Nourishes skin", "Soothes & calms"]
        },
        featuredOn: [
            "Winner of Best Professional Skincare 2021",
            "Best Facial Cleanser at the Beauty Insider 2021 Beauty & Wellness Awards"
        ],
        ingredients: {
            highlighted: [
                {
                    name: "Solanum Lycopersicum (White Tomato) Extract",
                    image: "https://caringskin.com.sg/wp-content/uploads/2023/03/white-tomato.png",
                    description: ["Antioxidant", "Brightens dull skin"]
                },
                {
                    name: "Olive Oil",
                    image: "https://caringskin.com.sg/wp-content/uploads/2023/03/Olive-oil.png",
                    description: ["Antioxidant", "Moisturizes the skin"]
                },
                {
                    name: "Allantoin",
                    image: "https://caringskin.com.sg/wp-content/uploads/2023/02/Allantoin-comfrey-Plant_LR.png",
                    description: ["Soothes and protects skin’s natural barrier", "Stimulates tissue repair and growth", "Protects skin from moisture loss"]
                },
                {
                    name: "Aloe Vera",
                    image: "https://caringskin.com.sg/wp-content/uploads/2023/02/Aloe-Vera_LR.png",
                    description: ["Anti-inflammatory", "Soothes and hydrates", "Forms a protective barrier to retain moisture"]
                }
            ],
            fullList: "Aqua, Glycerine, Propanediol, Olive Oil PEG-7 Esters, Aloe Barbadensis Leaf Oil, Glyceryl Monostearate, Glyceryl Stearate, PEG-100 Stearate, Cetearyl Alcohol, PEG-20 Stearate, Solanum Lycopersicum (White Tomato) Extract，Aloe Barbadensis Leaf Extract, Phenoxyethanol, Triethylene Glycol, Camphor, Allantoin, EDTA, Xanthan Gum, Citrus Aurantium Bergamot Fruit Oil."
        },
        safeForSkin: "SLS free, Paraben free, Alcohol free, Clinically proven actives",
        promises: [
            { text: "Best cleanser for sensitive skin" },
            { text: "100% cleanses without drying or irritating" }
        ],
        directions: {
            howToUse: "Apply the cleansing milk to the skin while massaging it gently over the face and neck. Rinse well and gently pat dry. Use day and night as your first-step skincare routine.",
            specialNote: "PATCH TEST: Apply on one part of the skin (neck), wash off. Stop using if any reaction occurs.",
            routine: "DAY: Sensitive Skin Cleansing Milk, Toner, Moisturizer, Sunscreen\nNIGHT: (Double cleanse) Micellar Water, Sensitive Skin Cleansing Milk, Toner, Moisturizer"
        },
        faq: [
            { question: "How should I use/apply this product?", answer: "Apply the cleansing milk to the skin while massaging it gently over the face and neck. Rinse well and gently pat dry. Use day and night as your first-step skincare routine." },
            { question: "Why do I need Sensitive Skin Cleansing Milk in my routine?", answer: "If you have sensitive skin, harsh cleansers will only make it worse. A gentle and soothing milky cleanser will nourish and clean your skin while protecting it from sensitivity." },
            { question: "What does the Sensitive Skin Cleansing Milk do?", answer: "A nutrient cleanser that remove fine impurities and debris inside pores while soothing and purifying your skin." },
            { question: "How often should I use the Sensitive Skin Cleansing Milk?", answer: "Use day and night as your first-step skincare routine." }
        ],
        reviewsList: [
            { name: "wendy h.", initial: "WH", date: "06 Sep 2019", rating: 5, text: "very gentle on the skin and works very well especially for my sensitive skin. I like that it makes my face very hydrated, soft and smooth." },
            { name: "audrey choo", initial: "AC", date: "06 Sep 2019", rating: 5, text: "the sensitive skin cleansing milk keeps my skin soft and supple" },
            { name: "eugena b.", initial: "EB", date: "06 Sep 2019", rating: 5, text: "The sensitive cleanser is gentle on my skin and but effective at removing all impurities off my face!" },
            { name: "gillian s.", initial: "GS", date: "06 Sep 2019", rating: 5, text: "The Caring Skin Sensitive Milk cleanser does the best job in gently cleansing my skin while keeping my skin supple and well-moisturised. I can't do without it now!" }
        ]
    },
    // Other products using default spread plus overrides
    {
        ...defaultDetails,
        id: "acne-control-emulsion",
        name: "AcneControl Emulsion",
        image: "https://caringskin.com.sg/wp-content/uploads/2022/03/AcneControl-Emulsion_1-x-1_-min-scaled.jpg",
        isBestSeller: true,
        reviews: 2,
        rating: 4,
        priceText: "This Product is Not Available in Your Country",
        images: ["https://caringskin.com.sg/wp-content/uploads/2022/03/AcneControl-Emulsion_1-x-1_-min-scaled.jpg"]
    },
    {
        ...defaultDetails,
        id: "hydra-power-serum",
        name: "HydraPower Serum",
        image: "https://caringskin.com.sg/wp-content/uploads/2023/10/Hydrapower-serum_1-x-1_-min-scaled.jpg",
        isBestSeller: true,
        reviews: 0,
        rating: 0,
        priceText: "This Product is Not Available in Your Country",
        images: ["https://caringskin.com.sg/wp-content/uploads/2023/10/Hydrapower-serum_1-x-1_-min-scaled.jpg"]
    },
    {
        ...defaultDetails,
        id: "soothing-hydra-mask",
        name: "Soothing Hydra Mask",
        image: "https://caringskin.com.sg/wp-content/uploads/2023/11/soothing-hydra-mask-w-award-logo-16.jpg",
        isBestSeller: true,
        reviews: 63,
        rating: 4,
        priceText: "This Product is Not Available in Your Country",
        images: ["https://caringskin.com.sg/wp-content/uploads/2023/11/soothing-hydra-mask-w-award-logo-16.jpg"]
    },
    {
        ...defaultDetails,
        id: "acne-relief-clarifying-toner",
        name: "AcneRelief Clarifying Toner",
        image: "https://caringskin.com.sg/wp-content/uploads/2023/10/AcneRelief-Clarifying-Toner_1-x-1_-min-scaled.jpg",
        isBestSeller: true,
        reviews: 1,
        rating: 4,
        priceText: "This Product is Not Available in Your Country",
        images: ["https://caringskin.com.sg/wp-content/uploads/2023/10/AcneRelief-Clarifying-Toner_1-x-1_-min-scaled.jpg"]
    },
    {
        ...defaultDetails,
        id: "advanced-cell-repair-mask",
        name: "Advanced Cell-Repair Bio-Cellulose Mask with PDRN",
        image: "https://caringskin.com.sg/wp-content/uploads/2023/11/Advanced-Cell-Repair-Sheet-Mask.jpg",
        isBestSeller: true,
        reviews: 5,
        rating: 4,
        priceText: "This Product is Not Available in Your Country",
        images: ["https://caringskin.com.sg/wp-content/uploads/2023/11/Advanced-Cell-Repair-Sheet-Mask.jpg"]
    },
    {
        ...defaultDetails,
        id: "pre-probiotics-cleansing-foam",
        name: "Pre&Probiotics Cleansing Foam",
        image: "https://caringskin.com.sg/wp-content/uploads/2023/02/PreProbiotics-Cleansing-Foam_2048px-x-2560px_pdf-min-scaled.jpg",
        isBestSeller: false,
        reviews: 0,
        rating: 0,
        priceText: "This Product is Not Available in Your Country",
        images: ["https://caringskin.com.sg/wp-content/uploads/2023/02/PreProbiotics-Cleansing-Foam_2048px-x-2560px_pdf-min-scaled.jpg"]
    },
    {
        ...defaultDetails,
        id: "hydra-calm-moisturizer",
        name: "HydraCalm Moisturizer",
        image: "https://caringskin.com.sg/wp-content/uploads/2023/10/Hydra-Calm-Moisturizer__2048-x-2560px_-min-scaled.jpg",
        isBestSeller: false,
        reviews: 0,
        rating: 0,
        priceText: "This Product is Not Available in Your Country",
        images: ["https://caringskin.com.sg/wp-content/uploads/2023/10/Hydra-Calm-Moisturizer__2048-x-2560px_-min-scaled.jpg"]
    },
    {
        ...defaultDetails,
        id: "pre-probiotics-balancing-toner",
        name: "Pre&Probiotics Balancing Toner",
        image: "https://caringskin.com.sg/wp-content/uploads/2023/10/PreProbiotics-Balancing-Toner_2048-x-2560px_-min-scaled.jpg",
        isBestSeller: false,
        reviews: 0,
        rating: 0,
        priceText: "This Product is Not Available in Your Country",
        images: ["https://caringskin.com.sg/wp-content/uploads/2023/10/PreProbiotics-Balancing-Toner_2048-x-2560px_-min-scaled.jpg"]
    },
    {
        ...defaultDetails,
        id: "hydra-quench-triple-ha-serum",
        name: "HydraQuench Triple H.A Serum",
        image: "https://caringskin.com.sg/wp-content/uploads/2023/10/Triple-Ha-Serum_1-x-1_-min-scaled.jpg",
        isBestSeller: false,
        reviews: 0,
        rating: 0,
        priceText: "This Product is Not Available in Your Country",
        images: ["https://caringskin.com.sg/wp-content/uploads/2023/10/Triple-Ha-Serum_1-x-1_-min-scaled.jpg"]
    },
    {
        ...defaultDetails,
        id: "gentle-exfoliator",
        name: "Gentle Exfoliator",
        image: "https://caringskin.com.sg/wp-content/uploads/2023/11/08-Gentle-Exfoliator-daily-vanity-award-scaled-1.jpg",
        isBestSeller: false,
        reviews: 0,
        rating: 0,
        priceText: "This Product is Not Available in Your Country",
        images: ["https://caringskin.com.sg/wp-content/uploads/2023/11/08-Gentle-Exfoliator-daily-vanity-award-scaled-1.jpg"]
    },
    {
        ...defaultDetails,
        id: "uv-tone-up-sunscreen",
        name: "UV Tone Up Sunscreen SPF 50+",
        image: "https://caringskin.com.sg/wp-content/uploads/2023/10/UV-Tone-SPF50_1-x-1_-min-scaled.jpg",
        isBestSeller: false,
        reviews: 0,
        rating: 0,
        priceText: "This Product is Not Available in Your Country",
        images: ["https://caringskin.com.sg/wp-content/uploads/2023/10/UV-Tone-SPF50_1-x-1_-min-scaled.jpg"]
    },
    {
        ...defaultDetails,
        id: "barrier-shield-recovery-cream",
        name: "BarrierShield Recovery Cream",
        image: "https://caringskin.com.sg/wp-content/uploads/2024/02/BarrierShield-Recovery-Cream_1-x-1_-min-scaled.jpg",
        isBestSeller: false,
        reviews: 0,
        rating: 0,
        priceText: "This Product is Not Available in Your Country",
        images: ["https://caringskin.com.sg/wp-content/uploads/2024/02/BarrierShield-Recovery-Cream_1-x-1_-min-scaled.jpg"]
    },
    {
        ...defaultDetails,
        id: "hydraglow-nourishing-cream",
        name: "HydraGlow Nourishing Cream",
        image: "https://caringskin.com.sg/wp-content/uploads/2024/07/hydraglow_Thumbnail_-2.jpg",
        isBestSeller: false,
        reviews: 0,
        rating: 0,
        priceText: "This Product is Not Available in Your Country",
        images: ["https://caringskin.com.sg/wp-content/uploads/2024/07/hydraglow_Thumbnail_-2.jpg"]
    },
    {
        ...defaultDetails,
        id: "age-defy-retinol-night-cream",
        name: "Age-Defy Retinol Night Cream",
        image: "https://caringskin.com.sg/wp-content/uploads/2024/04/Time_Age-Defy-Retinol-Night-Cream_-Product-Thumbnail_website-min-e1715071470123.jpg",
        isBestSeller: false,
        reviews: 0,
        rating: 0,
        priceText: "This Product is Not Available in Your Country",
        images: ["https://caringskin.com.sg/wp-content/uploads/2024/04/Time_Age-Defy-Retinol-Night-Cream_-Product-Thumbnail_website-min-e1715071470123.jpg"]
    }
];
