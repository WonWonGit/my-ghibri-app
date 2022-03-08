import {Link, LoaderFunction, useCatch} from "remix";


export default function CharacterList({characters}:any){
    console.log(characters,'ffff');
    return(
        <div className='character'>
            <ul>
            {
                characters.map((character:any) => (
                    <li key={character.id}>
                        <div>
                        <Link to={`characters/${character.id}`}>
                            <p>{character.name}</p>
                        </Link>
                        </div>
                    </li>
                ))
            }
            </ul>
        </div>
    );
}
