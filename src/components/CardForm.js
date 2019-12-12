import React, { Component } from "react";
import Card from "./Card";
import "./style.scss";

class CardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: "",
      cardName: "",
      cardMonth: "",
      cardYear: "",
      cardCvv: "",
      currentFocusElm: "",
      isCardFlipped: false,
      cardNumberMaxLength: "",
      monthsArr: Array.from(new Array(12), (x, i) => {
        const month = i + 1;
        return month <= 9 ? "0" + month : month;
      }),
      yearsArr: Array.from(new Array(9), (x, i) => new Date().getFullYear() + i)
    };

    this.cardElementsRef = {
      cardNumber: null,
      cardHolder: null,
      cardDate: null
    };
  }

  componentDidMount = () => {
    this.refs["input-number"].focus();
  };

  handleNumberChange = e => {
    let value = e.target.value.toString().replace(/\D/g, "");
    console.log(/^3[47]\w{0,13}$/.test(value));

    if (/^3[47]\w{0,13}$/.test(value)) {
      let newValue = value
        .replace(/(\w{4})/, "$1 ")
        .replace(/(\w{4}) (\w{6})/, "$1 $2 ");
      this.setState({
        cardNumber: newValue,
        cardNumberMaxLength: 17
      });
    } else if (/^\w{0,16}$/.test(value)) {
      let newValue = value
        .replace(/(\w{4})/, "$1 ")
        .replace(/(\w{4}) (\w{4})/, "$1 $2 ")
        .replace(/(\w{4}) (\w{4}) (\w{4})/, "$1 $2 $3 ");
      this.setState({
        cardNumber: newValue,
        cardNumberMaxLength: 19
      });
    }
  };

  handleFormChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onCardElementClick = key => {
    this.refs[key].focus();
  };

  onFocusInput = inputName => {
    this.setState({
      currentFocusElm: this.cardElementsRef[inputName]
    });
  };

  onBlurInput = () => {
    this.setState({
      currentFocusElm: null
    });
  };

  onCvvFocus = () => {
    this.setState({
      isCardFlipped: true
    });
  };

  onCvvBlur = () => {
    this.setState({
      isCardFlipped: false
    });
  };

  render() {
    let {
      cardNumber,
      cardName,
      cardMonth,
      cardYear,
      cardCvv,
      monthsArr,
      yearsArr,
      currentFocusElm,
      isCardFlipped
    } = this.state;
    let trimedCardNumber = cardNumber.trim();

    return (
      <div className="card-form">
        <div className="card-list">
          <Card
            cardNumber={cardNumber}
            cardName={cardName}
            cardMonth={cardMonth}
            cardYear={cardYear}
            cardCvv={cardCvv}
            currentFocusElm={currentFocusElm}
            isCardFlipped={isCardFlipped}
            onCardElementClick={this.onCardElementClick}
            cardNumberRef={node => (this.cardElementsRef["cardNumber"] = node)}
            cardNameRef={node => (this.cardElementsRef["cardName"] = node)}
            cardDateRef={node => (this.cardElementsRef["cardDate"] = node)}
          ></Card>
        </div>
        <div className="card-form__inner">
          <div className="card-input">
            <label htmlFor="cardNumber" className="card-input__label">
              Card Number
            </label>
            <input
              className="card-input__input"
              type="tel"
              ref="input-number"
              maxlength={this.state.cardNumberMaxLength}
              value={trimedCardNumber}
              onFocus={() => {
                this.onFocusInput("cardNumber");
              }}
              onBlur={this.onBlurInput}
              onChange={this.handleNumberChange}
              autoComplete="off"
            />
            {/* <button className='card-input__eye' title="Show/Hide card number"
          tabindex="-1"></button> */}
          </div>
          <div className="card-input">
            <label htmlFor="cardName" className="card-input__label">
              Card Name
            </label>
            <input
              name="cardName"
              className="card-input__input"
              type="text"
              ref="input-name"
              value={cardName}
              onFocus={() => {
                this.onFocusInput("cardName");
              }}
              onBlur={this.onBlurInput}
              onChange={this.handleFormChange}
              autoComplete="off"
            />
          </div>
          <div className="card-form__row">
            <div className="card-form__col">
              <div className="card-form__group">
                <label htmlFor="cardMonth" className="card-input__label">
                  Expiration Date
                </label>
                <select
                  name="cardMonth"
                  className="card-input__input -select"
                  ref="input-date"
                  onFocus={() => {
                    this.onFocusInput("cardDate");
                  }}
                  onBlur={this.onBlurInput}
                  onChange={this.handleFormChange}
                >
                  <option value disabled selected>
                    Month
                  </option>
                  {monthsArr.map(month => (
                    <option>{month}</option>
                  ))}
                </select>
                <select
                  name="cardYear"
                  className="card-input__input -select"
                  onFocus={() => {
                    this.onFocusInput("cardDate");
                  }}
                  onBlur={this.onBlurInput}
                  onChange={this.handleFormChange}
                >
                  <option value disabled selected>
                    Year
                  </option>
                  {yearsArr.map(year => (
                    <option>{year}</option>
                  ))}
                </select>
                {/* <select name="" id=""></select> */}
              </div>
            </div>
            <div className="card-form__col -cvv">
              <div className="card-input">
                <label htmlFor="cardCvv" className="card-input__label">
                  CVV
                </label>
                <input
                  name="cardCvv"
                  type="tel"
                  className="card-input__input"
                  maxLength="4"
                  autoComplete="off"
                  onFocus={this.onCvvFocus}
                  onBlur={this.onCvvBlur}
                  onChange={this.handleFormChange}
                />
              </div>
            </div>
          </div>
          <button className="card-form__button">Submit</button>
        </div>
      </div>
    );
  }
}

export default CardForm;
