import { Link } from 'react-router-dom';
import { CChart } from '@coreui/react-chartjs';
import { Select } from 'components/Form/Select/Select';
import { Container } from 'components/Container/Container';
import { useForm } from 'react-hook-form';
import { Cards } from 'components/Cards/Cards';
import { BanknotesIcon } from '@heroicons/react/24/outline';
export const Chart = (prop) => {
  const stats = [
    {
      name: 'Total Amount Disbursed',
      stat: '300000',
      icon: BanknotesIcon
    }
  ];
  const { control } = useForm();
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-8">
          <Container>
            <div className=" flex  items-center justify-between pt-1 pb-3">
              <p className="font-medium text-xl"> Financial Statistics</p>
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
                    label: 'Transaction History',
                    backgroundColor: '#891c69',
                    data: [1000000, 2000000, 3000000, 4000000, 5000000, 6000000, 7000000, 8000000]
                  }
                ]
              }}
              labels="months"
            />
          </Container>
        </div>
        <div className="col-span-4 ml-6">
          <Cards stats={stats} />
        </div>
        <div className="col-span-8 mt-4">
          <Container>
            <div className=" flex  items-center justify-between pt-1 pb-3">
              <p className="font-medium text-xl my-4">Transaction status</p>
              <div className="w-[25%]">
                <Select
                  label="Filter by status"
                  name="filter by status"
                  control={control}
                  options={[
                    {
                      value: 'pending',
                      label: 'pending'
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
                  labels: ['Transfer Request', 'Approved', 'Declined', 'Pending'],
                  datasets: [
                    {
                      backgroundColor: ['#60a5fa', '#4ade80', '#dc2626', '#fde047'],
                      data: [40, 80, 20, 10]
                    }
                  ]
                }}
              />
            </div>
          </Container>
        </div>
      </div>

      <div className="mt-6">
        <Link
          to="/reports"
          className={`flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 ${prop.hidden}`}>
          View all
        </Link>
      </div>
    </>
  );
};
