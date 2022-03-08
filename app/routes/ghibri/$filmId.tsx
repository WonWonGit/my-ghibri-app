import {LoaderFunction, useLoaderData, Outlet, ActionFunction, redirect, json} from "remix";
import CharacterList from "~/components/characterList";
import fetch from "node-fetch";
import {db} from "~/utils/db.server";
import is from "@sindresorhus/is";
import CommentList from "~/components/commentList";

type peopleType = {
    id:string,
    name:string,
    gender:string
}

type commentType = {
    id:string,
    name:string,
    content:string
}

type LoaderType = {
    id:string,
    title:string,
    original_title:string,
    movie_banner:string,
    description:string,
    director:string,
    rt_score:string,
    people: string[],
    characters?: peopleType[],
    comment?: commentType[]
}

export const loader:LoaderFunction = async ({params}) => {
    const data = await fetch(`https://ghibliapi.herokuapp.com/films/${params.filmId}`);
    const filmDetail:LoaderType = await data.json();
    const characters = await Promise.all(
        filmDetail.people.map((url) => fetch(url).then((res)=>res.json()))
    )
    const comment =  await db.ghibriComment.findMany({
        where:{
            filmId: params.filmId
        }
    })

    return {...filmDetail, characters, comment};
}



export default function RandomId(){
    const filmDetail = useLoaderData<LoaderType>();

    return(
        <div className='detail'>
            <div className='bannerDiv'>
            <img src={filmDetail.movie_banner} />
            <div className='movie-title'>{filmDetail.title}</div>
            </div>
            <div className='movie-detail'>
                <div>{filmDetail.description}</div>
                <div className='summary'>
                    <p>Original Title : {filmDetail.original_title}</p>
                    <p>Director : {filmDetail.director}</p>
                    <p>Rating Score : {filmDetail.rt_score}</p>
                </div>
            </div>
            <div className='component'>
            <CharacterList characters={filmDetail?.characters}/>
                <div className='comment_child'>
                    <CommentList comments={filmDetail?.comment}/>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}