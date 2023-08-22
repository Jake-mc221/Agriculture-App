
export default function Login() {

    return (
        <main className="w-full h-screen flex items-center justify-center bg-white">
            
            <form className="grid gap-4 mb-6 md:grid-cols-1 flex-initial w-64">
                <input type="text" placeholder="Email" className="text-gray-600 bg-gray-50 border text-sm rounded-lg p-2.5"/>
                <input type="text" placeholder="Password" className="text-gray-600 bg-gray-50 border text-sm rounded-lg p-2.5"/>
                <div className="pt-32">
                    <button type="submit" className="text-white bg-green-600 hover:bg-green-800 rounded-full text-sm w-full px-5 py-2.5">Login</button>
                </div>
                <label 
                    className="text-green-600 text-sm text-center">Forgot your password?
                </label> 
            </form>
      </main>
    )
}