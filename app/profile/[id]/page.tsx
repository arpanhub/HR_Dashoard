export default function ProfilePage({params}:any){
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h3 className="text-2xl ">Profile</h3>
            <hr/>
            <p>Profile page
                <span className=" p-1 font-bold bg-amber-600 ml-2 rounded">{params.id}</span>
            </p>
        </div>
    )
}