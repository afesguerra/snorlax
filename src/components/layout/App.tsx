import React, {useState} from 'react';
import "@cloudscape-design/global-styles/index.css"
import {AppLayout, ContentLayout, Header} from "@cloudscape-design/components";
import {PreferenceProps, PreferencesModal} from "./PreferencesModal";
import {TopNav} from "./TopNav";
import {TaskHistory} from "../TaskHistory";
import {API, HabiticaAPI} from "../../api/HabiticaAPI";

const userIdKey = "habitica-userId";
const apiTokenKey = "habitica-apiToken";

const initialProps: PreferenceProps = {
    userId: localStorage.getItem(userIdKey) || undefined,
    apiToken: localStorage.getItem(apiTokenKey) || undefined,
}

const App = () => {
    const [showPreferences, setShowPreferences] = useState(false);
    const [preferences, setPreferences] = useState<PreferenceProps>(initialProps);

    const savePreferences = (pref: PreferenceProps) => {
        setPreferences(pref);
        pref.userId && localStorage.setItem(userIdKey, pref.userId);
        pref.apiToken && localStorage.setItem(apiTokenKey, pref.apiToken);
    }

    const api = (preferences.userId && preferences.apiToken && new HabiticaAPI({
        userId: preferences.userId,
        apiToken: preferences.apiToken,
    })) || undefined;

    const content = api ? <API.Provider value={api}>
        <ContentLayout disableOverlap={true}>
            <TaskHistory/>
        </ContentLayout>
    </API.Provider> : <Header>Must provide credentials</Header>;

    return <>
        <PreferencesModal
            visible={showPreferences}
            onClose={() => setShowPreferences(false)}
            pref={preferences}
            accept={savePreferences}/>
        <TopNav showPreferences={() => setShowPreferences(true)}/>
        <AppLayout
            content={content}
            headerSelector={'[data-header="header"]'}
            toolsHide={true}
            navigationHide={true}
        />
    </>
};

export default App;
