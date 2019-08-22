import React from 'react';

const SetAlarmsTable = props => {
  return (
    <table className="alarms-table">
      <thead>
        <tr>
          <th>Година</th>
          <th>Видалити</th>
        </tr>
      </thead>
      <tbody>
        {props.setAlarms.map(alarms => (
          <tr key={alarms}>
            <td>{alarms.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
            <td onClick={() => props.deleteAlarm(alarms)} className="table__delete-alarms">
              x
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SetAlarmsTable;
