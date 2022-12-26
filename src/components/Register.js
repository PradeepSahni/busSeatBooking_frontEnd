import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import logo from '../logo.svg';
import { useFormik } from 'formik';
import { signUpSchema } from '../schema';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// var axios = require('axios');
const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
}
const Register = () => {
    const navigate = useNavigate();
    const register = (sData)=>{
        var data = JSON.stringify(sData);

        var config = {
        method: 'post',
        url: 'http://localhost:4000/api/createUser',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };

        axios(config)
        .then(function (response) {
            // console.log(JSON.stringify(response.data));
            if(response.data.status){
                alert("Success");
                navigate("/");
            }
            else{
                alert("Error "+response.data.message)
            }
        })
        .catch(function (error) {
            // console.log(error);
            alert("Error "+error.message)
        });
    }
    const {values,errors,touched,handleChange,handleBlur,handleSubmit} = useFormik({
        initialValues: initialValues,
        validationSchema: signUpSchema,
        onSubmit: (values)=>{
            console.log("Values ",values)
            register(values)
        }
    })
  return (
    <Container>
    <Row>
      <Col md={3}>
      <img src={logo} height={100} width={100}/>
      </Col>
      <Col md={6} className="text-center">
        <h1>Register</h1>
      </Col>
    </Row>
    <Row>
        <Col md={3}></Col>
        <Col md={6}>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Name</label>
                    <input type="text"  className='form-control' name='name' placeholder='Enter Name' 
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                    {errors.name && touched.name?<p className='text-danger'>{errors.name}</p>:null}
                </div>
                <div className='form-group'>
                    <label>Email</label>
                    <input type="text"  className='form-control' name='email' placeholder='Enter Email'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                    {errors.email && touched.email?<p className='text-danger'>{errors.email}</p>:null}
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input type="text"  className='form-control' name='password' placeholder='Enter Password'
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                    {errors.password && touched.password?<p className='text-danger'>{errors.password}</p>:null}
                </div>
                <div className='form-group'>
                    <label>Confirm Password</label>
                    <input type="text"  className='form-control' name='confirmPassword' placeholder='Enter Confirm Password'
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                    {errors.confirmPassword && touched.confirmPassword?<p className='text-danger'>{errors.confirmPassword}</p>:null}
                </div>
                <br/>
                <div className='form-group mt-2'>
                    <Button type='submit' className='btn btn-dark btn-block'>Register</Button>
                    <a href='/' >Login</a>
                </div>
            </form>
        </Col>
        <Col md={3}></Col>
    </Row>
   </Container>
  )
}

export default Register