import React, {useState} from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function SearchBox() {
    const [keyword, setKeyword] = useState('')

    let history = useHistory()

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword){
            history.push(`/?keyword=${keyword}&page=1`)
        } else {
            history.push(history.location.pathname)
        }
    }

    return (
        <Form onSubmit={submitHandler} inline>    
            <Row>
            <div class="input-group">
            <div class="form-outline">
                <Col>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                className=' mr-sm-2 ml-sm-5'
                placeholder="Search"
            >
            </Form.Control>
                </Col>
            </div>
                <Col>
            <Button
                type='submit'
                variant='btn btn-primary'
                className= 'fas fa-search'
            >
            </Button>
            </Col>
            </div>
            </Row>
        </Form>
    )
}

export default SearchBox
