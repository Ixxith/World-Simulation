import e from "express";
import { Biome, Country, Town, Location, Race, Person, resetCount, changeSeed } from "./Classes";

function ra(array : Array<any>) : any {
    return array[Math.floor(Math.random() * array.length)];
};



const biomes : Array<Biome> = [new Biome("Plains"), new Biome("Snow"), new Biome("Forest"), new Biome("Desert"), new Biome("Coastal")];
const races : Array<Race> = [new Race("Human"), new Race("Elf"), new Race("Dwarf")]
let countries : Array<Country> = []

function generateDataString() : string {
    let dataString : string = ""
    for (const country of countries) {
         dataString += printProperties(country);

        

        for (const town of country.Towns) {
            dataString += "<br/><br/>";
            dataString += printProperties(town);

            dataString += '<button style="addCitizenToTown" id="addcitizens_' + town.TownId + '"> Add 10 citizens </button><br/><br/>';
            
            for (const person of town.Occupants) {
                dataString += printProperties(person);
                dataString += "<br/><br/>";
            };	
        };
    };
    return dataString;
}

export function generate(seed : string='seed') : string {
    changeSeed(seed);
    resetCount();
    let locationDict : {[key : number] : Location} = {};
    let country = new Country();
    countries.push(country)
    let town = new Town(country, ra(biomes));
    locationDict[town.LocationId] = town;

    for (let i = 0; i < 10; i++) {
        new Person(country, town, ra(races));
    };

    let dataString : string = printProperties(country);

    dataString += "<br/><br/>";

    dataString += printProperties(town);

    dataString += '<button style="addCitizenToTown" id="addcitizens_' + town.TownId + '"> Add 10 citizens </button><br/><br/>';
    
    for (const person of town.Occupants) {
        dataString += printProperties(person);
        dataString += "<br/><br/>";
    };	
    
    return dataString;
};

export function addCitizenToTown(townId : number) {
    let town = null;
    for (const country of countries) {
        town = country.getTown(townId);
        if (town != null) {
            break;
        }
    }

    if (town != null) {
        
    }
}


function printProperties(obj : Object, dataString: string="", indents: number=0) : string {
    for (const [k, v] of Object.entries(obj)) { 
        dataString += `<p>`;
        for (let i = 0; i < indents; i++) {
            dataString += '&nbsp;&nbsp;&nbsp;&nbsp;';
        };
        dataString += `<b>${k}:</b>`
        if (typeof(v) == 'object') {
            if (v.Key != undefined) {
                dataString += ` ${v.Key} </p>`;
            }
            else {
                dataString += `</p>`;        
                dataString = printProperties(v, dataString, indents+1);
            }
            
        }
        else {
            dataString += ` ${v} </p>`;
        };
        
        
    }
    return dataString;
};




