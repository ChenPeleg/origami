export class WindowMock {
    private _confirmResponse = true;

    location = {
        origin: 'http://localhost',
        port: '3000',
        href: 'http://localhost:3000/',
    };

    document: Pick<Document, 'documentElement' | 'title'> = {
        title: '',
        documentElement: {
            lang: '',
            dir: '',
            classList: {
                toggle: () => false,
            },
        } as unknown as HTMLElement,
    };

    navigator: Pick<Navigator, 'language'> = { language: 'en-US' };

    scrollTo(): void {}

    confirm(): boolean {
        return this._confirmResponse;
    }

    setConfirmResponse(response: boolean): void {
        this._confirmResponse = response;
    }
}
