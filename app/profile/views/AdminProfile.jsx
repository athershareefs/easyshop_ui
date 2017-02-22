var App = require('../../context/events');
var React = require('react');

var AdminProfile = React.createClass({
  usersList(){
    window.router.setRoute('/usersList');
  },
  logout(){
    window.BUS.trigger(App.events.login.logout);
  },
  componentDidMount: function(){
    window.BUS.trigger(App.events.profile.init);
	},
  render: function () {
  return (
  <div>
    <div className='appBar'> 
      <span className='homeButton'> <p onClick={this.home}>Home</p> </span>
      <span className='appBarButton'> <p onClick={this.usersList}>Users List</p> </span>
      <span className='logout-button'> <p onClick={this.logout}>Logout</p> </span>
    </div>
  </div>);
  }
});
module.exports = AdminProfile;
