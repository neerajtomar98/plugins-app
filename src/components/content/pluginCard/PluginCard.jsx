import React from "react";

import ToggleButton from "../../../utils/icons/ToggleButton";

import "./PluginCard.css";

const PluginCard = (props) => {
  const { pluginId, status, pluginDetails, handlePluginToggleHandler } = props;

  return (
    <div className={status === "disabled" ? "card disabled" : "card"}>
      <div className="card-header">
        <div>
          <h3>{pluginDetails.title}</h3>
        </div>
        <div
          className="toggle-icon"
          onClick={(event) => handlePluginToggleHandler(pluginId)}
        >
          <ToggleButton inactive={status === "inactive"} />
          <span className="plugin-status">
            {status === "inactive" ? "Blocked" : "Allowed"}
          </span>
        </div>
      </div>
      <div className="card-body">
        <p>{pluginDetails.description}</p>
      </div>
    </div>
  );
};

export default PluginCard;
