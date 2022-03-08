import {ActionFunction, json, LoaderFunction, redirect, useActionData, useLocation} from "remix";
import {db} from "~/utils/db.server";


const validationName = (name:string) => {
    if(name == ''){
        return 'You should enter your name:D';
    }
}

const validationContent = (content:string) => {
    if(content == ''){
        return 'You should enter your comment:D';
    }
}

type ActionData = {
    formError? :string,
    fieldErrors? : {
        name: string | undefined;
        content: string | undefined;
    }
    fields?:{
        name:string;
        content:string;
    }
}

const badRequest = (data:ActionData) => json(data,{status:400});

export const action: ActionFunction = async ({request}) => {

    let form = await request.formData();
    let name = form.get('name');
    let content = form.get('content');
    let filmId = form.get('filmId');

    if(typeof name !== "string" || typeof content !== "string" || typeof filmId !== "string"){
        throw new Error('submit error');
    }

    const fieldErrors = {
        name: validationName(name),
        content: validationContent(content)
    }

    let fields = {name, content, filmId };

    if(Object.values(fieldErrors).some(Boolean)){
        console.log('bad!');
        return badRequest({fieldErrors, fields});
    }

    let comment = await db.ghibriComment.create({data:fields});

    return redirect(`/ghibri/${comment.filmId}`);

};


export default function CommentNew () {
    const action = useActionData();
    const url = useLocation();
    const filmId = url.pathname.substring(url.pathname.lastIndexOf('/'), url.pathname.indexOf('/',2)+1);

    return(
        <form method="post">
            <div className='form_div'>
                <div>
                    <label>name</label>
                </div>
                    <input type='text' name='name' defaultValue={action?.fields?.name}/>
                {action?.fieldErrors?.name && (<p>{action.fieldErrors.name}</p>)}
            </div>
            <div className='form_div'>
                <div>
                <label>content</label>
                </div>
                <textarea name='content' defaultValue={action?.fields?.content} />
                {action?.fieldErrors?.content && (<p>{action.fieldErrors.content}</p>)}
            </div>
            <input type='hidden' name='filmId' value={filmId} readOnly={true}/>
            <div>
            <button type='submit'>add</button>
            </div>
         </form>
        )
}