import { DefineComponent } from 'vue';

declare module 'ts-vue3-number-spinner' {
  export interface Vue3NumberSpinnerProps {
    modelValue: number;
    min: number;
    max: number;
    step: number;
    precision: number;
    speed: number;
    keyStepSlow: number;
    keyStep: number;
    keyStepFast: number;
    decimals: number;
    format: (value: number) => string | undefined;
    parse: (value: string) => number | undefined;
    horizontal: boolean;
    vertical: boolean;
    circular: boolean;
    mainStyle: string | undefined;
    fastStyle: string | undefined;
    slowStyle: string | undefined;
    focusStyle: string | undefined;
    draggingStyle: string | undefined;
    editingStyle: string | undefined;
    cursor: string | undefined;
    options: Record<string, any> | undefined;
  }

  export type Vue3NumberSpinnerEmits = {
    (event: 'consoleLog', value: any): void;
    (event: 'change', value: number): void;
    (event: 'input', value: number): void;
    (event: 'focus'): void;
    (event: 'blur'): void;
    (event: 'dragstart'): void;
    (event: 'dragend'): void;
    (event: 'editstart'): void;
    (event: 'editend'): void;
    (event: 'update:modelValue', value: number): void;
  };

  const NumberSpinner: DefineComponent<Vue3NumberSpinnerProps, {}, any>;

  export default NumberSpinner;
}
