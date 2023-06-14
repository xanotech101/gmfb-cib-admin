import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from 'components/Button/Button';

import { Input } from 'components/Form/Input/Input';
import { Select } from 'components/Form/Select/Select';
import { SubHeading } from 'components/Header/SubHeading';

import React, { useCallback } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { disableAccount, generateOtp } from 'services/enableDisable';
import Disabled from './Disable';

const GenerateOtp = ({ userid, user, users }) => {
  const [generateOtpPin, setGenerateOtp] = useState(true);
  const [mandate, setMandate] = useState(false);
  //   const [incoming, setIncoming] = useState('');
  const [otp, setOtp] = useState('');
  const queryClient = useQueryClient();
  //   const [page] = useState(1);
  const navigate = useNavigate();
  const {
    control,
    formState: { errors }
  } = useForm();
  //   const { data } = useQuery({
  //     queryKey: ['mandateRule', page],
  //     queryFn: () => mandateService.getAll({ page })
  //   });

  const handleOtpGeneration = useMutation({
    mutationFn: generateOtp,
    onSuccess: () => {
      setGenerateOtp(false);
    },
    onError: () => {}
  });
  const Disable = useMutation({
    mutationFn: (userid, data) => {
      disableAccount(userid, {
        ...data,
        otp
      });
    },
    onSuccess: (res) => {
      console.log(res, 'response');
      queryClient.invalidateQueries('all-users');
      navigate('/user-management');
    },
    onError: (error) => {
      console.log(error, 'error from here');
      if (error) {
        setMandate(true);
      }
    }
  });

  const current = user?.privileges.map((priv) => priv?.name);

  const transformData = useCallback(
    (data, priv) => {
      const users = [];
      data.map((user) => {
        const privileges = user.privileges.map((privilege) => {
          return privilege?.name;
        });

        if (privileges.includes(priv)) {
          users.push({
            label: `${user.firstName} ${user.lastName}`,
            value: user._id
          });
        }
      });
      return users;
    },
    [users]
  );

  return (
    <>
      {mandate === true ? (
        <>
          <div className="">
            <SubHeading>
              {`Sorry ${user?.firstName} ${user?.lastName} is already tied to the following mandates, replace this user from all available mandates before disabling.`}
            </SubHeading>
            <div className="flex flex-col gap-5 mt-6">
              {current.includes('authoriser') ? (
                <Select
                  label="Authorisers"
                  name="authoriser"
                  control={control}
                  options={transformData(users, 'authoriser')}
                  error={errors.authoriser && 'Authorizer are required'}
                />
              ) : (
                <Select
                  label="Verifiers"
                  name="verifier"
                  control={control}
                  options={transformData(users, 'verifier')}
                  error={errors.verifier && 'Authorizer are required'}
                />
              )}
            </div>
          </div>
          <div className="mt-4">
            <Button isFullWidth onClick={() => {}}>
              Switch user
            </Button>
          </div>
        </>
      ) : (
        <div>
          <Disabled />
          <div>
            <Input
              label="Enter OTP (OTP will be sent to your registered email and phone number)"
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
            />
            {
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-primary disabled:cursor-not-allowed disabled:opacity-50"></button>
              </div>
            }
          </div>
          <div className="mt-5">
            {generateOtpPin ? (
              <Button
                type="button"
                isFullWidth
                onClick={() => {
                  handleOtpGeneration.mutate();
                }}>
                Generate OTP
              </Button>
            ) : (
              <Button
                type="submit"
                isFullWidth
                onClick={() => {
                  Disable.mutate(userid);
                }}>
                Submit
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default GenerateOtp;
