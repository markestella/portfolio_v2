export interface Product {
  id: string;
  name: string;
  tagline: string;
  image: string;
  status: 'available' | 'coming-soon' | 'private-demo';
  audience: string;
  summary: string;
  problem: string[];
  outcomes: string[];
  features: string[];
  commercialModel: string[];
  tech: string[];
  presentationUrl: string | null;
  demoUrl: string | null;
  inquirySubject: string;
}

export const products: Product[] = [
  {
    id: 'fuelsuite',
    name: 'FuelSuite Gas Station POS',
    tagline: 'Offline-first POS and operations platform for gas stations.',
    image: '/product_images/fuelsuite.png',
    status: 'private-demo',
    audience: 'Independent gas station owners, station managers, and operators who need tighter shift, cash, fuel, credit, and reporting control.',
    summary: 'FuelSuite is a desktop point-of-sale and operations system built around gas station workflows: shift opening and closing, pump and tank readings, fuel sales, cash movement, expenses, customer credit, loyalty, inventory movement, reports, backups, and licensed workstation activation.',
    problem: [
      'Pump readings, tank levels, expenses, and credit balances are often scattered across notebooks and spreadsheets.',
      'Cash shortages and fuel variance are hard to trace after a shift closes.',
      'Generic POS tools do not model gas station operations well.',
      'Stations with unstable internet still need reliable daily operations.',
    ],
    outcomes: [
      'Run daily station operations from one focused desktop console.',
      'Give owners clearer visibility into sales, cash, tank levels, AR, and recent activity.',
      'Keep shift reconciliation organized and auditable.',
      'Operate locally after license activation, even when internet is unreliable.',
    ],
    features: [
      'Shift management with opening, active shift tracking, and closing workflows',
      'Pump and tank readings with fuel movement visibility',
      'Sales recording for fuel products, cash, credit, and other income',
      'Cash position, expenses, deposits, withdrawals, and reconciliation support',
      'Customer credit and accounts receivable tracking',
      'Fuel inventory, deliveries, suppliers, lube products, and return stock workflows',
      'Loyalty, employee charges, role-based access, audit trail, and report exports',
      'Local backup and restore plus one-time online license activation',
    ],
    commercialModel: [
      'One-time setup and installation',
      'Per-workstation software license',
      'Optional monthly support, updates, training, and custom report maintenance',
      'Custom development available for station-specific processes',
    ],
    tech: ['Next.js', 'TypeScript', 'Electron', 'SQLite', 'Drizzle ORM', 'React Query', 'Tailwind CSS'],
    presentationUrl: null,
    demoUrl: null,
    inquirySubject: 'FuelSuite Gas Station POS inquiry',
  },
];
