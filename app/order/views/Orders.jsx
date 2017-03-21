var App = require('../../context/events');
var React = require('react');
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
var Addresses = React.createClass({
  saveAddress(){
    window.BUS.trigger(App.events.order.saveAddress, [this.props.address.get('addressId')]);
  },
  render:function(){
    var button = this.props.address.get('addressId') == this.props.selectedAddress? 'Address Selected':'Select Address';
    return (
      <div className="addressesDiv">
        <p>Phone No: {this.props.address.get('phoneNumber')}</p>
        <p>Address Line 1: {this.props.address.get('address1')}</p>
        <p>Address Line 2: {this.props.address.get('address2')}</p>
        <p>City: {this.props.address.get('city')}</p>
        <p>State: {this.props.address.get('state')}</p>
        <p>Zipcode: {this.props.address.get('zipcode')}</p>
        <input type="button" value={button} onClick={this.saveAddress} />
      </div>
    );

  }
});
var Cards = React.createClass({
  saveCard(){
    window.BUS.trigger(App.events.order.saveCard, [this.props.card.get('cardId')]);
  },
  render:function(){
    var button = this.props.card.get('cardId') == this.props.selectedCard? 'Card Selected':'Select Card';
    return (
      <div className="addressesDiv">
        <p>Card No: {this.props.card.get('cardNumber')}</p>
        <p>Expiry Date: {this.props.card.get('cardExpMon')}/{this.props.card.get('cardExpYr')}</p>
        <p>CVV: {this.props.card.get('cardCvv')}</p>
        <input type="button" value={button} onClick={this.saveCard} />
      </div>
    );

  }
});
var Order = React.createClass({
  getInitialState(){
    return {
      stepIndex: 0,
      finished: 0
    };
  },
  home(){
    window.router.setRoute('/login');
  },
  openProfile(){
    window.router.setRoute('/editProfile');
  },
  openCart(){
    window.router.setRoute('/cart');
  },
  logout(){
    window.BUS.trigger(App.events.login.logout);
  },
  placeOrder(){
    window.router.setRoute('/order');
  },
  componentDidMount: function(){
    window.BUS.trigger(App.events.order.custDetails);
  },
  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return 'Select the address to which you want to deliver the product(s)';
      case 1:
        return 'Which card do you want to pay with!!!';
      case 2:
        return 'Confirm the order details and proceed with payment. Thanks for shopping with us :)';
      default:
        return ;
    }
  },
  handleNext(){
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 1,
    });
  },

  handlePrev(){
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  },
  render: function () {
    var finalAmount = 0;
    var itemCount = 0;
    const {stepIndex} = this.state;
    var selectedAddress = this.props.details.get('selectedAddress');
    var selectedCard = this.props.details.get('selectedCard');
    var nextHidden = this.state.stepIndex === 2 ? {display: 'none'} : {} ;
    var prevHidden = this.state.stepIndex === 0 ? {display: 'none'} : {marginRight: '30px'} ;
    var tab1 = this.state.stepIndex === 0 ? {} : {display: 'none'};
    var tab2 = this.state.stepIndex === 1 ? {} : {display: 'none'};
    var tab3 = this.state.stepIndex === 2 ? {padding: '40px'} : {display: 'none'};
    var AddressList = this.props.addresses.map(u => {
      return <Addresses address={u} selectedAddress={selectedAddress}/>;
    });
    var CardsList = this.props.cards.map(u => {
      return <Cards card={u} selectedCard={selectedCard}/>;
    });
    return (
      <div>
        <div className='appBar'> 
          <span className='homeButton'> <p onClick={this.home}>Home</p> </span>
          <span className='appBarButton'> <p onClick={this.openProfile}>Edit Profile</p> </span>
          <span className='cartButton'> <p onClick={this.openCart}>Cart({this.props.cartCount})</p> </span>
          <span className='logout-button'> <p onClick={this.logout}>Logout</p> </span>
        </div>  
        <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Addresses</StepLabel>
          </Step>
          <Step>
            <StepLabel>cards</StepLabel>
          </Step>
          <Step>
            <StepLabel>Confirm Order</StepLabel>
          </Step>
        </Stepper>
      </div>
      <div style={tab1}>
        {AddressList}
      </div>
      <div style={tab2}>
        {CardsList}
      </div>
      <div style={{marginTop: 12, padding: '20px 0px 420px 0px'}}>
        <span onClick={this.handlePrev} style={prevHidden} className='step-button1'>{"<< Prev"} </span>
        <span onClick={this.handleNext} style={nextHidden} className='step-button1'> {"Next >>"} </span>
      </div>
    </div>);
  }
});
module.exports = Order;
