<script lang="ts">
    import { afterUpdate, onMount } from "svelte";
    import { getStore } from "../services/store";
    import { goto } from "$app/navigation";

    export const store = getStore();

    export let p1: string = "";
    export let p2: string = "";
    export let xAxis: number = 0;
    export let yAxis: number = 0;
    export let invalid: boolean = false;

    onMount(() => {
        $store.player1 ? (p1 = $store.player1) : (p1 = "");
        $store.player2 ? (p2 = $store.player2) : (p2 = "");
        $store.xAxis ? (xAxis = $store.xAxis) : (xAxis = 0);
        $store.yAxis ? (yAxis = $store.yAxis) : (yAxis = 0);
    });

    afterUpdate(() => {
        if (
            $store.lastOperation === "SET NewGame [SUCCES]" &&
            $store.readyToPlay
        ) {
            goto("/game");
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
            invalid = false
            store.initGame(p1, p2, xAxis, yAxis);
        } else {
            invalid = true
            return;
        }
    }
</script>

<h1 class="text-center p-4">The automatic Battleship game</h1>
<p class="text-center m-0">Insert player Names and field measurements</p>

<form class="container homeContainer" on:submit|preventDefault={confirm}>
    <div class="form-floating row p-2">
        <input
            name="Player1"
            type="text"
            class="form-control col"
            placeholder="name"
            bind:value={p1}
        />
        <label for="Player1">Player 1</label>
    </div>
    <div class="form-floating row p-2">
        <input
            name="Player2"
            type="text"
            class="form-control col"
            placeholder="name"
            bind:value={p2}
        />
        <label for="Player2">Player 2</label>
    </div>
    <div class="row p-1">
        <div class="form-floating col p-1">
            <input
                name="X"
                type="number"
                class="form-control"
                placeholder="x"
                bind:value={xAxis}
            />
            <label for="X">X axis</label>
        </div>
        <div class="form-floating col p-1">
            <input
                name="Y"
                type="number"
                class="form-control"
                placeholder="y"
                bind:value={yAxis}
            />
            <label for="Y">Y axis</label>
        </div>
    </div>
    <div class="row p-2">
        <button type="submit" class="btn btn-primary p-2">CONFIRM</button>
    </div>
    {#if invalid}
        <div class="alert alert-danger">
            • Names must be at least 3 characters<br />
            • Axes (X,Y) must be min 4 and max 27
        </div>
    {/if}
</form>

<style>
    :global(*) {
        font-family: monospace;
    }

    .homeContainer {
        /* display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 5%; */
        width: 33%;
        margin: 0 auto;
        
    }
</style>
