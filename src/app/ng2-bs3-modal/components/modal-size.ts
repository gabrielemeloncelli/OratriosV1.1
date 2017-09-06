export class ModalSize {
    static Small = 'sm';
    static Large = 'lg';
    static FullScreen = 'fs';

    static validSize(size: string) {
        return size && (size === ModalSize.Small || size === ModalSize.Large || size === ModalSize.FullScreen);
    }
}
