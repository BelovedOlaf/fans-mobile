import { emitEvent, useEvent } from "@helper/EventBus";

interface IMessageEvent {}

export function useMessageEvent(
	callback: (payload: IMessageEvent) => void,
	deps: React.DependencyList = [],
) {
	return useEvent("chat", "message", callback, deps);
}

export function emitMessageEvent(payload: IMessageEvent) {
	emitEvent("chat", "message", payload);
}
