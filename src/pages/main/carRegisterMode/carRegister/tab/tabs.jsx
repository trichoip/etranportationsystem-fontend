import React, { Component } from "react";
import PropTypes from "prop-types";
import Tab from "./tab";

class Tabs extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeTab: this.props.children[0].props.label,
      formComment: false,
      isHeart: false,
    };
  }

  onClickTabItem = (tab) => {
    this.setState({ activeTab: tab });
  };

  render() {
    const {
      onClickTabItem,
      props: { children },
      state: { activeTab },
    } = this;

    return (
      <div className="register-container">
        <div className="content-register">
          <div className="stepbystep">
            <ul>
              {children.map((child) => {
                const { label, number } = child.props;
                return (
                  <Tab
                    activeTab={activeTab}
                    key={label}
                    label={label}
                    number={number}
                    onClick={onClickTabItem}
                  />
                );
              })}
            </ul>
          </div>
          {children.map((child) => {
            if (child.props.label !== activeTab) return undefined;
            return child.props.children;
          })}
        </div>
      </div>
    );
  }
}

export default Tabs;
