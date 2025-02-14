import { unref, watch, onBeforeUnmount, type Ref } from 'vue';

const noop = () => {};

/**
 * Custom event listener hook.
 * @param target - The event target, can be a ref or a raw DOM element.
 * @param event - The event type (e.g., "click", "mousemove").
 * @param listener - The event listener function.
 * @param options - Event listener options.
 * @returns A function to stop the event listener.
 */
export function useEventListener<T extends keyof HTMLElementEventMap>(
    target: Ref<EventTarget | null> | EventTarget | null | undefined,
    event: T,
    listener: (this: EventTarget, ev: HTMLElementEventMap[T]) => void,
    options?: boolean | AddEventListenerOptions
): () => void {
    if (!target) return noop;

    let cleanup = noop;

    const stopWatch = watch(
        () => unref(target),
        (el) => {
            cleanup();
            if (!el) return;

            el.addEventListener(event, listener as EventListener, options);

            cleanup = () => {
                el.removeEventListener(event, listener as EventListener, options);
                cleanup = noop;
            };
        },
        { immediate: true, flush: 'post' }
    );

    const stop = () => {
        stopWatch();
        cleanup();
    };

    onBeforeUnmount(stop);

    return stop;
}
