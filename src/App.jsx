import React, { useState, useEffect } from "react";

import NavigationPanel from "./components/navigationPanel/NavigationPanel";
import Content from "./components/content/Content";
import { withRouter } from "react-router";
import "./App.css";

const App = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [tabsData, setTabsData] = useState({});
  const [selectedTab, setSelectedTab] = useState("tab1");
  const [isPowerSwitchActive, setIsPowerSwitchActive] = useState(true);
  const [pluginsDetails, setPluginsDetails] = useState({});

  useEffect(() => {
    setIsLoading(true);
    fetchTabsData();
    fetchPlugins();
  }, []);

  const fetchTabsData = () => {
    const dataUrl = "http://localhost:3001/tabdata";
    fetch(dataUrl)
      .then((res) => res.json())
      .then((tabsData) => {
        setTabsData(tabsData);
      });
  };

  const fetchPlugins = () => {
    const dataUrl = "http://localhost:3001/plugins";
    fetch(dataUrl)
      .then((res) => res.json())
      .then((plugins) => {
        setPluginsDetails(plugins);
      })
      .finally(() => setIsLoading(false));
  };

  const updateSelectedTab = (tabId) => {
    const dataUrl = "http://localhost:3001/selectedTab";
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tabId: tabId }),
    };

    fetch(dataUrl, params)
      .then((res) => res.json())
      .then((result) => {
        setSelectedTab(tabId);
        props.history.push(decodeURI("/" + tabId));
      });
  };

  const updatePowerSwitch = () => {
    const dataUrl = "http://localhost:3001/powerSwitch";
    const payload = { isActive: isPowerSwitchActive ? true : false };
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    fetch(dataUrl, params)
      .then(() => {
        setIsPowerSwitchActive((isPowerSwitchActive) => !isPowerSwitchActive);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const preparePayload = (pluginId) => {
    let data = Object.assign({}, tabsData[selectedTab]);

    if (tabsData[selectedTab]["active"].includes(pluginId)) {
      data["active"] = tabsData[selectedTab]["active"].filter(
        (plugin) => plugin !== pluginId
      );
      data["inactive"].push(pluginId);
    } else {
      data["inactive"] = tabsData[selectedTab]["active"].filter(
        (plugin) => plugin !== pluginId
      );
      data["active"].push(pluginId);
    }
    const payload = tabsData;
    payload[selectedTab] = data;
    return payload;
  };
  const updateSelectedPluginStatus = (plugInId) => {
    const dataUrl = "http://localhost:3001/tabdata";
    const payload = preparePayload(plugInId);
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    fetch(dataUrl, params)
      .then((res) => res.json())
      .then((result) => {
        fetchTabsData();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const tabClickHandler = (tabKey) => {
    updateSelectedTab(tabKey);
  };

  const powerSwitchClickHandler = (event) => {
    updatePowerSwitch();
  };

  const handlePluginToggleHandler = (plugInId) => {
    updateSelectedPluginStatus(plugInId);
  };

  return (
    <div className="plugins-app-container">
      {isLoading ? (
        <div>...Loading</div>
      ) : (
        <>
          <NavigationPanel
            {...{
              tabsData,
              selectedTab,
              tabClickHandler,
              isPowerSwitchActive,
              powerSwitchClickHandler,
            }}
          />
          <Content
            {...{
              tabsData,
              selectedTab,
              pluginsDetails,
              handlePluginToggleHandler,
            }}
            isDisabled={!isPowerSwitchActive}
          />
        </>
      )}
    </div>
  );
};

export default withRouter(App);
