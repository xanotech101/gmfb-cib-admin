import { Heading } from 'components/Common/Header/Heading';
import { Container } from 'components/Container/Container';
import { ProfileDetails } from './components/ProfileDetails';
import { useStore } from 'hooks';
import { Avatar } from 'components/Avatar/Avatar';

export const Profile = () => {
  const { user } = useStore();
  const name = `${user?.firstName} ${user?.lastName}`;

  return (
    <div className="p-6 w-full lg:w-[75%]">
      <Container>
        <div className="lg:flex md:block justify-between mt-2">
          <Heading>
            <h1>Profile Information</h1>
          </Heading>
        </div>
        <div className="flex items-center gap-3">
          <Avatar name={name} textSize="20" size={64} />
          <p className="text-md font-medium">{name}</p>
        </div>
        <ProfileDetails data={user}></ProfileDetails>
      </Container>
    </div>
  );
};
