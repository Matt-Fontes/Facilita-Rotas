import './App.css';
import { ThemeProvider } from './providers/themeProvider';
import Main from './pages/main/main';
import ScrollProvider from './contexts/ScrollContext';

function App() {

    return (
        <ThemeProvider>
            <ScrollProvider>
                <Main />
            </ScrollProvider>
        </ThemeProvider>
    );
}

export default App;
