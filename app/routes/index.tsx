import {Link, LinksFunction, LoaderFunction, useLoaderData} from "remix";
import filmListStyle from "~/styles/filmListStyle.css";


type LoaderList = {
    filmList: Array<{id:string, original_title:string, image:string}>
}

export const loader:LoaderFunction = async () =>{
    const data = await fetch(`https://ghibliapi.herokuapp.com/films`);
    const films:LoaderList = {
        filmList: await data.json()
    }
    return films;
}

export const links:LinksFunction = () => {
    return[{rel:"stylesheet", href:filmListStyle}];
}

const Index = () => {
    const data = useLoaderData<LoaderList>();
    return(
        <div className='wrap'>
            {data.filmList.map((film) => (

                <div key={film.id} className='filmList'>
                    <Link to={`ghibri/${film.id}`}>
                        <div className='img'>
                            <img src={film.image}/>
                        </div>
                        <div className='filmTitle'>{film.original_title}</div>
                    </Link>
                </div>
            ))}
        </div>
    );
}
export default Index;