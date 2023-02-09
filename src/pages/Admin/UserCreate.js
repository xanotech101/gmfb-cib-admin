import { Container } from 'components/Container/Container';

export const CreateUser = () => {
  return (
    <div className="card mt-9 ml-0 md:ml-10 lg:ml-10 sm:ml-0 px-4">
      <Container>
        <form className=" px-7 pb-8 ">
          <div className="">
            <div className="mb-10">
              <h1 className="text-2xl font-medium leading-6 text-gray-900 pt-8">
                Create Corperate Account
              </h1>
              <p className="mt-3 font-medium mb-3">Fill in customer&apos;s request details</p>
              <hr></hr>
            </div>
            <div className="">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Account Information</h3>
              </div>
              <div className="mt-6 fm">
                <div className="mt-4">
                  <label
                    htmlFor="first-name"
                    className="block mb-3 text-sm font-medium text-gray-700"
                  >
                    Customers name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3 mt-4">
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                    Amount
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      className="block w-full rounded-md border- shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <h3 className="text-lg font-medium leading-6 text-gray-900 mt-7">
                  Bank information
                </h3>
                <div className="bank-select mt-4">
                  <div className="">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                      Bank
                    </label>
                    <div className="mt-1 mr-12">
                      <select
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="block w-full rounded-md border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      >
                        <option>First Bank</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                    </div>
                  </div>

                  <div className="">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      Account number
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="city"
                        id="city"
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-3 mt-4">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    Account name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-center">
              <button
                type="submit"
                className=" inline-flex justify-center rounded-md border border-transparent grooming-color py-2 px-4 text-sm font-medium text-white shadow-sm  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-full"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
};
