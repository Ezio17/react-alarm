import React from 'react';
import SetAlarmsTable from './SetAlarmsTable';

const SetTime = props => {
  return (
    <div>
      <label className="what-time-alarm">
        Година будильника:
        <input
          type="time"
          value={props.value}
          onChange={props.change}
          className="time-alarm"
          onKeyPress={props.handleEnterPress}
        />
      </label>
      {props.setAlarms.length > 0 && (
        <div>
          <h3>Встановлені будильники:</h3>
          <SetAlarmsTable setAlarms={props.setAlarms} deleteAlarm={props.deleteAlarm} />
        </div>
      )}
      <div className="buttons">
        <button onClick={props.setTime} className="buttons__left button">
          Встановити
        </button>
        {props.visibleButtonPauseAudio && (
          <button onClick={props.stopAlarm} className="buttons__right button">
            Виключити
          </button>
        )}
      </div>
    </div>
  );
};

export default SetTime;
