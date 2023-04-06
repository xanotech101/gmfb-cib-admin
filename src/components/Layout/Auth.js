import { Container } from 'components/Container/Container';
import { Logo } from 'components/Logo/Logo';

export const Auth = ({ children, title }) => {
  return (
    <div className="flex min-h  justify-center items-center">
      <div className="fixed right-0 top-0 w-[20%] h-[30%] svg2"></div>
      <div className="fixed -left-10 bottom-0 w-[24%] h-[50%] ">
        <div className="svg w-full h-full"></div>
      </div>
      <div className="w-[80%] lg:w-[45%] flex-col px-10 lg:px-20 flex justify-center py-12 lg:flex-none">
        <div className="">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <Container>
            <div>
              <div>
                <div className="mt-6 text-2xl font-bold tracking-tight text-gray-900 capitalize">
                  {title}
                </div>
              </div>
            </div>
            <div className="mt-8">
              <div className="mt-6">{children}</div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};
