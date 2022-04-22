import React from "react";

import PluginCard from "./pluginCard/PluginCard";
import "./Content.css";

const Content = (props) => {
  const {
    tabsData,
    selectedTab,
    pluginsDetails,
    isDisabled,
    handlePluginToggleHandler,
  } = props;

  const selectedTabData = tabsData[selectedTab];
  const tabPluginStatuseKeys = ["active", "disabled", "inactive"];

  const renderPluginCards = (statusKey, plugins) => {
    return plugins.map((plugin) => (
      <PluginCard
        key={plugin}
        pluginId={plugin}
        status={statusKey}
        pluginDetails={pluginsDetails[plugin]}
        handlePluginToggleHandler={handlePluginToggleHandler}
      />
    ));
  };

  return (
    <div className={isDisabled ? "content disabled" : "content"}>
      <h3 className="selected-tab-header">{selectedTabData.title} Plugins</h3>
      <div className="card-grid">
        {tabPluginStatuseKeys.map((statusKey) =>
          renderPluginCards(statusKey, selectedTabData[statusKey])
        )}
      </div>
    </div>
  );
};

export default Content;
