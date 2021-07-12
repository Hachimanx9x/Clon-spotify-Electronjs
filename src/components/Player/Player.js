import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";

import { Grid, Progress, Icon, Input, Image } from "semantic-ui-react";
import "./Player.scss";
export default function Player({ soungData }) {
  //console.log(soungData);
  const [playerSeconds, setPlayerSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const onStart = () => {
    setPlaying(true);
  };
  const onPause = () => {
    setPlaying(false);
  };
  const onPrpogress = (data) => {
    // console.log(data);
    setPlayerSeconds(data.playedSeconds);
    setTotalSeconds(data.loadedSeconds);
  };

  useEffect(() => {
    if (soungData?.url) {
      onStart();
    }
  }, [soungData]);
  return (
    <div className="o-player">
      <Grid>
        <Grid.Column width={4} className="o-left">
          <Image src={soungData?.image} />
          {soungData?.name}
        </Grid.Column>

        <Grid.Column width={8} className="o-center">
          <div className="o-controls">
            {playing ? (
              <Icon onClick={onPause} name="pause circle outline" />
            ) : (
              <Icon onClick={onStart} name="play circle outline" />
            )}
          </div>
          <Progress
            progress="value"
            value={playerSeconds}
            total={totalSeconds}
            size="small"
          />
        </Grid.Column>

        <Grid.Column width={4} className="o-rigth">
          <Input
            label={<Icon name="volume up" />}
            step={0.01}
            min={0}
            max={1}
            type="range"
            name="volume"
            onChange={(e, data) => {
              setVolume(Number(data.value));
            }}
            value={volume}
          />
        </Grid.Column>
      </Grid>

      <ReactPlayer
        className="o-react-player"
        url={soungData?.url}
        playing={playing}
        height="0"
        width="0"
        volume={volume}
        onProgress={(e) => onPrpogress(e)}
      />
    </div>
  );
}
