import './App.css';
import VideoContainer from './VideoContainer';
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <VideoContainer />
    </QueryClientProvider>
  );
}

export default App;
