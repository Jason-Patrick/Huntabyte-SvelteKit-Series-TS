// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
import PocketBase from "pocketbase";

declare global {
	namespace App {
		// interface Error {
		// 	code: string;
		// 	id: string;
		// }
		interface Locals {
			user: import('$lib/types').User;
			pb: PocketBase;
		}
		// interface PageData {}
		// interface Platform {}
	}
}
