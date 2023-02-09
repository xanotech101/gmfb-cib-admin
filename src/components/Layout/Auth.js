import { Logo } from "components/Logo/Logo";

export const Auth = ({ bannerSrc, children, title }) => {
  return (
    <div className="flex min-h ">
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <div>
             <Logo/>
              <div className="mt-6 text-3xl font-bold tracking-tight text-gray-900">{title}</div>
            </div>
          </div>
          <div className="mt-8">
            <div className="mt-6">{children}</div>
          </div>
        </div>
      </div>
      <div className="relative w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
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
