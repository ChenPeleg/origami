export class AppDataMock {
    constructor() {}
    getAppData() {
        return {} as any;
    }

    static paginated<T extends Record<any, any>>(data: Array<T>) {
        return {
            count: data.length,
            next: null,
            previous: null,
            results: data,
        };
    }
}
