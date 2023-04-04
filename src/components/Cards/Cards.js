import { Heading } from 'components/Common/Header/Heading';
import { Container } from 'components/Container/Container';
// import { Container } from 'components/Container/Container'

export const Cards = ({ stats }) => {
  return (
    <div className="">
      <dl className="">
        {stats.map((item) => (
          <div key={item.id} className="relative overflow-hidden mb-6">
            <Container>
              <dt>
                <div className={`absolute rounded-md p-3 ${item.bg}`}>
                  <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <Heading>{item.stat}</Heading>
              </dd>
            </Container>
          </div>
        ))}
      </dl>
    </div>
  );
};
