import { useMemo, useState } from 'react';
import { SubHeading } from 'components/Header/SubHeading';
import { Checkbox } from 'components/Form/Checkbox/Checkbox';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { privilegeService } from 'services';
import { Button } from 'components/Button/Button';
import { useMutation } from '@tanstack/react-query';
import { userService } from 'services';

const SwitchRoles = ({ userName, user }) => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ['privileges'],
    queryFn: () => privilegeService.getPrivileges()
  });

  const currentPrivileges = useMemo(() => {
    const userPrivileges = user?.privileges ?? [];
    return userPrivileges.map((privilege) => privilege._id);
  }, [user, userName]);

  const [selectedPrivileges, setSelectedPrivileges] = useState(currentPrivileges);

  const { mutate, isLoading } = useMutation(
    () =>
      userService.updatePrivilege({
        privileges: selectedPrivileges,
        id: user._id
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['getMyBranchUsers']);
      }
    }
  );

  return (
    <div>
      <SubHeading>Update privilege for {userName}</SubHeading>
      <div className="space-y-6 mt-5">
        <p className="text-lg font-bold">Privileges</p>
        {(data?.privileges ?? []).map((privilege) => (
          <Checkbox
            checked={selectedPrivileges.includes(privilege._id)}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedPrivileges([privilege._id]);
              } else {
                setSelectedPrivileges([]);
              }
            }}
            title={privilege.name}
            id={privilege._id}
            key={privilege._id}
          />
        ))}
        <Button isFullWidth onClick={mutate} disabled={isLoading}>
          Submit
        </Button>
      </div>
    </div>
  );
};
export default SwitchRoles;
