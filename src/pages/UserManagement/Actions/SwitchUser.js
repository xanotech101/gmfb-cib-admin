import { useQuery } from '@tanstack/react-query';
import { Select } from 'components/Form/Select/Select';
import { Input } from 'components/Form/Input/Input';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { userService } from 'services';
import { Button } from 'components/Button/Button';
import { useUsers } from 'hooks/useUsers';

export const SwitchUser = ({ outgoingUser, closeModal, otp }) => {
  const { data: authorizers } = useQuery({
    queryKey: ['authorizers'],
    queryFn: () =>
      userService.getBranchUsers({
        privilege: 'authoriser',
        branchId: outgoingUser.organizationId?._id
      }),
    enabled: !!outgoingUser && outgoingUser?.privileges?.[0]?.name === 'authoriser'
  });

  const { data: verifiers } = useQuery({
    queryKey: ['verifiers'],
    queryFn: () =>
      userService.getBranchUsers({
        privilege: 'verifier',
        branchId: outgoingUser.organizationId?._id
      }),
    enabled: !!outgoingUser && outgoingUser?.privileges?.[0]?.name === 'verifier'
  });

  const transformData = useCallback((data, privilege) => {
    const users = [];
    data.forEach((user) => {
      const privileges = user.privileges.map((privilege) => {
        return privilege.name;
      });
      if (privileges.includes(privilege)) {
        users.push({
          label: `${user.firstName} ${user.lastName}`,
          value: user._id
        });
      }
    });
    return users;
  }, []);

  const options = useMemo(() => {
    const privilege = outgoingUser?.privileges?.[0]?.name;
    let usersList = [];
    if (privilege === 'authoriser') {
      usersList = (authorizers ?? [])?.filter(
        ({ _id, disabled }) => _id !== outgoingUser._id && !disabled
      );
    } else if (privilege === 'verifier') {
      usersList = (verifiers ?? [])?.filter(
        ({ _id, disabled }) => _id !== outgoingUser._id && !disabled
      );
    }
    return transformData(usersList, privilege);
  }, [authorizers, verifiers, outgoingUser]);

  const { switchUsers, disableUser } = useUsers();

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    switchUsers.mutate({
      incomingUser: data.incomingUser.value,
      outgoingUser: outgoingUser._id,
      successCb: () => disableUser.mutate({ id: outgoingUser._id, otp, successCb: closeModal }),
      type: outgoingUser?.privileges?.[0]?.name
    });
  };

  return (
    <>
      <div className="sm:flex sm:items-start">
        <div>
          <h3 className="text-base font-semibold leading-6 text-gray-900">Switch User</h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              <span className="text-gray-900 capitalize font-semibold">
                {outgoingUser?.firstName} {outgoingUser?.lastName} (
                {outgoingUser?.privileges[0]?.name})
              </span>{' '}
              is tied to to a mandate and cannot be disabled. Please switch with another user before
              you can disable this user.
            </p>
          </div>
        </div>
      </div>
      <hr className="my-6" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Current User"
          id="current_user"
          disabled
          defaultValue={outgoingUser?.firstName + ' ' + outgoingUser?.lastName}
        />
        <Select
          label="New User"
          name="incomingUser"
          control={control}
          options={options}
          error={errors?.incomingUser?.message}
        />
        <div className="pt-5">
          <Button
            type="submit"
            variant="primary"
            disabled={switchUsers.isLoading || disableUser.isLoading}
            isFullWidth>
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};
