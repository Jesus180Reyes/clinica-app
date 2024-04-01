export const HomePage = () => {
  return (
    <>
      <h1 className='text-3xl font-bold underline ml-4'>Home Page</h1>
      <p>{import.meta.env.APP_HOST ?? 'no data'}</p>
    </>
  );
};
