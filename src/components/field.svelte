<script lang="ts">
    import { getStore } from "../services/store";

    const store = getStore();
    export let field: number[] = [];

    let width = (100 / $store.xAxis!) - 0.5;
    let height = ((100 / $store.xAxis!) / 3) - 0.5;
    let style = `width: ${width}%; height: ${height}vw;font-size: ${height - 1}vw;`;

    function boxValue(n:number){
        let v = n
        if (n > 5){
            v = n - 6
        }
        if(v > 0){
            return v
        }
        return'\xa0'
    }

    function classAsign(n:number){
        if(n == 0){
            return 'water'
        } else if (n > 0 && n < 6){
            return 'ship'
        } else if(n == 6){
            return 'waterHit'
        } else {
            return 'shipHit'
        }
    }

    function xAx (i:number){
        if(i < $store.xAxis!) {
            return i + 1
        }
        return '\xa0'
    }

    function yAx (i:number){
        if(i%$store.xAxis! == 0) {
            return String.fromCharCode('A'.charCodeAt(0) + (i / $store.xAxis!)) 
        }
        return '\xa0' 
    }
</script>

<div class="container">
    <div class="fieldContainer">
        {#each field as b}
            <div class="box {classAsign(b)}" {style}>{boxValue(b)}</div>
        {/each}
    </div>
    <div class="fieldContainer">
        {#each field as b, i}
            <div class="box xAxisBox" {style}>{xAx(i)}</div>
        {/each}
    </div>
    <div class="fieldContainer">
        {#each field as b, i}
            <div class="box yAxisBox" {style}>{yAx(i)}</div>
        {/each}
    </div>
</div>

<style>
    .container {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
    }
    
    .fieldContainer{
        grid-area: 1 / 1 / 1 / 1;
        height: fit-content;
    }

    .box {
        display:inline-block;
        margin: 0.25%;
        border-radius: 7%;
        text-align: center;
        background-color: blanchedalmond;
    }
    
    .xAxisBox{
        background-color: transparent;
        transform: translateY(-100%);
        color:rgb(105, 105, 105);

    }

    .yAxisBox{
        background-color: transparent;
        transform: translateX(-100%);
        color:rgb(105, 105, 105);
    }

    .water {
        background-color:lightblue;
        border: 0.1% cyan;
    }

    .waterHit{
        background-color:royalblue;
        border: 0.1% blue;
    }

    .ship{
        background-color: darkgrey;
        border:  0.1% gray;
    }

    .shipHit{
        background-color: tomato;
        border:  0.1% red;

    }

</style>
