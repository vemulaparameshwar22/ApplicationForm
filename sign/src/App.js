import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import './App.css'

class App extends Component {
    constructor() {
        super()
        this.state = {
            fullName: '',
            username: '',
            email: '',
            password: '',
            alertMessage: '' // Add alertMessage to state
        }
        this.changeFullName = this.changeFullName.bind(this)
        this.changeEmail = this.changeEmail.bind(this)
        this.changeUsername = this.changeUsername.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    changeFullName(event) {
        this.setState({
            fullName: event.target.value
        })
    }

    changeUsername(event) {
        this.setState({
            username: event.target.value
        })
    }

    changeEmail(event) {
        this.setState({
            email: event.target.value
        })
    }

    changePassword(event) {
        this.setState({
            password: event.target.value
        })
    }

    onSubmit(event) {
        event.preventDefault()

        const registered = {
            fullName: this.state.fullName,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://localhost:4000/app/signup', registered)
            .then(response => {
                console.log(response.data)
                this.setState({
                    alertMessage: 'Form submitted successfully!'
                })
            })
            .catch(error => {
                console.error(error)
                this.setState({
                    alertMessage: 'Form submission failed!'
                })
            })

        this.setState({
            fullName: '',
            username: '',
            email: '',
            password: ''
        })
    }

    render() {
        return (
            <div className="backgroundImage">
                <div className='container d-flex justify-content-center align-items-center vh-100'>
                    <div className='form-div p-5 shadow-lg rounded'>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group mb-4">
                                <input type='text'
                                    placeholder='Full Name'
                                    onChange={this.changeFullName}
                                    value={this.state.fullName}
                                    className='form-control form-group'
                                />
                            </div>
                            <div className="form-group mb-4">
                                <input type='text'
                                    placeholder='Username'
                                    onChange={this.changeUsername}
                                    value={this.state.username}
                                    className='form-control form-group'
                                />
                            </div>
                            <div className="form-group mb-4">
                                <input type='text'
                                    placeholder='E-mail'
                                    onChange={this.changeEmail}
                                    value={this.state.email}
                                    className='form-control form-group'
                                />
                            </div>
                            <div className="form-group mb-4">
                                <input type='password'
                                    placeholder='password'
                                    onChange={this.changePassword}
                                    value={this.state.password}
                                    className='form-control form-group'
                                />
                            </div>
                            <button type="submit" className="btn btn-danger btn-block">
                                Submit
                            </button>
                        </form>
                        {/* Conditionally render the alert message */}
                        {this.state.alertMessage && <div className="alert alert-success mt-4">{this.state.alertMessage}</div>}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
