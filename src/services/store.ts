import { writable } from "svelte/store";
import { battleShip } from "../models/models";


const initStore: battleShip = new battleShip
let store = writable(initStore)

export function getStore() {
  function numberGenApi(max: number) {
    updateStore({lastOperation : 'CALL RandomNumGen [REQUEST]'});
    fetch(`http://www.randomnumberapi.com/api/v1.0/random?min=0&max=${max}&count=100`)
    .then(res => {
      if (!res.ok){
        updateStore({
          lastOperation : 'CALL RandomNumGen [FAILURE]',
          message : `Error ${res.status}`
        })
        throw new Error('Network error');
      } else {
        updateStore({
          lastOperation : 'CALL RandomNumGen [SUCCESS]',
          message : `Status ${res.status}`
        })

        return res.json()
      }
    })
    .then(data => {
      updateStore({lastOperation : 'UPDATE FireArr [REQUEST]'})
      if (Array.isArray(data) && !data.some(isNaN) && data.length%2 == 0){
        updateStore({
          fireArr: [...data],
          lastOperation: 'UPDATE FireArr [SUCCESS]',
        })
      } else {
          updateStore({
            lastOperation: 'UPDATE FireArr [FAILURE]',
            message: 'Invalid Data'
          })
          throw new Error('Data error');
      }
    })
    .catch( err => console.log(err)); 
  }

  function updateStore(newValue: battleShip){
    store.update(current => current = {
      ...current,
      ...newValue    
    })
  } 

  function fullReset(){
    store.set(initStore)
    updateStore({
      lastOperation : 'RESET FullReset [SUCCESS]',
      message : 'All data has been reset'
    })
  }

  function newGame(): void{
    updateStore({
      fireArr : undefined,
      readyToPlay : true,
      lastOperation : 'RESET NewGame [SUCCESS]',
      message : 'Previous Game data has been reset'
    })
  }

  function initGame(p1:string,p2:string,x:number,y:number){
    updateStore({
      player1: p1,
      player2: p2,
      xAxis : x,
      yAxis : y,
      readyToPlay : true,
      lastOperation: 'SET NewGame [SUCCES]'
    })
  }

  return {
    ...store,
    numberGenApi,
    newGame,
    fullReset,
    initGame
  }

}