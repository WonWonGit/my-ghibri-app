import {LoaderFunction, useCatch, useLoaderData} from "remix";
import fetch from "node-fetch";
import {useEffect, useRef} from "react";

type characterDetail = {
    id:string,
    name:string,
    gender:string,
    age:string
    eye_color:string,
    hair_color:string
}

export const loader:LoaderFunction = async ({params}) => {
    const data = await fetch(`https://ghibliapi.herokuapp.com/people/${params.characterId}`);

    if(!data.ok){
        throw new Response("Sorry...! we can't find Character's information..!", {status: 404});
    }

    const detail:characterDetail = await data.json();
    return detail;
}

export default function RandomCharacter(){

    const data = useLoaderData<characterDetail>();
    return(
        <div className='character_info' >
            <div>Gender : {data.gender}</div>
            <div>Age : {data.age}</div>
            <div>Eye Color : {data.eye_color}</div>
            <div>Hair Color : {data.hair_color}</div>
        </div>
    )
}

export function CatchBoundary(){
    const caught = useCatch();
    if(caught.status == 404){
        return (
            <div className='catch'>{caught.data}</div>
        );
    }else{
        throw new Error('Error!!');
    }
}

export function ErrorBoundary({error}:any){

    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width,initial-scale=1" />
        </head>
        <body>
        {error.message}
        </body>
        </html>
    );
}