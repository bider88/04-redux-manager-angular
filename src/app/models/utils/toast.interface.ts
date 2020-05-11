type themeType = 'light' | 'dark';
type colorType = 'blue' | 'red' | 'green' | 'yellow';
type postionType = 'bottomRight' | 'bottomLeft' | 'topRight' | 'topLeft' | 'topCenter' | 'bottomCenter' | 'center';

export interface ToastInterface {
  title: string;
  message: string;
  theme?: themeType;
  color?: colorType;
  position?: postionType;
  timeout?: number;
  onOpening?(...args): any;
  onOpened?(...args): any;
  onClosing?(...args): any;
  onClosed?(...args): any;
}
