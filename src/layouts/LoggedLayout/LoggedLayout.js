import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import { BrowserRouter } from "react-router-dom";
import Routes from "../../routes/Routes";

//components
import MenuLeft from "../../components/MenuLeft";
import ToBar from "../../components/ToBar/ToBar";
import Player from "../../components/Player";
//sass
import "./LoggedLayout.scss";
export default function LoggedLayout({ user, setReloadApp }) {
  const [soungData, setSoungData] = useState(null);
  const playerSoung = (albumImage, sougName, sougUrl) => {
    setSoungData({
      image: albumImage,
      name: sougName,
      url: sougUrl,
    });
  };
  return (
    <BrowserRouter>
      <Grid className="o-logged-layout">
        <Grid.Row>
          <Grid.Column width={3}>
            <MenuLeft user={user} />
          </Grid.Column>
          <Grid.Column className="o-content" width={13}>
            <ToBar user={user} />
            <Routes
              setReloadApp={setReloadApp}
              user={user}
              playerSoung={playerSoung}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Player soungData={soungData} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </BrowserRouter>
  );
}
