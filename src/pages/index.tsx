import useUser from 'libs/client/useUser';

const Home = () => {
  const { user, isLoading } = useUser();
  return (
    <div>
      <p>Home</p>
    </div>
  );
};

export default Home;
