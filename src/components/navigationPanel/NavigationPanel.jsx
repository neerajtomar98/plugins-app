import React from "react";

import Tab from "./tab/Tab";
import ToggleButton from "../../utils/icons/ToggleButton";
import "./NavigationPanel.css";

const NavigationPanel = (props) => {
  const {
    tabsData,
    selectedTab,
    tabClickHandler,
    isPowerSwitchActive,
    powerSwitchClickHandler,
  } = props;
  return (
    <div className="navigation-panel">
      <h3 className="header">Random Name</h3>
      <div className="tabs-container">
        {Object.keys(tabsData).map((tabKey) => (
          <Tab
            key={tabKey}
            tabKey={tabKey}
            data={tabsData[tabKey]}
            selectedTab={selectedTab}
            tabClickHandler={tabClickHandler}
          />
        ))}
      </div>
      <footer className="footer">
        All plugins are {isPowerSwitchActive ? "enabled" : "disabled"}
        <span className="power-switch" onClick={powerSwitchClickHandler}>
          <ToggleButton
            height={"40px"}
            width={"40px"}
            inactive={!isPowerSwitchActive}
          />
        </span>
      </footer>
    </div>
  );
};

export default NavigationPanel;
