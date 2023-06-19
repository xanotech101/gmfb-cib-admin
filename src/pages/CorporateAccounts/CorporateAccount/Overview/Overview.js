import classNames from 'classnames';

const stats = [
  { name: 'Number of users', value: '405' },
  { name: 'Average deploy time', value: '3.65' },
  { name: 'Number of servers', value: '3' },
  { name: 'Success rate', value: '98.5%' }
];

export const Overview = () => {
  return (
    <div className="grid grid-cols-1 bg-white sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, statIdx) => (
        <div
          key={stat.name}
          className={classNames('border-b border-gray-200 py-6 px-4 sm:px-6 lg:px-8', {
            'sm:border-l': statIdx % 2 === 1,
            'lg:border-l': statIdx === 2
          })}>
          <p className="truncate text-sm font-medium text-gray-500">{stat.name}</p>
          <p className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};
