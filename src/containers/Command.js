import React, { Component } from 'react';

import DeleteImage from '../components/UI/DeleteImage';
import Modal from '../components/UI/Modal/Modal';
import '../components/Command/Command.css';

class Command extends Component {
  state = {
    customizeIsOpen: false,
  }

  openCustomizeModal = (event) => {
    event.preventDefault();

    this.setState({
      customizeIsOpen: true,
    });
  }

  closeModalCustomizeModal = (event) => {
    event.preventDefault();

    this.setState({
      customizeIsOpen: false,
    });
  }

  render() {
    return (
      <div className="Command">
        <div className="Element">
          <div className="Title">Tartiflette</div>
          <div className="Content">
            <div>lardon, roblochon, onions, chives, cream</div>
            <div className="Actions">
              <button>Add</button>
              <button onClick={this.openCustomizeModal}>Customize</button>
            </div>
          </div>
        </div>
        <div className="Element">
          <div className="Title">Complete</div>
          <div className="Content">
            <div>ham, egg, gruyere</div>
            <div className="Actions">
              <button>Add</button>
              <button onClick={this.openCustomizeModal}>Customize</button>
            </div>
          </div>
        </div>
        <Modal show={this.state.customizeIsOpen} closeModal={this.closeModalCustomizeModal}>
          <div className="IngredientsWrapper">
            <div className="Ingredients">
              <div className="Ingredient">
                <div className="Name">Lardon</div>
                <div className="Quantity">
                  <button className="Less">-</button>
                  <div>2</div>
                  <button className="Plus">+</button>
                </div>
                <button className="Delete"><DeleteImage message="Delete ingredient" /></button>
              </div>
              <div className="Ingredient">
                <div className="Name">Roblochon</div>
                <div className="Quantity">
                  <button className="Less">-</button>
                  <div>1</div>
                  <button className="Plus">+</button>
                </div>
                <button className="Delete"><DeleteImage message="Delete ingredient" /></button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Command;
