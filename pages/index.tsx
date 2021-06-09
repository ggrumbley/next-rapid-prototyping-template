import { AuthGuard } from '../components/AuthGuard';
import { supabase } from '../utils';
import { Counter } from '../features/Counter/Counter';
import { Quiz } from '../features/Quiz/Quiz';

const Home: React.FC = () => (
  <div className="dark grid gap-8 grid-cols-2 grid-flow-row auto-rows-max m-20">
    <Counter />
    {/* <Quiz /> */}
    <div className="flex justify-center content-center p-10">
      <AuthGuard>
        <h2>You are authed!</h2>
        <button
          className="btn-black w-full mt-12"
          onClick={async () => {
            const { error } = await supabase.auth.signOut();
            if (error) console.log('Error logging out:', error.message);
          }}
        >
          Logout
        </button>
      </AuthGuard>
    </div>
  </div>
);

export default Home;
