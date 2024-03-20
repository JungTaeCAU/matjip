import { Outlet } from "react-router-dom";

function About(){
    return(
        <div>
            <div className="container"> 
                <div className="search-header">
                    <div className="title">
                        검색 및 리스트
                    </div>
                    <div className="subtitle">
                        
                    </div>
                </div>
            </div>
            <Outlet></Outlet>
        </div>
    )
}

export default About;