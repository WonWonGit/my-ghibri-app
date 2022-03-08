import {ActionFunction, json, Link, LoaderFunction, redirect, useActionData, useLoaderData, useLocation} from "remix";
import {db} from "~/utils/db.server";



export default function CommentList({comments}:any){
    let url = useLocation();

    return(
        <div className='comment'>
            {
                comments?.map((comment:any) => (
                    <div key={comment.id} className='comment_list'>
                        <div className='comment_cont'>
                            {comment.content}
                        </div>
                        <div className='comment_name'>
                            {comment.name}
                        </div>
                    </div>
                ))
            }
            {
                url.pathname.includes('commentNew') ? null :
                    <div className='comment_btn'>
                    <button>
                        <Link to={'commentNew'}>
                            Make a new Comment!
                        </Link>
                    </button>
                    </div>
            }
        </div>
    );
}