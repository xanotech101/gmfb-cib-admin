import { Link } from 'react-router-dom';
import { CChart } from '@coreui/react-chartjs';
import { Select } from 'components/Form/Select/Select';
import { Container } from 'components/Container/Container';
import { useForm } from 'react-hook-form';
import { Cards } from 'components/Cards/Cards';
import { BanknotesIcon, CheckIcon, ClockIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { SplitButton } from 'components/Button/SplitButton';
import { naira } from 'utils/currencyFormatter';
import { ArrowDownOnSquareStackIcon } from '@heroicons/react/20/solid';
export const Chart = (prop) => {
  const [lineGraph, setLineGraph] = useState(false);
  const [barChart, setBarChart] = useState(true);
  const action = [
    {
      name: 'Line Chart',
      action: () => {
        setLineGraph(true);
        setBarChart(false);
      }
    },
    {
      name: ' Bar Chart',
      action: () => {
        setLineGraph(false);
        setBarChart(true);
      }
    }
  ];

  const stats = [
    {
      name: 'Total Amount Disbursed',
      stat: naira.format('300000'),
      icon: BanknotesIcon,
      bg: 'bg-orange-500'
    },
    {
      name: 'Total  Pending Request',
      stat: '1000',
      icon: ClockIcon,
      bg: 'bg-yellow-500'
    },
    {
      name: 'Total Declined Request',
      stat: '500',
      icon: XMarkIcon,
      bg: 'bg-red-500'
    },
    {
      name: 'Total Amount Approved',
      stat: '300000',
      icon: CheckIcon,
      bg: 'bg-green-500'
    },
    {
      name: 'Total Transactions',
      stat: '30,0000',
      icon: ArrowDownOnSquareStackIcon,
      bg: 'bg-blue-500'
    }
  ];
  const { control } = useForm();
  const isDashboardPage = /dashboard/i.test(window.location.pathname);
  return (
    <>
      <div className="grid grid-cols-12">
        <div
          className={
            isDashboardPage
              ? 'col-span-12 bg-white rounded-[8px] border border-[#dadce0] px-6'
              : 'col-span-8 row-span-4 bg-white rounded-[8px] border border-[#dadce0] px-6'
          }>
          <div className=" flex  items-center justify-between pt-1">
            <div>
              <p className="font-medium text-xl mb-3 mt-7"> Financial Statistics</p>
              <SplitButton buttonText="Switch Chart" items={action} pos="left-0" />
            </div>
            <div className="w-[25%]">
              <Select
                label="Filter by year"
                name="filter by year"
                control={control}
                options={[
                  {
                    value: '2023',
                    label: '2023'
                  }
                ]}
              />
            </div>
          </div>
          <div>
            {lineGraph === true && (
              <CChart
                type="line"
                data={{
                  labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'September'
                  ],
                  datasets: [
                    {
                      label: 'Cash Inflow',
                      backgroundColor: '#891c69',
                      borderColor: '#891c69',
                      pointBackgroundColor: '#ea580c',
                      pointBorderColor: '#ea580c',
                      data: [1000000, 2000000, 9900000, 4000000, 5000000, 6000000, 60000, 8000000]
                    }
                  ]
                }}
                height={!isDashboardPage && '300px'}
              />
            )}
            {barChart === true && (
              <CChart
                type="bar"
                data={{
                  labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'September'
                  ],
                  datasets: [
                    {
                      label: 'Cash Inflow',
                      backgroundColor: '#891c69',
                      data: [1000000, 2000000, 3000000, 4000000, 5000000, 6000000, 7000000, 8000000]
                    }
                  ]
                }}
                labels="months"
                height={!isDashboardPage && '300px'}
              />
            )}
          </div>
          <div className="my-6">
            <Link
              to="/reports"
              className={`flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 ${prop.hidden}`}>
              View Analytics
            </Link>
          </div>
        </div>
        {!isDashboardPage && (
          <div className="col-span-4 ml-6 space-y-6">
            <Cards stats={stats} />
          </div>
        )}
        {!isDashboardPage && (
          <div className="col-span-8 mt-4">
            <Container>
              <div className=" flex  items-center justify-between pt-1 pb-3">
                <p className="font-medium text-xl my-4">Transactions</p>
                <div className="w-[25%]">
                  <Select
                    label="Filter by status"
                    name="filter by status"
                    control={control}
                    options={[
                      {
                        value: 'line graph',
                        label: 'line graph'
                      },
                      {
                        value: 'approved',
                        label: 'approved'
                      },
                      {
                        value: 'declined',
                        label: 'declined'
                      },
                      {
                        value: 'transfer request',
                        label: 'transfer request'
                      }
                    ]}
                  />
                </div>
              </div>
              <div className="w-[75%]">
                <CChart
                  type="doughnut"
                  data={{
                    labels: ['Approved', 'Declined', 'Pending'],
                    datasets: [
                      {
                        backgroundColor: ['#4ade80', '#dc2626', '#fde047'],
                        data: [40, 20, 20]
                      }
                    ]
                  }}
                />
              </div>
            </Container>
          </div>
        )}
      </div>
    </>
  );
};
