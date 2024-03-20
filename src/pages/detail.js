import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { tab } from "@testing-library/user-event/dist/tab";
import { addItem } from "../store";
import { useDispatch, } from "react-redux";

function Detail(props) {

    let [alert,setAlert] = useState(true);
    let [tab,setTab] = useState(0);
    let dispatch = useDispatch();


    useEffect(()=>{
        let a = setTimeout( ()=>{
            setAlert(false);
        },2000)
        return ()=>{
            clearTimeout(a)
        }
    },[])

    
    let {id} = useParams();
    let searchedItem = props.shoes.find(function(x){
        return x.id == id;
    });

    if(searchedItem){
        return(
            <div className="container">
                {
                    alert == true 
                    ? <div className="alert alert-warning">
                        2초 안에 구매 하면 할인
                    </div>
                    : null
                }
                <div className="row">
                    <div className="col-md-6">
                        <img src={"https://codingapple1.github.io/shop/shoes"+(searchedItem.id+1)+".jpg"} width={"100%"} />
                    </div>
                    <div className="col-md-6">
                        <h4 className="pt-5">{searchedItem.title}</h4>
                        <p>{searchedItem.content}</p>
                        <p>{searchedItem.price}</p>
                        <button className="btn btn-danger" onClick={()=>{
                            dispatch(addItem(  {id : 1, name : 'Red Knit', count : 1} ));
                        }}>주문하기</button>
                    </div>
                </div>
                <Nav variant="tabs"  defaultActiveKey="link0">
                    <Nav.Item>
                    <Nav.Link eventKey="link0" onClick={()=>{setTab(0)}}>버튼0</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="link1" onClick={()=>{setTab(1)}}>버튼1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="link2" onClick={()=>{setTab(2)}}>버튼2</Nav.Link>
                    </Nav.Item>
                </Nav>
                <TabContent tab={tab}></TabContent>
            </div>

        )
    } else {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6" >
                        <h4>찾을 수 없는 상품입니다.</h4>
                    </div>
                </div>
            </div>
        )
    }
}

function TabContent(props){
    if(props.tab == 0){
        return <div>내용0</div>
    } else if(props.tab == 1){
        return <div>내용1</div>
    } else if(props.tab == 2){
        return <div>내용2</div>
    }
    
}
export default Detail;