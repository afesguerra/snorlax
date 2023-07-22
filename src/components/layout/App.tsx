import React, {useState} from 'react';
import "@cloudscape-design/global-styles/index.css"
import {AppLayout, ContentLayout} from "@cloudscape-design/components";
import {PreferenceProps, Preferences} from "../ctx/Preferences";
import {PreferencesModal} from "./PreferencesModal";
import {TopNav} from "./TopNav";
import {TaskHistory} from "../TaskHistory";

const userIdKey = "habitica-userId";
const apiTokenKey = "habitica-apiToken";

const initialProps: PreferenceProps = {
    userId: localStorage.getItem(userIdKey) || undefined,
    apiToken: localStorage.getItem(apiTokenKey) || undefined,
}

const App = () => {
    const [showPreferences, setShowPreferences] = useState(false);
    const [preferences, setPreferences] = useState<PreferenceProps>(initialProps);

    const mergePreferences = (pref: Partial<PreferenceProps>) => {
        setPreferences(prev => Object.assign(prev, pref));
        pref.userId && localStorage.setItem(userIdKey, pref.userId);
        pref.apiToken && localStorage.setItem(apiTokenKey, pref.apiToken);
    }

    const content = <ContentLayout disableOverlap={true}>
        <TaskHistory/>
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
