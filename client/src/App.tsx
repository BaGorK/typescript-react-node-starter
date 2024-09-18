import { useQuery } from '@tanstack/react-query';
import { QueryKey } from './constants/query_key';
import { apiClient } from './services/apiClient';

function App() {
  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.USERS],
    queryFn: apiClient.getAll,
  });

  if (isLoading) {
    return (
      <div className='text-2xl h-screen flex items-center justify-center'>
        <p className='animate-loading'>Loading ...</p>
      </div>
    );
  }

  return (
    <div className='text-5xl text-red-600 h-screen flex items-center justify-center capitalize'>
      {data?.message}
    </div>
  );
}

export default App;
