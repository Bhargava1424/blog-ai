// blog.ts

export type Image = {
  path: string;
  alt_text: string;
  caption: string;
};

export type Introduction = {
  text: string;
};

export interface BaseBlog {
  structure_type: string;
  title: string;
  main_image: Image;
  summary: string;
  introduction?: Introduction;
  key_words: string[];
  tags: string[];
}

export interface Step {
  step_number: number;
  title: string;
  image?: Image;
  instruction: string;
}

export interface TutorialBlog extends BaseBlog {
  structure_type: 'tutorial';
  steps: Step[];
  conclusion?: string;
}

export interface ComparisonPoint {
  feature: string;
  dslr: string;
  mirrorless: string;
}

export interface ComparisonBlog extends BaseBlog {
  structure_type: 'comparison';
  comparison_points: ComparisonPoint[];
  conclusion?: string;
}

export interface ReviewSection {
  title: string;
  image?: Image;
  content: string;
}

export interface ReviewBlog extends BaseBlog {
  structure_type: 'review';
  sections: ReviewSection[];
  pros: string[];
  cons: string[];
  verdict: string;
}

export interface CaseStudySection {
  title: string;
  image?: Image;
  content: string;
}

export interface CaseStudyBlog extends BaseBlog {
  structure_type: 'case_study';
  sections: CaseStudySection[];
  conclusion?: string;
}

export interface IndustryAnalysisSection {
  title: string;
  image?: Image;
  content: string;
}

export interface IndustryAnalysisBlog extends BaseBlog {
  structure_type: 'industry_analysis';
  sections: IndustryAnalysisSection[];
  conclusion?: string;
}

export interface OpinionBody {
  paragraphs: string[];
}

export interface OpinionBlog extends BaseBlog {
  structure_type: 'opinion';
  body: OpinionBody;
  conclusion?: string;
}

export interface NewsDetail {
  title: string;
  image?: Image;
  description: string;
}

export interface NewsUpdateBlog extends BaseBlog {
  structure_type: 'news_update';
  details: NewsDetail[];
  conclusion?: string;
}

export interface ListItem {
  rank: number;
  title: string;
  image?: Image;
  description: string;
}

export interface ListicleBlog extends BaseBlog {
  structure_type: 'listicle';
  list_items: ListItem[];
  conclusion?: string;
}

export interface QnA {
  question: string;
  answer: string;
}

export interface InterviewBlog extends BaseBlog {
  structure_type: 'interview';
  questions_and_answers: QnA[];
  conclusion?: string;
}

export type Blog =
  | TutorialBlog
  | ComparisonBlog
  | ReviewBlog
  | CaseStudyBlog
  | IndustryAnalysisBlog
  | OpinionBlog
  | NewsUpdateBlog
  | ListicleBlog
  | InterviewBlog;

export const blogs: Blog[] = [
  {
    structure_type: 'tutorial',
    title: 'How to Bake the Perfect Sourdough Bread at Home',
    main_image: {
      path: 'https://amberskitchencooks.com/wp-content/uploads/2022/07/crusty-dutch-oven-sourdough-bread.jpg',
      alt_text: 'Freshly baked sourdough bread on a cooling rack',
      caption: 'Homemade sourdough bread fresh out of the oven.'
    },
    summary: 'A step-by-step guide to baking delicious sourdough bread in your own kitchen.',
    introduction: {
      text: 'Sourdough bread has a rich flavor and a delightful texture. This tutorial will walk you through the process of making your own sourdough starter and baking bread.'
    },
    key_words: ['Sourdough Bread', 'Baking Tutorial', 'Homemade Bread', 'Sourdough Starter'],
    tags: ['Baking', 'Tutorial', 'Cooking', 'Sourdough'],
    steps: [
      {
        step_number: 1,
        title: 'Create Your Sourdough Starter',
        image: {
          path: 'https://images.unsplash.com/photo-1588854337115-2d25b6a6664d',
          alt_text: 'Jar of sourdough starter',
          caption: 'Feeding the sourdough starter daily.'
        },
        instruction: 'Mix equal parts of flour and water in a jar, and feed it daily for a week.'
      },
      {
        step_number: 2,
        title: 'Prepare the Dough',
        image: {
          path: 'https://images.unsplash.com/photo-1519046905439-6e33c849c58b',
          alt_text: 'Mixing dough in a bowl',
          caption: 'Combining ingredients to make the dough.'
        },
        instruction: 'Combine your starter with flour, water, and salt to form the dough.'
      }
      // Additional steps...
    ],
    conclusion: 'Enjoy your homemade sourdough bread fresh or store it for later. Happy baking!'
  },
  {
    structure_type: 'comparison',
    title: 'DSLR vs. Mirrorless Cameras: Which One Should You Choose?',
    main_image: {
      path: 'https://t4.ftcdn.net/jpg/07/44/26/31/360_F_744263175_FWcxLHnd8eUrOtIaxojuRbqbqbJKjnju.jpg',
      alt_text: 'DSLR and mirrorless cameras side by side',
      caption: 'A side-by-side look at DSLR and mirrorless cameras.'
    },
    summary: 'An in-depth comparison of DSLR and mirrorless cameras to help photographers make an informed decision.',
    introduction: {
      text: 'Choosing between a DSLR and a mirrorless camera can be challenging. This article breaks down the key differences.'
    },
    key_words: ['DSLR', 'Mirrorless Camera', 'Photography Equipment', 'Camera Comparison'],
    tags: ['Photography', 'Comparison', 'Cameras', 'Equipment'],
    comparison_points: [
      {
        feature: 'Image Quality',
        dslr: 'Excellent image quality with a wide range of lenses.',
        mirrorless: 'Comparable image quality with advanced sensor technology.'
      },
      {
        feature: 'Size and Weight',
        dslr: 'Generally bulkier due to the mirror mechanism.',
        mirrorless: 'More compact and lightweight, easier to carry around.'
      }
      // Additional comparison points...
    ],
    conclusion: 'Your choice depends on your specific needs, whether it\'s portability or a broader lens selection.'
  },
  {
    structure_type: 'review',
    title: 'Samsung Galaxy Z Fold3 5G: A Foldable Future',
    main_image: {
      path: 'https://images.macrumors.com/t/S-X1rSmCN9PFWDRnkl00WExibCo=/1600x0/article-new/2021/08/galaxy-z-fold-3.jpg',
      alt_text: 'Samsung Galaxy Z Fold3 unfolded',
      caption: 'Exploring the features of the Galaxy Z Fold3.'
    },
    summary: 'A comprehensive review of Samsung\'s latest foldable smartphone, the Galaxy Z Fold3 5G.',
    introduction: {
      text: 'The Galaxy Z Fold3 pushes the boundaries of smartphone innovation. Let\'s see how it performs in real-world use.'
    },
    key_words: ['Samsung', 'Galaxy Z Fold3', 'Foldable Smartphone', 'Tech Review'],
    tags: ['Technology', 'Review', 'Smartphones', 'Samsung'],
    sections: [
      {
        title: 'Design and Display',
        image: {
          path: 'https://images.macrumors.com/t/S-X1rSmCN9PFWDRnkl00WExibCo=/1600x0/article-new/2021/08/galaxy-z-fold-3.jpg',
          alt_text: 'Close-up of the Galaxy Z Fold3\'s hinge',
          caption: 'The engineering behind the foldable display.'
        },
        content: 'The Fold3 features a robust hinge mechanism and a vibrant AMOLED display.'
      },
      {
        title: 'Performance',
        image: {
          path: 'https://images.macrumors.com/t/S-X1rSmCN9PFWDRnkl00WExibCo=/1600x0/article-new/2021/08/galaxy-z-fold-3.jpg',
          alt_text: 'Galaxy Z Fold3 running multiple apps',
          caption: 'Multitasking capabilities of the Fold3.'
        },
        content: 'Equipped with the latest processor, the Fold3 handles multitasking with ease.'
      }
      // Additional sections...
    ],
    pros: ['Innovative design', 'Powerful performance', 'S Pen support'],
    cons: ['High price', 'Durability concerns'],
    verdict: 'The Galaxy Z Fold3 is a glimpse into the future of smartphones, ideal for tech enthusiasts.'
  },
  {
    structure_type: 'case_study',
    title: 'Streaming Success: How Netflix Transformed Entertainment',
    main_image: {
      path: 'https://wallpapercat.com/w/full/2/5/1/45994-3000x2003-desktop-hd-netflix-wallpaper-photo.jpg',
      alt_text: 'Netflix app on a smart TV',
      caption: 'Netflix\'s impact on how we consume media.'
    },
    summary: 'An analysis of Netflix\'s rise and its disruptive impact on traditional media and entertainment industries.',
    introduction: {
      text: 'From DVD rentals to streaming giant, Netflix has revolutionized entertainment consumption.'
    },
    key_words: ['Netflix', 'Streaming', 'Entertainment Industry', 'Case Study'],
    tags: ['Business', 'Case Study', 'Entertainment', 'Innovation'],
    sections: [
      {
        title: 'The Shift to Streaming',
        image: {
          path: 'https://wallpapercat.com/w/full/2/5/1/45994-3000x2003-desktop-hd-netflix-wallpaper-photo.jpg',
          alt_text: 'Person watching Netflix on a laptop',
          caption: 'Streaming content anytime, anywhere.'
        },
        content: 'Netflix capitalized on high-speed internet to deliver on-demand content.'
      },
      {
        title: 'Original Content Strategy',
        image: {
          path: 'https://wallpapercat.com/w/full/2/5/1/45994-3000x2003-desktop-hd-netflix-wallpaper-photo.jpg',
          alt_text: 'Film crew shooting a scene',
          caption: 'Investing in original productions.'
        },
        content: 'Producing original content has set Netflix apart from competitors.'
      }
      // Additional sections...
    ],
    conclusion: 'Netflix\'s innovative approach has reshaped the industry, setting new standards for content delivery.'
  },
  {
    structure_type: 'industry_analysis',
    title: 'E-commerce Boom: How the Pandemic Accelerated Online Retail',
    main_image: {
      path: 'https://img.freepik.com/premium-photo/online-shopping-hd-8k-wallpaper-stock-photographic-image_890746-30374.jpg',
      alt_text: 'Online shopping cart on a laptop screen',
      caption: 'The surge in online shopping activities.'
    },
    summary: 'An analysis of the e-commerce industry\'s growth during the pandemic and future implications.',
    introduction: {
      text: 'The COVID-19 pandemic has drastically shifted consumer behavior towards online shopping.'
    },
    key_words: ['E-commerce', 'Online Retail', 'Pandemic Impact', 'Industry Trends'],
    tags: ['Business', 'Industry Analysis', 'E-commerce', 'Retail'],
    sections: [
      {
        title: 'Growth Statistics',
        image: {
          path: 'https://img.freepik.com/premium-photo/online-shopping-hd-8k-wallpaper-stock-photographic-image_890746-30374.jpg',
          alt_text: 'Graph showing e-commerce growth',
          caption: 'E-commerce sales skyrocketing.'
        },
        content: 'E-commerce experienced unprecedented growth rates globally.'
      },
      {
        title: 'Changing Consumer Behavior',
        image: {
          path: 'https://img.freepik.com/premium-photo/online-shopping-hd-8k-wallpaper-stock-photographic-image_890746-30374.jpg',
          alt_text: 'Person shopping online with a smartphone',
          caption: 'Consumers adapting to online shopping.'
        },
        content: 'Convenience and safety concerns have driven more consumers online.'
      }
      // Additional sections...
    ],
    conclusion: 'The e-commerce surge is likely to have lasting effects on the retail landscape.'
  },
  {
    structure_type: 'opinion',
    title: 'Why Mental Health Awareness Should Be a Global Priority',
    main_image: {
      path: 'https://img.freepik.com/premium-photo/visual-representation-mental-health_980928-49065.jpg',
      alt_text: 'Person meditating outdoors',
      caption: 'Promoting mental well-being in daily life.'
    },
    summary: 'An opinion piece on the critical need for increased mental health awareness and support systems.',
    introduction: {
      text: 'Mental health is as important as physical health, yet it often doesn\'t receive the attention it deserves.'
    },
    key_words: ['Mental Health', 'Wellness', 'Awareness', 'Opinion'],
    tags: ['Health', 'Opinion', 'Mental Wellness', 'Awareness'],
    body: {
      paragraphs: [
        'Stigmatization prevents many from seeking help.',
        'Education can lead to early detection and intervention.',
        'Workplaces should prioritize mental health support.'
      ]
    },
    conclusion: 'Collective efforts are needed to make mental health a global priority, ensuring support is accessible to all.'
  },
  {
    structure_type: 'news_update',
    title: 'SpaceX Achieves Milestone with Starship Test Flight',
    main_image: {
      path: 'https://wallpapercat.com/w/full/2/e/d/75866-3840x2160-desktop-4k-spacex-wallpaper.jpg',
      alt_text: 'SpaceX Starship launching',
      caption: 'The Starship embarking on its test flight.'
    },
    summary: 'SpaceX has successfully conducted a high-altitude test flight of its Starship prototype, marking a significant step toward Mars exploration.',
    introduction: {
      text: 'Elon Musk\'s SpaceX continues to push the boundaries of space travel with its latest Starship test.'
    },
    key_words: ['SpaceX', 'Starship', 'Space Exploration', 'Mars Mission'],
    tags: ['Space', 'News', 'Technology', 'SpaceX'],
    details: [
      {
        title: 'Test Flight Objectives',
        image: {
          path: 'https://wallpapers.com/images/hd/spacex-rocket-ships-p55w14b10fsf83s3.jpg',
          alt_text: 'Engineers monitoring the test flight',
          caption: 'SpaceX team overseeing the launch.'
        },
        description: 'The flight aimed to test the vehicle\'s aerodynamics and landing capabilities.'
      },
      {
        title: 'Implications for Future Missions',
        image: {
          path: 'https://helios-i.mashable.com/imagery/articles/07fpP8w9Tci5gs4un3eb5ZF/hero-image.fill.size_1248x702.v1611612739.jpg',
          alt_text: 'Mars landscape',
          caption: 'Starship brings us closer to Mars exploration.'
        },
        description: 'Successful tests pave the way for crewed missions to the Moon and Mars.'
      }
      // Additional details...
    ],
    conclusion: 'This milestone brings SpaceX one step closer to achieving interplanetary travel.'
  },
  {
    structure_type: 'listicle',
    title: 'Top 10 Books Every Aspiring Entrepreneur Should Read',
    main_image: {
      path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFqWkAEQvbqOLchtZaxrs1n7mOVVYaxZYbJw&s',
      alt_text: 'Stack of business books',
      caption: 'Essential reading for entrepreneurs.'
    },
    summary: 'A curated list of books that provide valuable insights and lessons for entrepreneurs.',
    introduction: {
      text: 'Knowledge is power. These books offer wisdom and strategies to help you succeed in your entrepreneurial journey.'
    },
    key_words: ['Entrepreneurship', 'Business Books', 'Reading List', 'Startup Advice'],
    tags: ['Business', 'Listicle', 'Books', 'Entrepreneurship'],
    list_items: [
      {
        rank: 1,
        title: 'The Lean Startup by Eric Ries',
        image: {
          path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFqWkAEQvbqOLchtZaxrs1n7mOVVYaxZYbJw&s',
          alt_text: 'Cover of The Lean Startup book',
          caption: 'Embrace lean methodologies.'
        },
        description: 'Learn how to build a sustainable business through continuous innovation.'
      },
      {
        rank: 2,
        title: 'Zero to One by Peter Thiel',
        image: {
          path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFqWkAEQvbqOLchtZaxrs1n7mOVVYaxZYbJw&s',
          alt_text: 'Person reading Zero to One',
          caption: 'Creating new value in the world.'
        },
        description: 'Insights on how to create unique businesses that shape the future.'
      }
      // Additional list items...
    ],
    conclusion: 'Reading these books can equip you with the knowledge to navigate the challenges of entrepreneurship.'
  },
  {
    structure_type: 'tutorial',
    title: 'Beginner\'s Guide to Basic Photography Techniques',
    main_image: {
      path: 'https://cdn.prod.website-files.com/5eb17e57534ba845bbfee70e/5f9fdfb6d0342bc8d40f4c03_photographyonlinecourses_b249dee68fee7a3917466fbd74962a3b_1000.jpeg',
      alt_text: 'Camera lens focusing',
      caption: 'Understanding the fundamentals of photography.'
    },
    summary: 'Learn essential photography techniques to improve your skills and capture stunning images.',
    introduction: {
      text: 'Photography is a blend of art and science. This guide introduces you to the foundational techniques every beginner should know.'
    },
    key_words: ['Photography', 'Beginner\'s Guide', 'Photography Techniques', 'Tutorial'],
    tags: ['Photography', 'Tutorial', 'Learning', 'Skills'],
    steps: [
      {
        step_number: 1,
        title: 'Understanding Exposure',
        image: {
          path: 'https://cdn.prod.website-files.com/5eb17e57534ba845bbfee70e/5f9fdfb6d0342bc8d40f4c03_photographyonlinecourses_b249dee68fee7a3917466fbd74962a3b_1000.jpeg',
          alt_text: 'Exposure triangle diagram',
          caption: 'Balancing aperture, shutter speed, and ISO.'
        },
        instruction: 'Learn how aperture, shutter speed, and ISO affect your images.'
      },
      {
        step_number: 2,
        title: 'Composing Your Shots',
        image: {
          path: 'https://cdn.prod.website-files.com/5eb17e57534ba845bbfee70e/5f9fdfb6d0342bc8d40f4c03_photographyonlinecourses_b249dee68fee7a3917466fbd74962a3b_1000.jpeg',
          alt_text: 'Rule of thirds grid over a landscape photo',
          caption: 'Using the rule of thirds for better composition.'
        },
        instruction: 'Apply composition rules like the rule of thirds to enhance visual appeal.'
      }
      // Additional steps...
    ],
    conclusion: 'Practice regularly to hone your photography skills and develop your unique style.'
  },
  {
    structure_type: 'interview',
    title: 'Protecting Our Planet: An Interview with Maya Green',
    main_image: {
      path: 'https://i.pinimg.com/originals/96/1d/27/961d27ec840890c86fc3cde4824c95cb.jpg',
      alt_text: 'Portrait of Maya Green',
      caption: 'Maya Green shares her passion for the environment.'
    },
    summary: 'We speak with Maya Green about her environmental initiatives and how individuals can make a difference.',
    introduction: {
      text: 'Maya Green is a leading voice in environmental activism. She discusses her journey and offers advice on sustainability.'
    },
    key_words: ['Interview', 'Eco-Activist', 'Environment', 'Sustainability'],
    tags: ['Environment', 'Interview', 'Activism', 'Sustainability'],
    questions_and_answers: [
      {
        question: 'What inspired you to become an eco-activist?',
        answer: 'Witnessing the impact of pollution on local communities drove me to take action.'
      },
      {
        question: 'How can individuals contribute to environmental conservation?',
        answer: 'Small changes like reducing waste and supporting sustainable brands make a big difference.'
      }
      // Additional Q&As...
    ],
    conclusion: 'Maya\'s dedication reminds us that everyone has a role to play in protecting our planet.'
  }
];
