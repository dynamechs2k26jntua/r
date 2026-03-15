import { Cpu, ExternalLink, Zap, Users, Settings, MapPin, Hammer, Trophy } from 'lucide-react';

export interface EventDetail {
  id: string;
  name: string;
  icon: any;
  category: 'technical' | 'non-technical';
  shortDescription: string;
  fullDescription: string;
  rules: string[];
  coordinators: { name: string; phone: string }[];
  image: string;
  venue?: string;
  prizes?: { winner: string; runner: string };
  fees?: { label: string; amount: string }[];
  registrationLink?: string;
  timeline?: string;
}

export const events: EventDetail[] = [
  // Technical Events
  {
    id: 'techspark',
    name: 'TechSpark 2026',
    icon: Cpu,
    category: 'technical',
    shortDescription: 'Present your innovative ideas and showcase your technical knowledge!',
    fullDescription: 'TechSpark 2026 is the premier paper presentation event of DYNAMECHS. It challenges participants to present their innovative ideas with clarity and technical depth. Showcase your research and impress the judges with your presentation skills.',
    venue: 'Mechanical Seminar Hall, JNTUA CEA',
    prizes: { winner: '₹1700', runner: '₹800' },
    fees: [
      { label: '1 Member', amount: '₹200' },
      { label: '2 Members', amount: '₹300' },
      { label: '3 or 4 Members', amount: '₹400' }
    ],
    timeline: 'Pre-Register by 23rd March 2026. Spot registrations available.',
    registrationLink: '#',
    rules: [
      'Maximum 7 slides allowed (excluding the Thank You slide).',
      'Maximum presentation time: 4 minutes.',
      'Slides should clearly explain the problem, solution, and impact of the idea.',
      'Participants must present their topic with clear explanation and confidence.',
      'Judges will evaluate content quality, presentation skills, and innovation.',
      'Judges\' decision will be final.'
    ],
    coordinators: [
      { name: 'S. Rajesh', phone: '9876543210' },
      { name: 'M. Anitha', phone: '9876543211' }
    ],
    image: '/assets/event-tecnion.jpg'
  },
  {
    id: 'project-expo',
    name: 'PROJECT EXPO',
    icon: ExternalLink,
    category: 'technical',
    shortDescription: 'Display your innovative mechanical models and working prototypes.',
    fullDescription: 'Project Expo is a showcase of creativity and engineering application. Students can display their working models, prototypes, or innovative designs that solve real-world problems.',
    rules: [
      'Team size: 2-4 members.',
      'Working models are preferred.',
      'Poster explaining the project must be displayed.',
      'Evaluation based on innovation, utility, and presentation.'
    ],
    coordinators: [
      { name: 'K. Vinay', phone: '9876543212' }
    ],
    image: '/assets/event-project-expo.jpg',
    venue: 'Mechanical Workshop Area',
    prizes: { winner: '₹2000', runner: '₹1000' },
    fees: [{ label: 'Per Team', amount: '₹300' }],
    timeline: 'Starts at 11:00 AM, 24th March.',
    registrationLink: '#'
  },
  {
    id: 'tecrity',
    name: 'TECRITY',
    icon: Zap,
    category: 'technical',
    shortDescription: 'A high-stakes technical quiz to test your fundamental engineering knowledge.',
    fullDescription: 'TECRITY is a battle of wits. Test your core mechanical engineering knowledge across various domains like Thermodynamics, Design, Manufacturing, and Fluid Mechanics.',
    rules: [
      'Team size: 2 members.',
      'Preliminary round will be a written test.',
      'Top 5 teams will qualify for the final stage rounds.',
      'No electronic gadgets allowed during the quiz.'
    ],
    coordinators: [
      { name: 'P. Suresh', phone: '9876543213' }
    ],
    image: '/assets/event-tecrity.jpg',
    venue: 'Drawing Hall - 1',
    prizes: { winner: '₹1500', runner: '₹750' },
    fees: [{ label: 'Per Team', amount: '₹100' }],
    timeline: 'Prelims at 10:00 AM.',
    registrationLink: '#'
  },
  {
    id: 'tecwiz',
    name: 'TECWIZ',
    icon: Settings,
    category: 'technical',
    shortDescription: 'Problem-solving challenge focused on mechanical design and logic.',
    fullDescription: 'TECWIZ challenges your analytical and design skills. Solve complex mechanical puzzles and design problems within a given timeframe.',
    rules: [
      'Individual participation.',
      'Problems will be based on machine design and logic.',
      'Use of calculators is permitted.',
      'Time limit: 60 minutes.'
    ],
    coordinators: [
      { name: 'L. Bhavana', phone: '9876543214' }
    ],
    image: '/assets/event-tecwiz.jpg',
    venue: 'CAD Lab',
    prizes: { winner: '₹1200', runner: '₹600' },
    fees: [{ label: 'Individual', amount: '₹50' }],
    timeline: 'Starts at 2:00 PM.',
    registrationLink: '#'
  },
  {
    id: 'spot-events',
    name: 'SPOT EVENTS',
    icon: MapPin,
    category: 'technical',
    shortDescription: 'Quick-fire technical challenges and on-the-spot competitions.',
    fullDescription: 'Spot Events are spontaneous technical challenges that test your quick thinking and hands-on skills. From assembly-disassembly to technical sketching.',
    rules: [
      'On-the-spot registration.',
      'Rules will be explained at the venue.',
      'Short duration tasks.',
      'Instant prizes for winners.'
    ],
    coordinators: [
      { name: 'J. Naveen', phone: '9876543215' }
    ],
    image: '/assets/event-spot.jpg',
    venue: 'Department Corridors',
    prizes: { winner: 'Exciting Goodies', runner: 'Certificates' },
    fees: [{ label: 'Spot Entry', amount: 'Free' }],
    timeline: 'Throughout the day.',
    registrationLink: '#'
  },
  {
    id: 'tecwar',
    name: 'TECWAR',
    icon: Hammer,
    category: 'technical',
    shortDescription: 'The ultimate battle of machines. Design, build, and compete.',
    fullDescription: 'TECWAR is the arena for robotic combat. Build your bot and compete in various challenges like robo-race or robo-sumo.',
    rules: [
      'Team size: 3-5 members.',
      'Bot specifications must meet the event guidelines.',
      'Safety equipment is mandatory.',
      'Judge\'s decision is final.'
    ],
    coordinators: [
      { name: 'R. Karthik', phone: '9876543216' }
    ],
    image: '/assets/event-tecwar.jpg',
    venue: 'Open Arena',
    prizes: { winner: '₹5000', runner: '₹2500' },
    fees: [{ label: 'Per Team', amount: '₹500' }],
    timeline: 'Starts at 10:30 AM.',
    registrationLink: '#'
  },
  {
    id: 'workshop',
    name: 'WORKSHOP',
    icon: Zap,
    category: 'technical',
    shortDescription: 'Electric Vehicle Technology: Trends and Opportunities.',
    fullDescription: 'A comprehensive workshop on the future of mobility. Learn about EV architecture, battery management systems, and the evolving landscape of the automotive industry.',
    rules: [
      'Prior registration is mandatory.',
      'Certificates will be provided to all participants.',
      'Interactive session with industry experts.',
      'Bring your own laptop for simulation parts.'
    ],
    coordinators: [
      { name: 'Dr. M. Prasad', phone: '9876543217' }
    ],
    image: '/assets/event-workshop.jpg',
    venue: 'Main Auditorium',
    prizes: { winner: 'N/A', runner: 'N/A' },
    fees: [{ label: 'Registration', amount: '₹150' }],
    timeline: '2:30 PM - 4:30 PM.',
    registrationLink: '#'
  },
  {
    id: 'funstalls',
    name: 'FUNSTALLS',
    icon: Users,
    category: 'technical',
    shortDescription: 'Engaging non-technical activities and interactive stalls.',
    fullDescription: 'Funstalls are the heart of the symposium\'s social atmosphere. From technical games to creative stalls, there\'s something for everyone to enjoy.',
    rules: [
      'Open to all participants.',
      'Nominal entry fee for some stalls.',
      'Follow the instructions at each stall.',
      'Have fun and network!'
    ],
    coordinators: [
      { name: 'G. Lakshmi', phone: '9876543218' }
    ],
    image: '/assets/event-funstalls.jpg',
    venue: 'Mechanical Quadrangle',
    prizes: { winner: 'Varies', runner: 'Varies' },
    fees: [{ label: 'Entry', amount: 'Free' }],
    timeline: 'All day.',
    registrationLink: '#'
  },

  // Non-Technical Events
  {
    id: 'treasure-hunt',
    name: 'TREASURE HUNT',
    icon: MapPin,
    category: 'non-technical',
    shortDescription: 'Follow the clues and find the hidden mechanical treasure.',
    fullDescription: 'The classic Treasure Hunt with a mechanical twist. Solve riddles and navigate the campus to find the ultimate prize.',
    rules: [
      'Team size: 3-4 members.',
      'Clues will be spread across the campus.',
      'No use of vehicles allowed.',
      'First team to reach the treasure wins.'
    ],
    coordinators: [
      { name: 'V. Rahul', phone: '9876543219' }
    ],
    image: '/assets/event-treasure.jpg',
    venue: 'Campus Wide',
    prizes: { winner: '₹1000', runner: '₹500' },
    fees: [{ label: 'Per Team', amount: '₹200' }],
    timeline: 'Starts at 1:30 PM.',
    registrationLink: '#'
  },
  {
    id: 'photography',
    name: 'PHOTOGRAPHY',
    icon: Cpu,
    category: 'non-technical',
    shortDescription: 'Capture the essence of engineering through your lens.',
    fullDescription: 'Showcase your photography skills. Capture the most striking moments of the symposium or the beauty of mechanical structures.',
    rules: [
      'Individual participation.',
      'Photos must be taken within the campus during the event.',
      'No heavy editing allowed.',
      'Submit your best 3 shots.'
    ],
    coordinators: [
      { name: 'S. Sneha', phone: '9876543220' }
    ],
    image: '/assets/event-photography.jpg',
    venue: 'Online Submission',
    prizes: { winner: '₹800', runner: '₹400' },
    fees: [{ label: 'Registration', amount: 'Free' }],
    timeline: 'Submit by 4:00 PM.',
    registrationLink: '#'
  },
  {
    id: 'slow-cycling',
    name: 'SLOW CYCLING',
    icon: Zap,
    category: 'non-technical',
    shortDescription: 'Balance is key. The slowest one wins the race.',
    fullDescription: 'A test of balance and control. The goal is to reach the finish line as slowly as possible without putting your feet down.',
    rules: [
      'Individual participation.',
      'Feet touching the ground leads to disqualification.',
      'Must stay within the designated track.',
      'Bicycle will be provided.'
    ],
    coordinators: [
      { name: 'M. Naveen', phone: '9876543221' }
    ],
    image: '/assets/event-cycling.jpg',
    venue: 'College Grounds',
    prizes: { winner: '₹500', runner: '₹250' },
    fees: [{ label: 'Entry', amount: '₹20' }],
    timeline: 'Starts at 3:00 PM.',
    registrationLink: '#'
  },
  {
    id: 'meme-making',
    name: 'MEME MAKING',
    icon: Users,
    category: 'non-technical',
    shortDescription: 'Show off your engineering humor with the best memes.',
    fullDescription: 'Create the most relatable and hilarious memes about engineering life, mechanical concepts, or the symposium itself.',
    rules: [
      'Individual participation.',
      'Content must be original and non-offensive.',
      'Topic will be provided on the spot.',
      'Submission in digital format.'
    ],
    coordinators: [
      { name: 'K. Arjun', phone: '9876543222' }
    ],
    image: '/assets/event-meme.jpg',
    venue: 'Online Submission',
    prizes: { winner: '₹500', runner: '₹250' },
    fees: [{ label: 'Registration', amount: 'Free' }],
    timeline: 'Submit by 3:00 PM.',
    registrationLink: '#'
  },
  {
    id: 'gaming',
    name: 'PUBG/BGMI',
    icon: Settings,
    category: 'non-technical',
    shortDescription: 'Battle it out in the virtual arena with your squad.',
    fullDescription: 'The ultimate mobile gaming showdown. Compete against other squads in a high-intensity battle royale tournament.',
    rules: [
      'Squad size: 4 members.',
      'Bring your own devices and internet connection.',
      'No use of hacks or emulators.',
      'Matches will be played in TPP mode.'
    ],
    coordinators: [
      { name: 'D. Sai', phone: '9876543223' }
    ],
    image: '/assets/event-gaming.jpg',
    venue: 'E-Classroom',
    prizes: { winner: '₹1500', runner: '₹800' },
    fees: [{ label: 'Per Squad', amount: '₹200' }],
    timeline: 'Starts at 11:00 AM.',
    registrationLink: '#'
  },
  {
    id: 'sudoku',
    name: 'SUDOKU',
    icon: ExternalLink,
    category: 'non-technical',
    shortDescription: 'A test of logic and numbers for the sharpest minds.',
    fullDescription: 'Challenge your brain with complex Sudoku puzzles. Speed and accuracy are the keys to victory.',
    rules: [
      'Individual participation.',
      'Puzzles will range from medium to hard difficulty.',
      'Time limit: 30 minutes.',
      'No use of calculators or mobile apps.'
    ],
    coordinators: [
      { name: 'P. Kavya', phone: '9876543224' }
    ],
    image: '/assets/event-sudoku.jpg',
    venue: 'Seminar Hall',
    prizes: { winner: '₹500', runner: '₹250' },
    fees: [{ label: 'Registration', amount: '₹30' }],
    timeline: 'Starts at 12:00 PM.',
    registrationLink: '#'
  },
  {
    id: 'rubiks-cube',
    name: 'RUBIK\'S CUBE',
    icon: Hammer,
    category: 'non-technical',
    shortDescription: 'How fast can you solve the ultimate puzzle?',
    fullDescription: 'A competition for speed cubers. Solve the 3x3 Rubik\'s cube in the shortest possible time.',
    rules: [
      'Individual participation.',
      'Bring your own cube (standard 3x3).',
      'Best of 3 solves will be considered.',
      'Standard WCA rules apply for timing.'
    ],
    coordinators: [
      { name: 'B. Tarun', phone: '9876543225' }
    ],
    image: '/assets/event-rubiks.jpg',
    venue: 'Seminar Hall',
    prizes: { winner: '₹500', runner: '₹250' },
    fees: [{ label: 'Registration', amount: '₹30' }],
    timeline: 'Starts at 12:30 PM.',
    registrationLink: '#'
  },
  {
    id: 'talent-show',
    name: 'TALENT SHOW',
    icon: Trophy,
    category: 'non-technical',
    shortDescription: 'Sing, dance, or perform. Show us your hidden talents.',
    fullDescription: 'The stage is yours! Whether it\'s singing, dancing, stand-up comedy, or any other unique talent, come and dazzle the audience.',
    rules: [
      'Individual or group participation.',
      'Time limit: 5 minutes per performance.',
      'Bring your own tracks or props.',
      'Content must be suitable for a general audience.'
    ],
    coordinators: [
      { name: 'N. Swathi', phone: '9876543226' }
    ],
    image: '/assets/event-talent.jpg',
    venue: 'Open Stage',
    prizes: { winner: '₹1500', runner: '₹800' },
    fees: [{ label: 'Per Performance', amount: '₹100' }],
    timeline: 'Starts at 3:30 PM.',
    registrationLink: '#'
  }
];
