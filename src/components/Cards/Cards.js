import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';
import { Container } from 'components/Container/Container';
// import { Container } from 'components/Container/Container'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const Cards = ({ stats }) => {
  return (
    <div className="">
      <dl className="mt-2">
        <Container>
          {stats.map((item) => (
            <div key={item.id} className="relative overflow-hidden">
              <dt>
                <div className="absolute rounded-md grooming-color p-3">
                  <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
                <p
                  className={classNames(
                    item.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                    'ml-2 flex items-baseline text-sm font-semibold'
                  )}>
                  {item.changeType === 'increase' ? (
                    <ArrowUpIcon
                      className="h-5 w-5 flex-shrink-0 self-center text-green-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <ArrowDownIcon
                      className="h-5 w-5 flex-shrink-0 self-center text-red-500"
                      aria-hidden="true"
                    />
                  )}

                  <span className="sr-only">
                    {' '}
                    {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by{' '}
                  </span>
                  {item.change}
                </p>
              </dd>
              <div className=" inset-x-0 border rounded   bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <a href="#" className="font-medium grooming-text hover:text-indigo-500">
                    {' '}
                    View all<span className="sr-only"> {item.name} stats</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </Container>
      </dl>
    </div>
  );
};
