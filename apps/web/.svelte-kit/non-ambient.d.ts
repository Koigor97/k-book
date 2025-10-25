
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/(reception)" | "/(public)" | "/(admin)" | "/" | "/api" | "/api/health" | "/(reception)/check-in" | "/(admin)/dashboard" | "/(admin)/exports" | "/(public)/login" | "/(admin)/metadata" | "/(reception)/queue";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/(reception)": Record<string, never>;
			"/(public)": Record<string, never>;
			"/(admin)": Record<string, never>;
			"/": Record<string, never>;
			"/api": Record<string, never>;
			"/api/health": Record<string, never>;
			"/(reception)/check-in": Record<string, never>;
			"/(admin)/dashboard": Record<string, never>;
			"/(admin)/exports": Record<string, never>;
			"/(public)/login": Record<string, never>;
			"/(admin)/metadata": Record<string, never>;
			"/(reception)/queue": Record<string, never>
		};
		Pathname(): "/" | "/api" | "/api/" | "/api/health" | "/api/health/" | "/check-in" | "/check-in/" | "/dashboard" | "/dashboard/" | "/exports" | "/exports/" | "/login" | "/login/" | "/metadata" | "/metadata/" | "/queue" | "/queue/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/robots.txt" | string & {};
	}
}