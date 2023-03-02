import React from 'react';
import { Link } from 'react-router-dom';
import { Drop } from './dp';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { Container } from 'components/Container/Container';
import { SubHeading } from 'components/Common/Header/SubHeading';
import { Button } from 'components/Button/Button';
import { ChevronDownIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import { Heading } from 'components/Common/Header/Heading';

ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Transaction History'
    }
  }
};

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const data = {
  labels,
  datasets: [
    {
      label: 'Previous',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: '#891c69'
    },
    {
      label: 'Recent',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)'
    }
  ]
};

ChartJS.register(ArcElement, Tooltip, Legend);
export const data2 = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        '#891c69',
        '#974d7b'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }
  ]
};

const isDashboard = /dashboard/i.test(window.location.pathname);

export const Chart = (prop) => {
  return (
    <Container>
      <div className="-mt-6 flex  items-center justify-between pt-5">
        {isDashboard ? (
          <Heading>Financial statistics</Heading>
        ) : (
          <SubHeading>Financial statistics</SubHeading>
        )}
      </div>
      <div className="flex lg:items-center gap-7 md:gap-7 flex-col sm:flex-col md:flex-col lg:flex-row justify-between mt-5">
        <div>
          <p className="text-xl mb-3">Today, Feb 28</p>
          <p className="text-3xl tracking-tight font-medium flex items-center">
            <span>
              <img src="https://cdn-icons-png.flaticon.com/512/32/32974.png" width="24px" />
            </span>
            36,670.90
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button>
            <CreditCardIcon className="mt-0.3 mr-2" width="20px" /> Income{' '}
            <ChevronDownIcon className="mt-0.3 ml-2" width="20px" />
          </Button>
          <div>
            <Drop />
          </div>
        </div>
      </div>
      <Line className="ch" options={options} data={data} />;
      <div className="mt-6">
        <Link
          to="/reports"
          className={`flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 ${prop.hidden}`}>
          View all
        </Link>
      </div>
    </Container>
  );
};
