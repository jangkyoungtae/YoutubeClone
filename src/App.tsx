import VideoContainer from './Page/VideoContainer';
import { QueryClient, QueryClientProvider } from 'react-query'
import {
  Route, Routes,
} from 'react-router-dom'
import VideoPlayerPage from './Page/VideoPlayerPage';
const queryClient = new QueryClient()



function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<VideoContainer />} />
        <Route path="/video" element={<VideoPlayerPage />} >
          <Route path=":videoId" element={<VideoPlayerPage />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
