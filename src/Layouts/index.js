import styled from 'styled-components'
import NavBar from '../Components/UI/NavBar'
import ProSide from '../Components/UI/ProSideBar'
import MainRoute from '../Routes/MainRoute'

const Index = (props) => {
  const isSideBarCollapsed = false;

  return (
    <LayoutMainContainer>
      <ProSide />
      <div className={`${isSideBarCollapsed ? 'mainContainer1' : 'mainContainer'}`}>
        <NavBar />
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