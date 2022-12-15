

function ShowUsers(prop)
{
    prop.Data.map((item,index)=>{
        return(
            <>
                <div className="user">
                    <h1>Hello</h1>
                    <p className="username">{item.user}</p>
                    <p className="user-email">{item.email}</p>
                </div>
            </>
        )
    })
}
export default ShowUsers;