import { Container } from 'components/Container/Container';

export const Cards = ({ stats }) => {
  return (
    <dl>
      {stats.map((item) => (
        <div key={item.id} className="relative overflow-hidden mb-6">
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
  );
};
