import {TopNavigation, TopNavigationProps} from "@cloudscape-design/components";
import {useState} from "react";
import {applyMode, Mode} from "@cloudscape-design/global-styles";
import snorlax from '../../assets/snorlaxhead.svg'
import github from '../../assets/github.svg'


const identity: TopNavigationProps.Identity = {
    title: 'Snorlax',
    logo: {src: snorlax},
    href: "#",
};

interface TopNavProps {
    readonly showPreferences: () => void;
}

export const TopNav = ({showPreferences}: TopNavProps) => {
    const [darkMode, setDarkMode] = useState(true);
    applyMode(darkMode ? Mode.Dark : Mode.Light);

    return (<TopNavigation data-header={'header'} identity={identity} utilities={[
        {type: "button", iconUrl: github, href: 'https://github.com/afesguerra/snorlax', target: '_blank'},
        {type: "button", iconName: "star-filled", onClick: () => setDarkMode(p => !p)},
        {type: "button", iconName: "settings", onClick: showPreferences},
    ]}/>);
};
