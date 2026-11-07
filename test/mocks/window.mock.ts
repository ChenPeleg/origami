export class WindowMock {
    private _confirmResponse = true;

    location = {
        origin: 'http://localhost',
        port: '3000',
        href: 'http://localhost:3000/',
    };

    document: Pick<Document, 'documentElement'> = {
        documentElement: {
            classList: {
                toggle: () => false,
            },
        } as unknown as HTMLElement,
    };

    confirm(): boolean {
        return this._confirmResponse;
    }

    setConfirmResponse(response: boolean): void {
        this._confirmResponse = response;
    }
}
