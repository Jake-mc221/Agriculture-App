import {useId} from 'react';

function TextInput({content, }: {content: string}) {
    return (
        <input type="text" placeholder={content} className="bg-gray-100 p-3 rounded ring-1 ring-gray-200"></input>
    );
}

export default function SignUp() {
    const id = useId();
    return (
    <>
    <div className="text-4xl">Sign Up</div>
    <form className="w-5/6 flex flex-col gap-y-5">
        <TextInput content="Name"></TextInput>
        <TextInput content="Email"></TextInput>
        <TextInput content="Password"></TextInput>
        <div className="flex gap-x-2"> 
            <input type="checkbox" id={id} name={id}></input>
            <label htmlFor={id}>I agree to the terms & conditions</label>
        </div>
    </form>
    </>
    );
}