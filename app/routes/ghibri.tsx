import {LinksFunction, LoaderFunction, Outlet} from "remix";
import detailStyle from "~/styles/detailStyle.css";

type LoaderType = {
    id:string,
    title:string,
    original_title:string,
    image:string,
    description:string,
    director:string,
    rt_score:string,
    people:Array<string>
}

export const loader:LoaderFunction = async ({params}) => {
    const data = await fetch(`https://ghibliapi.herokuapp.com/films/${params.filmId}`);
    const filmDetail:LoaderType = await data.json();
    console.log(data);
    return filmDetail;
}

export const links:LinksFunction = () => {
    return[{rel:"stylesheet", href:detailStyle}];
}

const Ghibri = () => {
  return(
      <div>
        <Outlet />
      </div>
  );
}
export default Ghibri;