import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout/Layout';
// import { Container, Table } from 'reactstrap';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import './App.css';

const Admin = (props) => {
  const navigate = useNavigate();
  const [data, setData] = useState([])
  console.log("data", data)



  const getdata = async (data) => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };

    let result = await axios.get('http://localhost:4000/api/user/getdata', requestOptions).then((res) => {
      setData(res.data)
      localStorage.setItem('token', result.token)
      console.log("res.data", res.data)
      navigate('/admin')
    }).catch((error) => {
      console.log(error)
    })
    //  if (result.status == true) {


    //  } else {
    //    alert(result.message)
    //  }
  }
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate("/admin")
      getdata()
    } else {
      navigate("/home")
    }
  }, []);
  return (<Layout>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">NAME</TableCell>
            <TableCell align="right">EMAIL</TableCell>
            <TableCell align="right">password</TableCell>
            <TableCell align="right">userid</TableCell>
            <TableCell align="right">role</TableCell>
            <TableCell align="right">coupon</TableCell>
            <TableCell align="right">sponsorCode</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.length > 0 && data.map((v, i) => (
              <TableRow
                key={i.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right">{v._id}</TableCell>
                <TableCell align="right">{v.username}</TableCell>
                <TableCell align="right">{v.email}</TableCell>
                <TableCell align="right">{v.password}</TableCell>
                <TableCell align="right">{v.userid}</TableCell>
                <TableCell align="right">{v.role}</TableCell>
                <TableCell align="right">{v.coupon}</TableCell>
                <TableCell align="right">{v.sponsorCode}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>



    {/* <Container>
      <Table className='mt-5'>

        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>password</th>
            <th>userid</th>
            <th>role</th>
            <th>coupon</th>
            <th>sponsorCode</th>
          </tr>
        </thead>
        <tbody>
          {
            data.length > 0 && data.map((v, i) => {
              return (
                <tr key={i}>
                  <td>{v._id}</td>
                  <td>{v.username}</td>
                  <td>{v.email}</td>
                  <td>{v.password}</td>
                  <td>{v.userid}</td>
                  <td>{v.role}</td>
                  <td>{v.coupon}</td>
                  <td>{v.sponsorCode}</td>
                </tr>
              );
            })
          }
        </tbody>
      </Table>
    </Container> */}

  </Layout>
  );
}

export default Admin;
