export default function Home(){

    return(
        <main className="w-full h-screen flex items-center justify-center bg-white">

    <div className="flex flex-col gap-2">

        <div className="border h-40 w-40 text-black flex justify-center items-center">
            Capture App
        </div>

        
        <label className="border bg-green-400 p-2">Crop Type
            <select className="pl-6">
                <option>Crop1</option>
                <option>Crop2</option>
                <option>Crop3</option>


            </select>
            </label>
            
        <label className="border bg-green-400 p-2">Soil Type

            <select className="">
           
                <option>Crop1</option>
                <option>Crop2</option>
                <option>Crop3</option>

            </select> 
            
            </label>

            <a href="/" className="pt-6"> Home Page</a>
            </div>

            
        
        </main>




    );

}