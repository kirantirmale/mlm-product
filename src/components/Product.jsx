import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import img from '../Images/fast-food-meal-set-vector.jpg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout/Layout';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
// import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import { Box } from '@mui/material';
// import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';

const Example = (props) => {
    const navigate = useNavigate();
    const [data, setData] = useState([])

    const getdata = async () => {
        await axios.get('http://localhost:4000/api/product/getdata').then((res) => {
            setData(res.data)
            console.log("res.data", res.data)
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
            token: localStorage.getItem("token"),
            productId: post._id
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        };
        axios.post('http://localhost:4000/api/buyproduct', requestOptions).then((res) => {

        }).catch((error) => {
            console.log(error)
        })
    }
    // const logout = () => {
    //     localStorage.removeItem('token');
    //     // setIsLoggedin(false);
    // };

    return (
        <Layout>
            <>

                <div class="container">
                    <div class="row">
                        {
                            data.length > 0 && data.map((post) => {
                                return (
                                    <Box sx={{ m: 1 }} class='col-3 mb-2' >
                                        <Card sx={{ width: 320 }} class=''>
                                            <div>
                                                <Typography level="title-lg"><h3>{post.name}</h3></Typography>
                                                <Typography level="body-sm">{post.description
                                                }</Typography>

                                            </div>
                                            <AspectRatio minHeight="120px" maxHeight="200px">
                                                <img
                                                    src={img}
                                                    
                                                    
                                                />
                                            </AspectRatio>
                                            <CardContent orientation="horizontal">
                                                <div>
                                                    <Typography level="body-xs">Total price:</Typography>
                                                    <Typography fontSize="lg" fontWeight="lg">
                                                        ${post.price}
                                                    </Typography>
                                                </div>
                                                <Button
                                                    variant="solid"
                                                    size="md"
                                                    color="primary"
                                                    aria-label="Explore Bahamas Islands"
                                                    sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                                                    onClick={() => submitBtn(post)}
                                                >
                                                    BUY PRODUCT
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </Box>
                                )

                                // <div class="col-sm">
                                //     <div>
                                //         <Card className='border border-dark text-center'>
                                //             <CardBody>
                                //                 <CardSubtitle><h1>{post.name}</h1></CardSubtitle>
                                //                 <CardText><h6> Rs,{post.price}</h6></CardText>
                                //                 <Button onClick={() => submitBtn(post)}>Buy Product</Button>
                                //             </CardBody>
                                //         </Card>
                                //     </div>
                                // </div>
                            })
                        }
                    </div>
                </div>
            </>
        </Layout>
    );
};

export default Example;