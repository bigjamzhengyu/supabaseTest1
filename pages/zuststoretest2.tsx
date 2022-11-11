import { useZustStore1 } from "../utils/zustStore1";

const Count = () => {
  const count = useZustStore1((state) => state.count);
  return (
    <>
      <h2>count: {count}</h2>
    </>
  );
};

const IncreaseCount = () => {
  const increaseCount = useZustStore1((state) => state.increaseCount);
  return (
    <>
      <button onClick={()=> increaseCount()}>Increase</button>
      <br/>
    </>
  );
};

const ResetButton = () => {
  const {resetCount} = useZustStore1();

  return (
    <>
      <button onClick={() => resetCount()}>Reset</button>
      <br/>
    </>
  )
};

export default function ZustStoreTest2() {
  return (
    <section className="bg-black mb-32">
      <div className="max-w-6xl mx-auto pt-8 sm:pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
          ZustStoreTest2
          </h1>
          <p className="mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl max-w-2xl m-auto">
            <Count />
            <IncreaseCount />
            <ResetButton />
          </p>
        </div>
      </div>
      <div className="p-4">
      </div>
    </section>
  );
}
