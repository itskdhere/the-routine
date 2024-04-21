type UserChoice = Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
}>;

interface BeforeInstallPromptEvent extends Event {
    readonly platforms: Array<string>;
    readonly userChoice: UserChoice;
    prompt(): Promise<void>;
}

declare global {
    interface WindowEventMap {
        beforeinstallprompt: BeforeInstallPromptEvent;
    }
}

export default BeforeInstallPromptEvent;