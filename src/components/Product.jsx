import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Card, CardText, CardBody, CardSubtitle, Button
} from 'reactstrap';
import axios from 'axios';
import { json, useNavigate } from 'react-router-dom';

const Example = (props) => {
    const navigate = useNavigate();
    const [data, setData] = useState([])

    const getdata = async () =>{
        await axios.get('http://localhost:4000/api/product/getdata').then((res) => {
            setData(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate("/product")
            getdata()
        } else {
            navigate("/login")
        }
    }, []);

    const submitBtn = (post) => {
        let obj = {
            token : localStorage.getItem("token"),
            productId: post._id
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        };
        axios.post('http://localhost:4000/api/buyproduct',requestOptions).then((res) => {
        
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <>
            <div class="container mt-5">
                <div class="row">
                    {data.length > 0 && data.map((post) => {
                        return <div class="col-sm">
                            <div>
                                <Card className='border border-dark '>
                                    <CardBody>
                                        <CardSubtitle><h2>{post.name}</h2></CardSubtitle>
                                        <CardText>{post.price}</CardText>
                                        <Button onClick={() => submitBtn(post)}>Buy Product</Button>
                                    </CardBody>
                                </Card>
                            </div>
                        </div>
                    })}
                </div>
            </div>


        </>
    );
};

export default Example;