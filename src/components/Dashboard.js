import React, { useEffect,useState } from 'react'
import { Button,Modal, Col, Container, Form, Row } from 'react-bootstrap';
import logo from '../logo.svg';
import '../App.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [allSeats, setAllSeats] = useState([]);
  const [clickedSeat, setClickedSeat] = useState("")
  let accessToken = localStorage.getItem("busSeatBookingAccessToken")
  const handleClose = () => setShow(false);
  const navigate = useNavigate();
  const handleShow = (seatID) => {
    setShow(true);
    // console.log("seatID " ,seatID)
  }
  const getAllSeatOfBus = ()=>{
      var config = {
        method: 'get',
        url: 'http://localhost:4000/api/getBusSeats',
        headers: { 
          'Authorization': accessToken
        }
      };
      axios(config)
      .then(function (response) {
        if(response.data.status){
          setAllSeats(response.data.data);
        }
        else{
          alert("Errror "+response.data.message)
        }
        // console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  const checkStatus = (seat)=>{
    // c
    // console.log("Hi")
    handleShow(seat);
    setClickedSeat(seat)
  }
  const handleBookSeat = ()=>{
    // clickedSeat
    // var axios = require('axios');
    var data = JSON.stringify({
      seatID : clickedSeat.id
    });

    var config = {
      method: 'post',
      url: 'http://localhost:4000/api/bookBusSeat',
      headers: { 
        'Authorization': accessToken, 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then(function (response) {
      // console.log(JSON.stringify(response.data));
      if(response.data.status){
        alert("Booked Success");
        getAllSeatOfBus();
        handleClose();
      }
      else{
        alert("Error "+response.data.message)
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  const handleResetSeat = ()=>{
    var data = JSON.stringify({
      seatID: clickedSeat.id
    });

    var config = {
      method: 'post',
      url: 'http://localhost:4000/api/resetBusSeat',
      headers: { 
        'Authorization': accessToken, 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then(function (response) {
      // console.log(JSON.stringify(response.data));
      if(response.data.status){
        alert("Successfully reset .");
        getAllSeatOfBus();
        handleClose();
      }
      else{
        alert("Error "+response.data.message)
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  }
  const handleLogout = ()=>{
    if(localStorage.getItem("busSeatBookingAccessToken")){
      localStorage.removeItem("busSeatBookingAccessToken");
      navigate("/");
    }
  }
  const checkLoginStatus = ()=>{
    if(!localStorage.getItem("busSeatBookingAccessToken")){
      navigate("/");
    }
  }
  useEffect(()=>{
    checkLoginStatus();
    getAllSeatOfBus();
  },[]);
  return (
    <Container >
    <Row>
      <Col md={3}>
      <img src={logo} height={100} width={100}/>
      </Col>
      <Col md={6} className="text-center">
        {/* <h1>Dashboard</h1> */}
        <h1>Seat Bookings</h1>
      </Col>
      <Col md={3}>
        <br/>
        <a href="#" onClick={handleLogout} className="btn btn-xs btn-primary">Logout </a>
      </Col>
    </Row>
    <Row>
        <Col md={1}></Col>
        <Col md={6}>
        <div>
        <table>
            <tbody>
            <tr >
              {/* seat-booked */}
              {
                allSeats.map((row,index)=>{

                  return(
                        <td className={row.status=='1'?'pe-auto seat-booked':'pe-auto'} onClick={()=>checkStatus(row)} >{row.seatNo} <p>{row.status=='1'?'Unavailable':'Available'}</p></td>
                        )
                      })
                    }
            </tr>
            </tbody>
        </table>
        </div>
        </Col>
        <Col md={1}></Col>
    </Row>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Seat No {clickedSeat.id} Status </Modal.Title>
        </Modal.Header>

        <Modal.Body>Status : {clickedSeat.status==1?'Booked':'Available'} </Modal.Body>
        <Modal.Footer>
          {
            clickedSeat.status==0?
              <Button variant="primary" onClick={handleBookSeat}>
                Book Nows
              </Button>
            :
            <Button variant="danger" onClick={handleResetSeat}>
                Seat Reset 
            </Button>
          }
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
   </Container>
  )
}

export default Dashboard