/***
 * Stores player progress data
 * loads and saves to local storage
 * encodes and decodes data
 */
import { useState, useEffect } from "react";


export const usePlayerProgress = () =>{


    const [unlockFlags, setUnlockFlags] = useState({
        "fishing_boat": true,
        "fisherman": false,
        "fishing_rod": false,
    })

    const [money, setMoney] = useState(2000)
    const [itemInventory, setItemInventory] = useState({})
    
    const addItemToInventory = (item) =>{
        setItemInventory(prev => ({
            ...prev,
            [item]: prev[item] + 1
        }));
    }
    
    const removeItemFromInventory = (item) =>{
        if(itemInventory[item] > 1){
            setItemInventory(prev => ({
                ...prev,
                [item]: prev[item] - 1
            }));
        }
        else{
            setItemInventory(prev => {
                const newInventory = { ...prev };
                delete newInventory[item];
                return newInventory;
            });
        }
    }
    
    const changeMoney = (amount) =>{
        setMoney(prev => prev + amount)
    }

    const changeFlag = (flag, value) =>{    
        setUnlockFlags(prev => ({
            ...prev,
            [flag]: value
        }));
    }
    
    const saveData = () =>{
        var data = encodeData();
        localStorage.setItem("playerProgress", data);
    }

    //runs at start of game once, loads from localStorage.
    const loadData = () =>{
        var data = localStorage.getItem("playerProgress");
        if(data){
            decodeData(data);
        }
    }

    const loadFromFile = (savefile) =>{
        //TODO: Implement
        //decodeData(savefile);
    }

    const encodeData = () =>{
        var data = JSON.stringify(unlockFlags);
        data +="##" + money.toString();
        data += "##" + JSON.stringify(itemInventory);
        return btoa(data);
    }

    const decodeData = (data) => {
        data = atob(data);
        var dataArray = data.split("##");
        setUnlockFlags(JSON.parse(dataArray[0]));
        setMoney(parseInt(dataArray[1]));
        setItemInventory(JSON.parse(dataArray[2]));
    }

    useEffect(() => {
        var data = JSON.stringify(unlockFlags);
        data +="##" + money.toString();
        data += "##" + JSON.stringify(itemInventory);
        localStorage.setItem("playerProgress", btoa(data)); //Exhaustive deps is beyond dumb for functions
    }, [unlockFlags, money, itemInventory]);

    return {
        // State values
        money,
        unlockFlags,
        itemInventory,
        
        // Functions
        changeMoney,
        changeFlag,
        addItemToInventory,
        removeItemFromInventory,
        saveData,
        loadData,
        loadFromFile
    };

}