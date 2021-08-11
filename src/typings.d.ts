declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
  }
declare namespace JSX {
    interface IntrinsicElements {
        customButton: any;
    }
  }