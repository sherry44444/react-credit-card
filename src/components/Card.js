import React, { Component } from "react";
import {
  CSSTransition,
  TransitionGroup,
  SwitchTransition
} from "react-transition-group";
import "./style.scss";
let classnames = require("classnames");

const CARDS = {
  visa: "^4",
  amex: "^(34|37)",
  mastercard: "^5[1-5]",
  discover: "^6011",
  unionpay: "^62"
};

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardType: "visa",
      focusElementStyle: null,
      currentFocus: null,
      isFocus: false,
      defaultCardPlaceHolder: "#### #### #### ####",
      currentPlaceHolder: "",
      cardBackground: this.cardBackground()
    };
  }

  cardType = () => {
    let { cardNumber } = this.props;
    let regex;
    for (const [card, pattern] of Object.entries(CARDS)) {
      regex = new RegExp(pattern);
      if (cardNumber.match(regex) !== null) {
        return card;
      }
    }
    return "visa";
  };

  cardBackground = () => {
    let cardBg = Math.floor(Math.random() * 5 + 1);
    return cardBg;
  };

  componentDidUpdate = nextProps => {
    if (this.props.currentFocusElm !== nextProps.currentFocusElm) {
      this.changeFocus();
    }
  };

  changeFocus = () => {
    let target = this.props.currentFocusElm;
    this.setState({
      focusElementStyle: target
        ? {
            width: `${target.offsetWidth}px`,
            height: `${target.offsetHeight}px`,
            transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`
          }
        : null
    });
  };

  maskCardNumber(cardNumber) {
    let cardNumberArr = cardNumber.split("");
    cardNumberArr.forEach((val, index) => {
      if (index > 4 && index < 14) {
        if (cardNumberArr[index] !== " ") {
          cardNumberArr[index] = "*";
        }
      }
    });

    return cardNumberArr;
  }

  render() {
    let {
      cardNumber,
      cardName,
      cardMonth,
      cardYear,
      cardCvv,
      isCardFlipped,
      onCardElementClick,
      cardNumberRef,
      cardNameRef,
      cardDateRef
    } = this.props;

    let { cardType, defaultCardPlaceHolder } = this.state;
    cardCvv = cardCvv.split("");
    let cardNumberArr = this.maskCardNumber(cardNumber);

    let cardItemClass = classnames({
      "card-item": true,
      "-active": isCardFlipped
    });

    let cardItemFocusClass = classnames({
      "card-item__focus": true,
      "-active": this.state.focusElementStyle
    });

    let numberItemClass = classnames({
      "card-item__numberItem": true,
      "-active": false
    });

    return (
      <div className={cardItemClass}>
        <div className="card-item__side -front">
          <div
            className={cardItemFocusClass}
            ref="focusElement"
            style={this.state.focusElementStyle}
          ></div>
          <div className="card-item__cover">
            <img
              src={`images/card-bg/${this.state.cardBackground}.jpeg`}
              className="card-item__bg"
            />
          </div>
          <div className="card-item__wrapper">
            <div className="card-item__top">
              <img
                src="images/chip.png"
                alt="chip.png"
                className="card-item__chip"
              />
              <div className="card-item__type">
                <SwitchTransition in-out>
                  <CSSTransition
                    key={this.cardType()}
                    timeout={250}
                    classNames="slide-fade-up"
                  >
                    <img
                      alt={this.cardType()}
                      src={`images/card-type/${this.cardType()}.png`}
                      className="card-item__typeImg"
                    />
                  </CSSTransition>
                </SwitchTransition>
              </div>
            </div>
            <label
              className="card-item__number"
              ref={cardNumberRef}
              onClick={() => {
                onCardElementClick("input-number");
              }}
            >
              <TransitionGroup className="slide-fade-up">
                {[...defaultCardPlaceHolder].map((n, index) => {
                  return (
                    <SwitchTransition in-out key={index}>
                      {cardNumberArr[index] ? (
                        <CSSTransition
                          key={1}
                          classNames="slide-fade-up"
                          timeout={250}
                        >
                          <div className="card-item__numberItem">
                            {cardNumberArr[index]}
                          </div>
                        </CSSTransition>
                      ) : (
                        <CSSTransition
                          key={2}
                          classNames="slide-fade-up"
                          timeout={250}
                        >
                          <div className="card-item__numberItem">{n}</div>
                        </CSSTransition>
                      )}
                    </SwitchTransition>
                  );
                })}
              </TransitionGroup>
            </label>
            <div className="card-item__content">
              <label
                htmlFor=""
                className="card-item__info"
                ref={cardNameRef}
                onClick={() => {
                  onCardElementClick("input-name");
                }}
              >
                <div className="card-item__holder">Card Holder</div>

                <SwitchTransition in-out>
                  {cardName.length ? (
                    <CSSTransition
                      classNames="slide-fade-up"
                      timeout={250}
                      key={1}
                    >
                      <div className="card-item__name">
                        <TransitionGroup
                          className="slide-fade-right"
                          component="span"
                        >
                          {[...cardName].map((n, index) => {
                            return (
                              <CSSTransition
                                key={index}
                                timeout={250}
                                classNames="slide-fade-right"
                              >
                                <span className="card-item__nameItem">{n}</span>
                              </CSSTransition>
                            );
                          })}
                        </TransitionGroup>
                      </div>
                    </CSSTransition>
                  ) : (
                    <CSSTransition
                      classNames="slide-fade-up"
                      timeout={250}
                      key={2}
                    >
                      <div className="card-item__name">Full Name</div>
                    </CSSTransition>
                  )}
                </SwitchTransition>
              </label>
              <div
                className="card-item__date"
                ref={cardDateRef}
                onClick={() => {
                  onCardElementClick("input-date");
                }}
              >
                <label htmlFor="" className="card-item__dateTitle">
                  Expires
                </label>
                <label htmlFor="" className="card-item__dateItem">
                  <SwitchTransition in-out>
                    {!cardMonth ? (
                      <CSSTransition
                        classNames="slide-fade-up"
                        timeout={250}
                        key={cardMonth}
                      >
                        <span>MM</span>
                      </CSSTransition>
                    ) : (
                      <CSSTransition
                        classNames="slide-fade-up"
                        timeout={250}
                        key={cardMonth}
                      >
                        <span>{cardMonth}</span>
                      </CSSTransition>
                    )}
                  </SwitchTransition>
                </label>
                /
                <label htmlFor="cardYear" className="card-item__dateItem">
                  <SwitchTransition out-in>
                    {!cardYear ? (
                      <CSSTransition
                        classNames="slide-fade-up"
                        timeout={200}
                        key={cardYear}
                      >
                        <span>YY</span>
                      </CSSTransition>
                    ) : (
                      <CSSTransition
                        classNames="slide-fade-up"
                        timeout={200}
                        key={cardYear}
                      >
                        <span>{cardYear.toString().substr(-2)}</span>
                      </CSSTransition>
                    )}
                  </SwitchTransition>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="card-item__side -back">
          <div className="card-item__cover">
            <img
              src={`images/card-bg/${this.state.cardBackground}.jpeg`}
              className="card-item__bg"
            />
          </div>
          <div className="card-item__band"></div>
          <div className="card-item__cvv">
            <div className="card-item__cvvTitle">CVV</div>
            <div className="card-item__cvvBand">
              {cardCvv.map((val, index) => (
                <span key={index}>*</span>
              ))}
            </div>
            <div className="card-item__type">
              <img
                alt={this.cardType()}
                src={`images/card-type/${this.cardType()}.png`}
                className="card-item__typeImg"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
