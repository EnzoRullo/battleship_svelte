<script lang="ts">
    import { playerInfo } from "../models/models";

    export let player: playerInfo;
    //export let p2Obj: playerInfo;
    export let field: number[];
    //export let fieldP2: number[];

    let duplicates = Object.entries(player.duplicates).sort(
        ([, a], [, b]) => b - a,
    );

    function notHit(field: number[]) {
        let notHit = 0;
        for (const el of field) {
            if (el > 0 && el < 6) ++notHit;
        }
        return notHit;
    }

    function waterNotHit(field: number[]) {
        let notHit = 0;
        for (const el of field) {
            if (el == 0) ++notHit;
        }
        return notHit;
    }
</script>

{#if player}
    <!--     <div>
        <ul>
            <li>Score: {player.score}</li>
            <li>
                Best hit streak: <br />{player.bestStreak} at {player.lastTurnStreak}
                turn
            </li>
            <li>Ship boxes not hit: {notHit(field)}</li>
            <li>Water boxes not hit:{waterNotHit(field)}</li>
            <li>Duplicates coordinates:</li>
            {#each duplicates as [key, times]}
                <li>{key} : {times} times</li>
            {/each}
        </ul>
    </div> -->

    <div class="row">
        <div class="col-7">Score:</div>
        <div class="col-auto">{player.score}</div>
        <hr />
    </div>
    <div class="row">
        <div class="col-7">Best hit streak:</div>
        <div class="col-auto">
            {player.bestStreak} at {player.lastTurnStreak}
            turn
        </div>
        <hr />
    </div>
    <div class="row">
        <div class="col-7">Ship boxes not hit:</div>
        <div class="col-auto">{notHit(field)}</div>
        <hr />
    </div>
    <div class="row">
        <div class="col-7">Water boxes not hit:</div>
        <div class="col-auto">{waterNotHit(field)}</div>
        <hr />
    </div>
    <div class="row">
        <div class="text-center col mb-2">Duplicates</div>
        <hr />
    </div>
    <div class="row">
        {#each duplicates as [key, times]}
            <div class="col-6 text-center">{key} : {times} times</div>
        {/each}
    </div>
{/if}

