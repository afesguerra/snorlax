import {useState} from "react";
import {Button, Flashbar, Form, FormField, Input, Modal, SpaceBetween} from "@cloudscape-design/components";

export interface PreferenceProps {
    userId?: string;
    apiToken?: string;
}

export interface PreferencesModalProps {
    readonly visible: boolean;
    readonly onClose: () => void;
    readonly pref: PreferenceProps;
    readonly accept: (p: PreferenceProps) => void;
}

export const PreferencesModal = ({visible, onClose, pref, accept}: PreferencesModalProps) => {
    const [localPref, setLocalPref] = useState<PreferenceProps>(pref);

    const save = () => {
        accept(localPref);
        onClose();
    }

    const onDismiss = () => {
        setLocalPref(pref);
        onClose();
    }
    const addInputForPref = (key: keyof PreferenceProps, label: string = key) =>
        <FormField label={label}>
            <Input value={localPref[key] || ""}
                   inputMode={"text"}
                   type={"text"}
                   onChange={({detail}) => setLocalPref(p => ({...p, [key]: detail.value || undefined}))}
            />
        </FormField>;

    const actions = <SpaceBetween size={'m'} direction={'horizontal'}>
        <Button variant={"primary"} onClick={save}>Save</Button>
    </SpaceBetween>;
    return (<Modal visible={visible} onDismiss={onDismiss} header={'Preferences'}>
        <SpaceBetween size={"s"} direction={"vertical"}>
            <Flashbar items={[{
                id: "localStorageUse",
                type: "warning",
                dismissible: false,
                content: "This will save credentials in the browser's local storage for convenience. Use at your own risk"
            }]}/>
            <form onSubmit={e => e.preventDefault()}>
                <Form actions={actions}>
                    {addInputForPref('userId', 'User ID')}
                    {addInputForPref('apiToken', 'API Token')}
                </Form>
            </form>
        </SpaceBetween>
    </Modal>)
}