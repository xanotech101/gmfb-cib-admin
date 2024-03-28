import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from 'components/Button/Button';
import { Container } from 'components/Container/Container';
import { EmptyState } from 'components/EmptyState/EmptyState';
import { Input } from 'components/Form/Input/Input';
import { SubHeading } from 'components/Header/SubHeading';
import Pagination from 'components/Pagination/Pagination';
import { PER_PAGE } from 'constants/pagination';
import { useModal } from 'hooks';
import { useState } from 'react';
import ContentLoader from 'react-content-loader';
import { useForm } from 'react-hook-form';
import { accountService, otpService } from 'services';
import { WhiteListTable } from './WhiteListTable';
import { useTableSerialNumber } from 'hooks';
export const WhiteList = () => {
  const { Modal, showModal } = useModal();
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm();
  const [page, setPage] = useState(1);
  const params = {
    page: page,
    limit: PER_PAGE
  };
  const type = '';
  const {
    data: otp,
    mutate: handleOTP,
    isLoading: otpLoading
  } = useMutation({
    mutationKey: ['otp'],
    mutationFn: (data) => otpService.generateOtp(type, data)
  });
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['whitelisted', params],
    queryFn: () => accountService.getWhiteListedAccounts(params)
  });
  const { mutate, isLoading } = useMutation({
    mutationKey: ['whitelist'],
    mutationFn: (data) => accountService.whiteListAccount(data),
    onSuccess: () => {
      showModal();
      refetch();
    }
  });
  const initialSerialNumber = useTableSerialNumber(page);
  const onSubmit = (data) => {
    mutate({
      accounts: [data?.accounts],
      otp: data?.otp
    });
  };
  const RenderItems = ({ data, initialSerialNumber, refetch }) => {
    console.log(data);
    return (
      <div>
        {data?.length === 0 || !data ? (
          <EmptyState
            title={'Np account found'}
            description={'Account is still yet to be whitelisted'}
          />
        ) : (
          <WhiteListTable refetch={refetch} initialSerialNumber={initialSerialNumber} data={data} />
        )}
      </div>
    );
  };
  return (
    <div className="p-5">
      <Container>
        <div className="flex justify-between items-center my-4">
          <SubHeading>All Account Whitelisted</SubHeading>
          <Button onClick={showModal}>Add account number</Button>
        </div>
        <div>
          {isFetching ? (
            <div className="mt-5">
              <ContentLoader viewBox="0 0 380 70">
                <rect x="0" y="0" rx="5" ry="5" width="380" height="70" />
              </ContentLoader>
            </div>
          ) : (
            <div>
              <RenderItems
                refetch={refetch}
                initialSerialNumber={initialSerialNumber}
                data={data?.items}
              />
              <Pagination
                totalItems={data?.meta?.total ?? 0}
                handlePageClick={setPage}
                currentPage={page}
              />
            </div>
          )}
        </div>
      </Container>
      {Modal({
        children: (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <SubHeading>Whitelist account number below</SubHeading>
            <Input
              id="accounts"
              label="Account number"
              {...register('accounts', { required: true })}
              error={errors.accounts && 'Accounts is required'}
            />
            <div>
              <Input
                id="otp"
                label="Enter OTP"
                {...register('otp', { required: true })}
                error={errors.otp && 'OTP is required'}
              />
              <button
                type="button"
                onClick={() => {
                  handleOTP({
                    context: 'whitelist-account'
                  });
                }}
                disabled={isLoading}
                className="flex w-full justify-end text-primary mt-1 text-sm ">
                {otp?.status === 'success' ? (
                  <span> {otpLoading ? ' Regenerating OTP' : ' Regenerate OTP'}</span>
                ) : (
                  <span> {otpLoading ? ' Generating OTP' : ' Generate OTP'}</span>
                )}
              </button>
            </div>
            <Button isFullWidth type="submit" disabled={isLoading}>
              Submit
            </Button>
          </form>
        )
      })}
    </div>
  );
};
