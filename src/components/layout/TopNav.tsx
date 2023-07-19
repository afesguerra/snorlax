import {TopNavigation, TopNavigationProps} from "@cloudscape-design/components";
import {useState} from "react";
import {applyMode, Mode} from "@cloudscape-design/global-styles";


const identity: TopNavigationProps.Identity = {
    title: 'Habitica Graph Portal',
    href: "#",
};

interface TopNavProps {
    readonly showPreferences: () => void;
}

export const TopNav = ({showPreferences}: TopNavProps) => {
    const [darkMode, setDarkMode] = useState(true);
    applyMode(darkMode ? Mode.Dark : Mode.Light);

    return (<TopNavigation data-header={'header'} identity={identity} utilities={[
        {type: "button", iconName: "star-filled", onClick: () => setDarkMode(p => !p)},
        {type: "button", iconName: "settings", onClick: showPreferences},
    ]}/>);
};
