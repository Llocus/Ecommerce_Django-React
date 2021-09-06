import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, Row, NavDropdown, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'
import { makeStyles } from '@material-ui/core/styles';

function Header() {
  const [openProfile, setOpenProfile] = useState(false);
  const [adminInfo, setAdminInfo] = useState(false);
  const [searching, setSearching] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return windowDimensions;
  }

  const { height, width } = useWindowDimensions();

  const useStyles = makeStyles({
    MenuUser: {
      position: 'fixed',
      width: '23%',
      fontSize: '20px',
      color: 'white',
      backgroundColor: 'lightgray',
      bottom: 75,
      left: '193px',
      zIndex: 9999999,
    },
    MenuAdmin: {
      position: 'fixed',
      width: '28%',
      fontSize: '20px',
      color: 'white',
      backgroundColor: 'lightgray',
      bottom: 75,
      left: '300px',
      zIndex: 9999999,
    },
    Search: {
      position: 'fixed',
      width: '100%',
      height: '20%',
      fontSize: '25px',
      color: 'white',
      backgroundColor: '#3e4145',
      bottom: 0,
      left: '0px',
      zIndex: 9999999,
    },
    SearchContent: {
      display: 'flex',
      width: '100%',
      paddingTop: '10px',
      paddingLeft: '25px',
    },
    Navbar: {
        position: 'fixed',
        width: '100%',
        bottom: 0,
        paddingBottom: 50,
        zIndex: 999999,
    },
    NavItens: {
      position: 'absolute',
      paddingTop: '40px',
      paddingLeft: 0,
      paddingRight: '50%',
      paddingBottom: '10px',
    },
      NavIconHome: {
      paddingLeft: 30,
      fontSize: 25
    },
    NavIconSearch: {
      paddingLeft: 10,
      fontSize: 25
    },
    NavIconCart: {
      paddingLeft: 15,
      fontSize: 25
    },
    NavIconProfile: {
      paddingLeft: 50,
      fontSize: 25
    },
    NavIconAdmin: {
      color: 'red',
      paddingLeft: 30,
      fontSize: 25
    }
  });

  const style = useStyles()

    return (
        <header>
          {width > 900 ?
        <Navbar bg="dark" variant="dark" collapseOnSelect>
  <Container>
    <LinkContainer to='/'>
    <Navbar.Brand>E-Shop</Navbar.Brand>
    </LinkContainer>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <SearchBox/>
      <Row id="menuBarItens">
      <Nav>
      <LinkContainer to='/cart'>
        <Nav.Link><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
      </LinkContainer>
      {userInfo ? (
          <NavDropdown title={userInfo.name} id='username'>
            <LinkContainer to='/profile'>
              <NavDropdown.Item>Profile</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
          </NavDropdown>
      ): (
        <LinkContainer to='/login'>
        <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
        </LinkContainer>
      )}

      {userInfo && userInfo.isAdmin && (
        <NavDropdown title='Admin' id='adminmenu'>
          <LinkContainer to='/admin/userlist'>
            <NavDropdown.Item>Users</NavDropdown.Item>
          </LinkContainer>
           
          <LinkContainer to='/admin/productlist'>
            <NavDropdown.Item>Products</NavDropdown.Item>
          </LinkContainer>

          <LinkContainer to='/admin/orderlist'>
            <NavDropdown.Item>Orders</NavDropdown.Item>
          </LinkContainer>
        </NavDropdown>
      )}
      </Nav>
      </Row>
    </Navbar.Collapse>
  </Container>
</Navbar> 

    : 
    
<div >
        {openProfile ? 
        <div className={style.MenuUser}>
        {userInfo ? (<>
            <LinkContainer to='/profile' >
              <NavDropdown.Item onClick={() => {
                setOpenProfile(false)}}>Profile</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Item onClick={() => {
              setOpenProfile(false)
              logoutHandler()
              }}>Logout</NavDropdown.Item>
            </>
        ) : (
          <>
          <LinkContainer to='/login'>
          <Nav.Link onClick={() => {setOpenProfile(false)}}>Login</Nav.Link>
          </LinkContainer>
          </>
        )}
        </div>  
      : null
      }
      {adminInfo ? (<>
        <div className={style.MenuAdmin}>
          {userInfo && userInfo.isAdmin ? (
            <>
          <LinkContainer to='/admin/userlist'>
            <Nav.Link onClick={() => {setAdminInfo(false)}}>Users</Nav.Link>
          </LinkContainer>
           
          <LinkContainer to='/admin/productlist'>
            <Nav.Link onClick={() => {setAdminInfo(false)}}>Products</Nav.Link>
          </LinkContainer>

          <LinkContainer to='/admin/orderlist'>
            <Nav.Link onClick={() => {setAdminInfo(false)}}>Orders</Nav.Link>
          </LinkContainer>
          </>
          
      ): null} 
      
        </div>  
      </>) : null
      }
      {searching ? (<>
        <div className={style.Search}>
          <div className={style.SearchContent}>
            <Button
                onClick={() => {setSearching(!searching)}}
                variant='danger'
                className= 'fas fa-times'
            ></Button>
            <SearchBox />
          </div>
        </div>
      </>
      ) : null}
        <Navbar className={style.Navbar} bg="dark" variant="dark" collapseOnSelect>
        <Container className={style.NavItens}>
          <LinkContainer to='/'>
            <Navbar.Brand><i className={style.NavIconHome}><i className="fas fa-home"></i></i>
            </Navbar.Brand>
          </LinkContainer>
          <LinkContainer to='/'>
            <Navbar.Brand onClick={() => {setSearching(!searching)}}><i className={style.NavIconSearch}><i className="fas fa-search"></i></i>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Row id="menuBarItens">
      <Nav>
      <LinkContainer to='/cart'>
        <Nav.Link><i className={style.NavIconCart}><i className="fas fa-shopping-cart"></i></i></Nav.Link>
      </LinkContainer>
        <Navbar.Brand onClick={() => {setOpenProfile(!openProfile)}}>
        <i className={style.NavIconProfile}><i className="fas fa-user"></i></i></Navbar.Brand>
        {userInfo && userInfo.isAdmin && (
          <Navbar.Brand onClick={() => {setAdminInfo(!adminInfo)}}>
          <i className={style.NavIconAdmin}><i className="fas fa-user-shield"></i></i></Navbar.Brand>
        )} 
      </Nav>
      </Row>
        </Container>
        </Navbar>
</div>
}
        </header>
    )
}

export default Header;
