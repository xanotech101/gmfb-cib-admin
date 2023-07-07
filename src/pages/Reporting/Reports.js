import { SplitButton } from 'components/Button/SplitButton';
import { Heading } from 'components/Header/Heading';
import { useState } from 'react';
import { CChart } from '@coreui/react-chartjs';
import { useQuery } from '@tanstack/react-query';
import { Container } from 'components/Container/Container';
import { BanknotesIcon, CheckIcon, ClockIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { naira } from 'utils/currencyFormatter';
import { analyticsService } from 'services';
import DatePicker from 'react-datepicker';
import { Label } from 'components/Form/Label/Label';
import ContentLoader from 'react-content-loader';

const months = [
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
const stats = [
  {
    name: 'Amount Disbursed',
    stat: naira.format('0'),
    icon: BanknotesIcon,
    bg: 'bg-orange-500'
  },
  {
    name: 'Disburse Pending',
    stat: '0',
    icon: ClockIcon,
    bg: 'bg-yellow-500'
  },
  {
    name: 'Declined Request',
    stat: '0',
    icon: XMarkIcon,
    bg: 'bg-red-500'
  },
  {
    name: 'Approved Request',
    stat: '0',
    icon: CheckIcon,
    bg: 'bg-green-500'
  }
];

export const Report = () => {
  const [barType, setBarType] = useState('bar');
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
      stats[0].stat = naira.format(data.totalDisbursements?.amount ?? 0);
      stats[1].stat = data.pendingRequest ?? 0;
      stats[2].stat = data.totalDeclined ?? 0;
      stats[3].stat = data.totalApproved ?? 0;
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
        <div className="mb-5">
          <Heading>Analytics</Heading>
        </div>

        <dl className="grid grid-cols-12 gap-6 mb-8">
          {stats.map((item) => (
            <div className="relative overflow-hidden col-span-3" key={item.name}>
              <Container>
                <dd>
                  <p className="truncate text-sm font-medium text-gray-500">{item.name}</p>
                  <h4 className="text-xl font-bold tracking-tight text-gray-900 mt-1">
                    {isFetching ? '...' : item.stat}
                  </h4>
                </dd>
              </Container>
            </div>
          ))}
        </dl>

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
                          showMonthDropdown
                          onChange={setYear}
                          showYearPicker
                          dateFormat="yyyy"
                          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm disabled:cursor-not-allowed disabled:opacity-70"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="h-[500px]">
                    {barType === 'line' && (
                      <CChart
                        type="line"
                        id="lineChart"
                        data={{
                          labels: disbursements.map((disbursement) => disbursement.month),
                          datasets: [
                            {
                              label: 'Cash Outflow (₦)',
                              backgroundColor: '#891c69',
                              borderColor: '#891c69',
                              pointBackgroundColor: '#ea580c',
                              pointBorderColor: '#ea580c',
                              data: disbursements.map((disbursement) => disbursement.amount)
                            }
                          ]
                        }}
                        height={500}
                        options={{
                          events: [],
                          maintainAspectRatio: false,
                          scales: {
                            y: {
                              ticks: {
                                callback: function (value) {
                                  return '₦' + value.toLocaleString();
                                }
                              }
                            }
                          }
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
                              label: 'Cash Outflow (₦)',
                              backgroundColor: '#891c69',
                              borderColor: '#891c69',
                              data: disbursements?.map((disbursement) => disbursement.amount)
                            }
                          ]
                        }}
                        height={500}
                        options={{
                          events: [],
                          barPercentage: 0.5,
                          maintainAspectRatio: false,
                          responsive: true,
                          scales: {
                            y: {
                              ticks: {
                                callback: function (value) {
                                  return '₦' + value.toLocaleString();
                                }
                              }
                            }
                          }
                        }}
                        labels="months"
                      />
                    )}
                  </div>
                </>
              )}
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};
