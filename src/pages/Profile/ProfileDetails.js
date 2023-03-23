import { List } from 'components/List/List';
import {
  EnvelopeIcon,
  PhoneIcon,
  UserCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/20/solid';

export const ProfileDetails = ({ data }) => {
  return (
    <div className="pt-3">
      <List>
        <List.Container>
          <List.Item icon={<UserCircleIcon width="20px" />} title="Name" />
          <List.Item title={`${data?.firstName ?? ''} ${data?.lastName ?? ''}`} />
        </List.Container>
        <List.Container>
          <List.Item icon={<EnvelopeIcon width="20px" />} title="Email" />
          <List.Item title={data?.email} />
        </List.Container>
        <List.Container>
          <List.Item icon={<PhoneIcon width="20px" />} title="Phone number" />
          <List.Item title={data?.phone} />
        </List.Container>
        <List.Container>
          <List.Item icon={<InformationCircleIcon width="20px" />} title="Role" />
          <List.Item title={data?.role} />
        </List.Container>
      </List>
    </div>
  );
};
