import useUser from 'libs/client/useUser';

const Home = () => {
  const user = useUser();
  return (
    <div>
      <p>Home</p>
    </div>
  );
};

export default Home;
