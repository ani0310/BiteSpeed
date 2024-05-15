import logo from './logo.svg';
import './App.css';
import ChatbotFlow from './chatbot/ChatbotFlow';
import { SnackbarProvider, useSnackbar } from 'notistack';

function App() {
  return (
    <SnackbarProvider>
    <div className="App">
      <ChatbotFlow />
    </div>

    </SnackbarProvider>
  );
}

export default App;
