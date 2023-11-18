import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Hello {user.displayName}! </h1>
      <p>Welcome to My Practice Pal!</p>
    </div>
  );
}

export default Home;
