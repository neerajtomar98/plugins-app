import React from "react";

import AppMenu from "../../../utils/icons/AppMenu";
import CheckedClipboard from "../../../utils/icons/CheckedClipboard";
import ThumbTack from "../../../utils/icons/ThumbTack";

import "./Tab.css";

const getTabIcon = (iconName) => {
  switch (iconName) {
    case "icon-marketing":
      return <AppMenu />;
    case "icon-finance":
      return <ThumbTack />;
    case "icon-people":
      return <CheckedClipboard />;
    default:
      return "";
  }
};

const Tab = (props) => {
  const { data, tabKey, selectedTab, tabClickHandler } = props;
  const isSelected = selectedTab === tabKey;
  return (
    <div
      className={isSelected ? "tab selected-tab" : "tab"}
      onClick={(event) => tabClickHandler(tabKey)}
    >
      <span className="tab-icon">{getTabIcon(data.icon)}</span>
      <h4 className="tab-title">{data.title}</h4>
    </div>
  );
};

export default Tab;
