import Form from './form';
import Tiptap from './tiptap'

export default function Page():JSX.Element{
    return(
        <div className = "space-y-8 container mx-auto w-[90%] px-auto my-8">
            <Form/>
        </div>
    )
}