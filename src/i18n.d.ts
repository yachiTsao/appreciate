import { DefineComponent } from "vue";
import { ComputedRef } from "vue-i18n";
declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $t(key: string): string;
    $te(key: string): boolean;
    $tc(key: string, choice: number, values?: Record<string, unknown>): string;
    $n(
      value: number | string,
      choice?: number,
      values?: Record<string, unknown>,
    ): ComputedRef<string>;
  }
}
