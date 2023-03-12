import { Logo } from 'components/Logo/Logo';

export const Auth = ({ bannerSrc, children, title }) => {
  return (
    <div className="flex min-h ">
      <div className="w-full lg:w-[45%] flex-col px-10 lg:px-20 flex justify-center py-12 lg:flex-none">
        <div className="">
          <div>
            <div>
              <Logo />
              <div className="mt-6 text-3xl font-bold tracking-tight text-gray-900">{title}</div>
            </div>
          </div>
          <div className="mt-8">
            <div className="mt-6">{children}</div>
          </div>
        </div>
      </div>
      <div className="relative w-[55%] item-end lg:block sm:hidden md:hidden hidden">
        <img
          className="absolute right-0 inset-0 h-full w-full object-cover"
          src={
            bannerSrc ??
            'https://groomingmfb.com/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-29-at-1.10.57-PM-1.jpeg'
          }
          alt="banner"
        />
      </div>
    </div>
  );
};
