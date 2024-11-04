<script lang="ts">
    import { afterUpdate, onMount } from "svelte";
    import { getStore } from "../services/store";
    import { goto } from "$app/navigation";

    export const store = getStore();

    export let p1: string = "";
    export let p2: string = "";
    export let xAxis: number = 0;
    export let yAxis: number = 0;

    onMount(() => {
        $store.player1 ? (p1 = $store.player1) : (p1 = "");
        $store.player2 ? (p2 = $store.player2) : (p2 = "");
        $store.xAxis ? (xAxis = $store.xAxis) : (xAxis = 0);
        $store.yAxis ? (yAxis = $store.yAxis) : (yAxis = 0);
    });

    afterUpdate(() => {
        if($store.lastOperation ==='SET NewGame [SUCCES]' && $store.readyToPlay){
            goto('/game')
        }
    });

    function confirm() {
        if (
            p1.length > 2 &&
            p2.length > 2 &&
            xAxis > 4 &&
            yAxis > 4 &&
            yAxis < 27
        ) {
            store.initGame(p1, p2, xAxis, yAxis);
        } else {
            alert(
                "Names must be at least 3 characters and axes (X,Y) must be grater than 4",
            );
            return;
        }
    }
</script>

<h1>The automatic Battleship game</h1>
<p>Insert player Names and field measurements</p>

<div class="container">
    <label for="Player2">Player 1</label>
    <input name="Player2" type="text" bind:value={p1} />
    <label for="Player2">Player 2</label>
    <input name="Player2" type="text" bind:value={p2} />
    <label for="X">X axis</label>
    <input name="X" type="number" bind:value={xAxis} />
    <label for="Y">Y axis</label>
    <input name="Y" type="number" bind:value={yAxis} />
    <button on:click|preventDefault={confirm}>CONFIRM</button>
</div>

<style>
    :global(*) {
        font-family: monospace;
    }

    .container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        width: 25%;
        gap: 5%;
    }
</style>
