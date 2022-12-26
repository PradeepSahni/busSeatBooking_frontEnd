import React  from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import logo from '../logo.svg';
import { useFormik } from 'formik';
import { signInSchema } from '../schema';
import axios from 'axios';
const initialValues = {
    email: "",
    password :""
}
const Login = () => {
    const navigate = useNavigate();
    const loginUser = (sData)=>{
        var data = JSON.stringify(sData);
        var config = {
        method: 'post',
        url: 'http://localhost:4000/api/login',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };
        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            if(response.data.status){
                localStorage.setItem("busSeatBookingAccessToken",response.data.data.token)
                alert("Success");
                navigate("/dashboard");
            }
            else{
                alert("Errror "+response.data.message)
            }
            
        })
        .catch(function (error) {
            // console.log(error);
            alert("Errror "+error.message)
        });

    }
    const {values,errors,handleBlur,handleChange,handleSubmit,touched} = useFormik({
        initialValues: initialValues,
        validationSchema: signInSchema,
        onSubmit:(values)=>{
            // console.log("values",values)
            loginUser(values);
        }
    })
  return (
    <Container>
    <Row>
      <Col md={3}>
      <img src={logo} height={100} width={100}/>
      </Col>
      <Col md={6} className="text-center">
        <h1>Login</h1>
      </Col>
    </Row>
    <Row>
        <Col md={3}></Col>
        <Col md={6}>
            <form autoComplete='off' onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Email</label>
                    <input type="email"  className='form-control' name='email' placeholder='Enter Email'
                    autoComplete='off'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                    {errors.email && touched.email?<p className='text-danger'>{errors.email}</p>:null}
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input type="password"  className='form-control' name='password' placeholder='Enter Password'
                    autoComplete='off'
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                    {errors.password && touched.password?<p className='text-danger'>{errors.password}</p>:null}
                </div>
                <br/>
                <div className='form-group'>
                    <Button type='submit' className='btn btn-dark btn-block'>Login</Button>
                    <a href='/register' className='' >Register</a>
                </div>
            </form>
        </Col>
        <Col md={3}></Col>
    </Row>
   </Container>
  )
}

export default Login