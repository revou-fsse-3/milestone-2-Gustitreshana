import { Outlet } from "react-router-dom"
import { Navbar } from "../../components"
// import { Card } from "../../components"


const MainLayout = () => {

    return (
        <div>
            <div>
                <Navbar/>
                {/* <Card/> */}
            </div>
           <Outlet/> 
        </div>
    )
}

export default MainLayout