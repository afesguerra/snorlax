import React, {useState} from 'react';
import './App.css';
import "@cloudscape-design/global-styles/index.css"
import {AppLayout, ContentLayout} from "@cloudscape-design/components";
import {PreferenceProps, Preferences} from "./components/ctx/Preferences";
import {PreferencesModal} from "./components/layout/PreferencesModal";
import {TopNav} from "./components/layout/TopNav";

const App = () => {
    const [showPreferences, setShowPreferences] = useState(false);
    const [preferences, setPreferences] = useState<PreferenceProps>({});

    const mergePreferences = (pref: Partial<PreferenceProps>) => {
        setPreferences(prev => Object.assign(prev, pref))
    }

    const content = <ContentLayout disableOverlap={true}>
        <pre>{JSON.stringify(preferences, null, 2)}</pre>
    </ContentLayout>;

    return <Preferences.Provider value={preferences}>
        <PreferencesModal
            visible={showPreferences}
            onClose={() => setShowPreferences(false)}
            mergePreferences={mergePreferences}/>
        <TopNav showPreferences={() => setShowPreferences(true)}/>
        <AppLayout
            content={content}
            headerSelector={'[data-header="header"]'}
            toolsHide={true}
            navigationHide={true}
        />
    </Preferences.Provider>
};

export default App;
