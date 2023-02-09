import { Tabs, Tab } from 'components/Tabs/TabComponent';
import { General } from './General';
import { Security } from './Security';
import { User } from './User/User';

export const Update = () => {
  return (
    <div className="mt-5">
      <Tabs>
        <Tab component={<General />} active>
          General
        </Tab>
        <Tab component={<Security />}>Security</Tab>
        <Tab component={<User />}>Corperate Users</Tab>
      </Tabs>
    </div>
  );
};
