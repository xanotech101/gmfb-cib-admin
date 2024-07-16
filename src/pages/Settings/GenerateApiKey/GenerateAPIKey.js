import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from 'components/Button/Button';
import { Select } from 'components/Form/Select/Select';
import { Heading } from 'components/Header/Heading';
import { useForm } from 'react-hook-form';
import { apiUsageService } from 'services/apiUsage.service';

export const APIKEY = () => {
  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm();
  const { data } = useQuery({
    queryKey: ['thirdparty-organization'],
    queryFn: () => apiUsageService.getApiUsage()
  });
  const { mutate, isLoading } = useMutation({
    mutationKey: ['generate-key'],
    mutationFn: (data) => apiUsageService.generateApiKey(data),
    onSuccess: (res) => {
      console.log(res);
    }
  });
  const onSubmit = (data) => {
    mutate({
      organization_name: data?.organization_name?.value
    });
  };
  // async function hashAndStoreData(key, data) {

  //   const encoder = new TextEncoder();
  //   const dataUint8Array = encoder.encode(data);

  //   const hashBuffer = await crypto.subtle.digest('SHA-256', dataUint8Array);

  //   const hashArray = Array.from(new Uint8Array(hashBuffer));
  //   const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');

  //   localStorage.setItem(key, hashHex);
  // }

  // async function getData(key) {
  //   return localStorage.getItem(key);
  // }

  // hashAndStoreData(key, haha).then(() => {
  //   console.log('Data hashed and stored in localStorage');

  //   getData(key).then((hashedData) => {
  //     console.log('Retrieved hashed data:', hashedData);
  //   });
  // });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Heading>Settings</Heading>
      <p className="mb-3 mt-2">Kindly make your changes below.</p>
      <div className="lg:w-[500px] w-full space-y-4 mt-5">
        <Select
          control={control}
          name="organization_name"
          options={data?.results?.map((organization) => ({
            label: organization?.organization_name,
            value: organization?.organization_name
          }))}
          error={errors.organization_name && 'Organization name is required'}
          label="Choose organization"
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            Generate API key
          </Button>
        </div>
      </div>
    </form>
  );
};
