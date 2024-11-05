<script lang="ts">
    import { afterUpdate, onMount } from "svelte";
    import { getStore } from "../../services/store";
    import { goto } from "$app/navigation";
    import { playerInfo } from "../../models/models";
    import { shipPlacing } from "../../components/placing";
    import { gamePlay, getTurn } from "../../components/fire";
    import Field from "../../components/field.svelte";
    import Gameover from "../../components/gameover.svelte";

    const store = getStore();

    const ships = [5, 4, 3, 2, 1]; //lengths of each ship
    let playersReady: number = 0;

    let fieldP1: number[] = [];
    let fieldP2: number[] = [];

    let turns: number = 0;
    let p1FireArr: number[] = [];
    let p2FireArr: number[] = [];

    let p1Obj = new playerInfo();
    let p2Obj = new playerInfo();

    let gameOver = false;

    afterUpdate(() => {
        if (
            $store.lastOperation === "UPDATE FireArr [SUCCESS]" &&
            playersReady == 2
        ) {
            p1FireArr = [];
            p2FireArr = [];
            p1FireArr = $store.fireArr!.slice(0, $store.fireArr!.length / 2);
            p2FireArr = $store.fireArr!.slice($store.fireArr!.length / 2);
            if (
                gamePlay(
                    fieldP1,
                    fieldP2,
                    p1Obj,
                    p2Obj,
                    p1FireArr,
                    p2FireArr,
                    turns,
                    ships,
                    $store,
                ) == "GameOver"
            ) {
                gameOver = true;
                turns = getTurn();
                p1Obj = { ...p1Obj };
                fieldP1 = [...fieldP1];
                p2Obj = { ...p2Obj };
                fieldP2 = [...fieldP2];
            } else {
                turns = getTurn();
                console.log("numgen called again");
                store.numberGenApi($store.xAxis! * $store.yAxis!);
            }
        }
        if ($store.lastOperation === "RESET NewGame [SUCCESS]") {
            placing();
        }
        if ($store.lastOperation === "RESET FullReset [SUCCESS]") {
            placing();
        }
    });

    onMount(() => {
        placing();
    });

    function placing() {
        if (!$store.readyToPlay) {
            goto("/");
        } else {
            reset();
            if (shipPlacing(fieldP1, ships, $store)) ++playersReady;
            if (shipPlacing(fieldP2, ships, $store)) ++playersReady;

            if (playersReady == 2) {
                console.log("num gen 1st time"); //------->log
                store.numberGenApi($store.xAxis! * $store.yAxis!);
            } else {
                console.log("players not ready", playersReady);
            }
        }
    }

    function reset() {
        playersReady = 0;
        for (let a = 0; a < $store.xAxis! * $store.yAxis!; ++a) {
            fieldP1[a] = 0;
        }
        for (let a = 0; a < $store.xAxis! * $store.yAxis!; ++a) {
            fieldP2[a] = 0;
        }
        turns = 0;
        p1FireArr = [];
        p2FireArr = [];

        p1Obj = new playerInfo();
        p2Obj = new playerInfo();

        gameOver = false;
    }

    function newGame() {
        store.newGame();
    }

    function goHome() {
        store.fullReset();
    }
</script>

<div class="bigContainer">
    <h2 class="playerName1">{$store.player1}</h2>
    <h2 class="playerName2">{$store.player2}</h2>
    <div class="fieldContainer p1">
        <Field bind:field={fieldP1} />
    </div>
    <div class="fieldContainer p2">
        <Field bind:field={fieldP2} />
    </div>
</div>

{#if gameOver}
    <h1 class="text-center">
        Game Over
        {#if p1Obj.score > p2Obj.score}
            <b>{$store.player1}</b> win!
        {:else if p1Obj.score < p2Obj.score}
            <b>{$store.player2}</b> win!
        {:else}
            <b>we have no winners...</b>
        {/if}
    </h1>
    <div class="buttonContainer m-4">
        <button class="btn btn-primary p-3" on:click={newGame}>
            New game
        </button>
        <button class="btn btn-primary p-3" on:click={goHome}> Home </button>
    </div>
    <h3 class="text-center">Game finish in {turns} turns</h3>
    <div class="bigContainer">
        <div class="p1 card p-4">
            <Gameover bind:field={fieldP1} bind:player={p1Obj} />
        </div>
        <div class="p2 card p-4">
            <Gameover bind:field={fieldP2} bind:player={p2Obj} />
        </div>
    </div>
{:else}
    <div class="text-center">
        <div class="spinner-border text-primary" style="width: 10rem; height: 10rem;" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
{/if}

<style>
    .bigContainer {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: auto auto;
        height: fit-content;
        margin-top: 25px;
        margin-bottom: 25px;
    }
    .playerName1 {
        grid-column: 1;
        justify-self: center;
        margin: 0;
        height: 10vw;
    }
    .playerName2 {
        grid-column: 3;
        justify-self: center;
        margin: 0;
        height: 10vw;
    }

    .fieldContainer {
        display: inline-block;
    }
    .p1 {
        grid-area: 2 / 1 / 2 / 1;
        transform: translate(33%);
        height: fit-content;
    }

    .p2 {
        grid-area: 2 / 3 / 2 / 3;
        transform: translate(-23%);
        height: fit-content;
    }

    h1,
    h3 {
        text-align: center;
    }

    .buttonContainer {
        display: flex;
        justify-content: center;
        gap: 10px;
    }
</style>
