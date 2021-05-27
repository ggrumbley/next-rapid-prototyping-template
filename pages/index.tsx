import { TodoList } from '../features/TodoList';
import { AuthGuard } from '../components/AuthGuard';
import { supabase } from '../utils';

const Home: React.FC = () => (
  <div className="dark grid place-content-center w-full h-full">
    <AuthGuard>
      <TodoList />
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
);

export default Home;
