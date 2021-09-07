import React, {useState, useEffect} from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'
import cep from 'cep-promise'

function ShippingScreen({history}) {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [state, setState] = useState(shippingAddress.state)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, state, postalCode, country}))
        history.push('/payment')
    }

    const getPostalInfo = async (e) => {
        if(e.target.validity.badInput === false)
            setPostalCode(e.target.valueAsNumber)
        if(e.target.value.toString().length == 8){
            const cepInfo = await cep(e.target.value.toString())
            console.log(cepInfo)
            setCity(cepInfo['city'])
            setState(cepInfo['state'])
            setAddress(cepInfo['street'])
        }
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2/>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>

            <Form.Group controlId='postalcode'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                    required
                    type='number'
                    placeholder='Enter Postal Code'
                    value={postalCode ? postalCode : ''}
                    onChange={getPostalInfo}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='Enter Address'
                    value={address ? address : ''}
                    onChange={(e) => setAddress(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='Enter City'
                    value={city ? city : ''}
                    onChange={(e) => setCity(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='state'>
                <Form.Label>State</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='Enter State'
                    value={state ? state : ''}
                    onChange={(e) => setState(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='Enter Country'
                    value={country ? country : ''}
                    onChange={(e) => setCountry(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <br/>
            <Button type='submit' variant='primary'>
                Continue
            </Button>
            </Form>
            <br/>
        </FormContainer>
    )
}

export default ShippingScreen
