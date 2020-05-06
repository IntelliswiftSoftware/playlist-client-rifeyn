import React from "react";
import MenuBar from '../../containers/menuBar';
import Footer from '../../containers/footer';

function Dashboard(props) {
  const { history } = props;
  return (
    <>
      <MenuBar history={history}/>
      <Footer history={history}/>
    </>
  );
}
export default Dashboard;