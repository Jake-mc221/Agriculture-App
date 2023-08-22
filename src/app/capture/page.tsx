export default function Home(){

    return(
        <main className="w-full h-screen flex items-center justify-center bg-white">

    <div className="flex flex-col gap-2">

        <div className="border h-40 w-40 text-black flex justify-center items-center">
            Capture App
        </div>

        
        <label >Crop Type
            <select>
                <option>Crop1</option>
                <option>Crop2</option>
                <option>Crop3</option>


            </select>
            </label>
            <br></br>
        <label>Soil Type

            <select>
           
                <option>Crop1</option>
                <option>Crop2</option>
                <option>Crop3</option>

            </select> 
            
            </label>

            <a href="/"> Home Page</a>
            </div>

            
        
        </main>




    );

}