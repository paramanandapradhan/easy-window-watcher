<script lang="ts">
	import watchWindowValue from '$lib/index.js';
	import { onMount } from 'svelte';

	onMount(() => {
        watchWindowValue('gapi').then((client) => {
			console.log('gapi', client);
		});

		watchWindowValue('google.accounts').then((acc) => {
			console.log('google.accounts', acc);
		});
	});
</script>

<div>
	<h5>See the inspect log</h5>
</div>
