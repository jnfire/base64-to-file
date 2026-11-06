import type { InjectionKey } from 'vue';
import type { DecoderState } from './useBase64Converter';
import type { EncoderState } from './useFileEncoder';

/** The state of both directions is created once, in App.vue, and provided with these keys. */
export const decoderKey: InjectionKey<DecoderState> = Symbol('decoder');
export const encoderKey: InjectionKey<EncoderState> = Symbol('encoder');
