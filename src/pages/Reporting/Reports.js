import { SplitButton } from 'components/Button/SplitButton';
import { Heading } from 'components/Common/Header/Heading';
import { useState } from 'react';
import { CChart } from '@coreui/react-chartjs';
import { useQuery } from '@tanstack/react-query';
import { Container } from 'components/Container/Container';
import { BanknotesIcon, CheckIcon, ClockIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { naira } from 'utils/currencyFormatter';
import { ArrowDownOnSquareStackIcon } from '@heroicons/react/20/solid';
import { analyticsService } from 'services';
import DatePicker from 'react-datepicker';
import { Label } from 'components/Form/Label/Label';
import ContentLoader from 'react-content-loader';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'September'];
const stats = [
  {
    name: 'Total Successful Transactions',
    stat: '0',
    icon: ArrowDownOnSquareStackIcon,
    bg: 'bg-blue-500'
  },
  {
    name: 'Total Amount Disbursed',
    stat: naira.format('0'),
    icon: BanknotesIcon,
    bg: 'bg-orange-500'
  },
  {
    name: 'Total  Pending Request',
    stat: '0',
    icon: ClockIcon,
    bg: 'bg-yellow-500'
  },
  {
    name: 'Total Declined Request',
    stat: '0',
    icon: XMarkIcon,
    bg: 'bg-red-500'
  },
  {
    name: 'Total Amount Approved',
    stat: '0',
    icon: CheckIcon,
    bg: 'bg-green-500'
  }
];

export const Report = () => {
  const isDashboard = /dashboard/i.test(window.location.pathname);
  const [barType, setBarType] = useState('line');
  const [disbursements, setDisbursements] = useState([]);
  const [year, setYear] = useState(new Date());

  const { isFetching } = useQuery({
    queryKey: ['analytics', year],
    queryFn: () => analyticsService.getAnalysis(year.getFullYear()),
    onSuccess: (data) => {
      const disbursedAmount = data.disbursements?.data ?? [];
      const formattedData = [];
      months.forEach((month) => {
        const disbursed = disbursedAmount.find((disbursed) => disbursed.month === month);
        if (disbursed) {
          formattedData.push({
            month,
            amount: disbursed.amount
          });
        } else {
          formattedData.push({
            month,
            amount: 0
          });
        }
      });
      setDisbursements(formattedData);
      stats[0].stat = data.totalSuccessfulTransactions ?? 0;
      stats[1].stat = naira.format(data.totalDisbursements?.amount ?? 0);
      stats[2].stat = data.pendingRequests ?? 0;
      stats[3].stat = data.totalDeclined ?? 0;
      stats[4].stat = data.totalApproved ?? 0;
      stats[5].stat = data.totalTransactions ?? 0;
    }
  });

  const action = [
    {
      name: 'Line Chart',
      action: () => setBarType('line')
    },
    {
      name: ' Bar Chart',
      action: () => setBarType('bar')
    }
  ];

  return (
    <div className="my-7 ml-2 px-5">
      <div className="py-5">
        {!isDashboard && (
          <div className="mb-5">
            <Heading>Analytics</Heading>
          </div>
        )}
        {!isDashboard && (
          <dl className="grid grid-cols-12 gap-6 mb-8">
            {stats.map((item) => (
              <div className="relative overflow-hidden col-span-4" key={item.id}>
                <Container>
                  <dt>
                    <div className={`absolute rounded-md p-3 ${item.bg}`}>
                      <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
                  </dt>
                  <dd className="ml-16 flex items-baseline">
                    <h4 className="text-2xl font-bold tracking-tight text-gray-900">{item.stat}</h4>
                  </dd>
                </Container>
              </div>
            ))}
          </dl>
        )}

        <div className="grid grid-cols-12 gap-y-6">
          <div className="col-span-12">
            <Container>
              {isFetching ? (
                <ContentLoader viewBox="0 0 380 70">
                  <rect x="0" y="0" rx="5" ry="5" width="380" height="70" />
                </ContentLoader>
              ) : (
                <>
                  <div className=" flex items-center justify-between">
                    <div>
                      <p className="font-medium text-xl mb-4">Yearly Transfer History</p>
                    </div>
                    <div className="flex items-end space-x-5">
                      <SplitButton
                        buttonText={barType === 'line' ? 'Line Chart' : 'Bar Chart'}
                        items={action}
                      />
                      <div className="w-[200px]">
                        <Label label="Select Year" />
                        <DatePicker
                          selected={year}
                          onChange={setYear}
                          showYearPicker
                          dateFormat="yyyy"
                          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm disabled:cursor-not-allowed disabled:opacity-70"
                        />
                      </div>
                    </div>
                  </div>

                  {barType === 'line' && (
                    <CChart
                      type="line"
                      id="lineChart"
                      data={{
                        labels: disbursements.map((disbursement) => disbursement.month),
                        datasets: [
                          {
                            label: 'Cash Inflow',
                            backgroundColor: '#891c69',
                            borderColor: '#891c69',
                            pointBackgroundColor: '#ea580c',
                            pointBorderColor: '#ea580c',
                            data: disbursements.map((disbursement) => disbursement.amount)
                          }
                        ]
                      }}
                      labels="months"
                    />
                  )}
                  {barType === 'bar' && (
                    <CChart
                      type="bar"
                      id="barChart"
                      data={{
                        labels: disbursements?.map((disbursement) => disbursement.month),
                        datasets: [
                          {
                            label: 'Cash Inflow',
                            backgroundColor: '#891c69',
                            borderColor: '#891c69',
                            data: disbursements?.map((disbursement) => disbursement.amount)
                          }
                        ]
                      }}
                      labels="months"
                    />
                  )}
                </>
              )}
            </Container>
          </div>
          <div className="col-span-12 hidden">
            <Container>
              <div className=" flex  items-center justify-between pt-1 pb-3">
                <p className="font-medium text-xl my-4">Transactions</p>
              </div>
              <div className="w-[75%] m-auto">
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
        </div>
      </div>
    </div>
  );
};
