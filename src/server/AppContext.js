const { createContext, useState } = require("react");

export const AppContext = createContext();

function AppContextProvider({ children }) {
    const [audioState, setAudioState] = useState('paused'); 
    const [articleLoader, setArticleLoader] = useState(false);
    const [searchText, setSearchText] = useState('');

    const value = {
        audioState,
        setAudioState,
        articleLoader,
        setArticleLoader,
        searchText,
        setSearchText
    }; 

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;
