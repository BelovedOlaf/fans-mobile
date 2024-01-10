import EventEmitter from "eventemitter3";
import { useEffect } from "react";

const eventBus = new EventEmitter();

export function useEvent<T>(
	namespace: string,
	event: string,
	callback: (payload: T) => void,
	deps: React.DependencyList = [],
) {
	return useEffect(() => {
		const name = `${namespace}:${event}`;
		eventBus.addListener(name, callback);
		return () => void eventBus.removeListener(name, callback);
	}, [...deps, callback]);
}

export function emitEvent<T>(namespace: string, event: string, payload: T) {
	eventBus.emit(`${namespace}:${event}`, payload);
}
