export interface Certificate {
  title: string;
  issuer: string;
  image: string;
  date: string;
  type: 'certificate' | 'seminar';
  category: string;
}

export const certificates: Certificate[] = [
  {
    title: 'Amazon Connect Introduction',
    issuer: 'AWS Training and Certification',
    image: 'amazon-connect.png',
    date: '2025',
    type: 'certificate',
    category: 'Cloud'
  },
  {
    title: 'Amazon Online Arbitrage Internship',
    issuer: 'ProVA',
    image: 'arbitrage.png',
    date: '2023',
    type: 'certificate',
    category: 'E-Commerce'
  },
  {
    title: 'Amazon VA Online Course',
    issuer: 'ProVA',
    image: 'amazon-va.png',
    date: '2023',
    type: 'certificate',
    category: 'E-Commerce'
  },
  {
    title: 'Introduction to Careers in Cybersecurity',
    issuer: 'Trend Micro',
    image: 'cybersec.png',
    date: '2021',
    type: 'certificate',
    category: 'Security'
  },
  {
    title: 'AI, IoT, & Cloud Seminar',
    issuer: 'ICPEP Singapore',
    image: 'ai-iot-cloud.png',
    date: '2019',
    type: 'seminar',
    category: 'AI & Cloud'
  },
  {
    title: 'Cinema Theater Management System Seminar',
    issuer: 'ICPEP Singapore',
    image: 'cinema.png',
    date: '2019',
    type: 'seminar',
    category: 'Software'
  },
  {
    title: 'Digital Entrepreneurship Seminar',
    issuer: 'ICPEP Singapore',
    image: 'entrep.png',
    date: '2019',
    type: 'seminar',
    category: 'Business'
  },
  {
    title: 'Maritime Satellite Communications Seminar',
    issuer: 'ICPEP Singapore',
    image: 'maritime.png',
    date: '2019',
    type: 'seminar',
    category: 'Communications'
  },
  {
    title: 'Microsoft Certification Seminar',
    issuer: 'ICPEP Singapore',
    image: 'microsoft-cert.png',
    date: '2019',
    type: 'seminar',
    category: 'Microsoft'
  },
];
