export interface ITela {
    template: string
    render(...args: any[]): void

    getHTML(...args: any[]): string
}