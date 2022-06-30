import { useEffect, useState } from 'react'
import styled from 'styled-components'
import NavBar from '../Components/UI/NavBar'
import ProSide from '../Components/UI/ProSideBar'
import MainRoute from '../Routes/MainRoute'

const Index = (props) => {
  const [burgerClicked, setBurgerClicked] = useState(false)
  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    
    if(width <= 856){
      if(burgerClicked === false)
        setBurgerClicked(true)
    }

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, [width, burgerClicked]);

  const clickBurger = (res) => {
    setBurgerClicked(res)
  }

  return (
    <LayoutMainContainer>
      <ProSide burgerClicked={burgerClicked} />
      <div className={`${burgerClicked ? 'mainContainer1' : 'mainContainer'}`}>
        <NavBar burgerClicked={burgerClicked} clickBurger={clickBurger} />
        <div className="container">
          <MainRoute {...props} />
        </div>

      </div>
    </LayoutMainContainer>
  )
}

export default Index

const LayoutMainContainer = styled.div`
  width: 100%;
  height: auto;
  background-color: var(--secondaryBackground);
  display: flex;
  position: relative;

  .mainContainer{
    position: relative;
    left: 250px;
    top: 0;
    bottom: 0;
    right: 0;
    width: calc(100% - 250px);
    min-height: 100vh;    
  }

  .mainContainer1{
    position: relative;
    min-height: 100vh;
    width: 100%;
  }

  .container{
    padding: 16px;
  }
`