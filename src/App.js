import React from 'react';
import './App.css';
import Clock from './components/Clock';
import SetTime from './components/SetTime';
import Title from './components/Title';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: new Date().toLocaleTimeString(),
      controllTime: '',
      setAlarms: [],
      visibleButtonPauseAudio: false,
    };

    this.url = 'http://streaming.tdiradio.com:8000/house.mp3';
    this.audio = new Audio(this.url);

    this.timer = this.timer.bind(this);
    this.onChange = this.onChange.bind(this);
    this.alarmСlock = this.alarmСlock.bind(this);
    this.compareAlarm = this.compareAlarm.bind(this);
    this.stopAlarm = this.stopAlarm.bind(this);
    this.deleteAlarm = this.deleteAlarm.bind(this);
    this.handleEnterPress = this.handleEnterPress.bind(this);
  }

  componentDidMount() {
    setInterval(this.timer, 1000);
    document.body.style.backgroundImage = `url(https://source.unsplash.com/random/1600x900/?city)`;
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentWillUpdate() {
    if (this.state.time === null) {
      return;
    }

    if (this.state.time.split(':')[2] === '00') {
      this.compareAlarm();
    }
  }

  timer() {
    let time = new Date().toLocaleTimeString();

    this.setState({
      time: time.toString(),
    });
  }

  onChange(event) {
    this.setState({
      controllTime: event.target.value,
    });
  }

  alarmСlock() {
    if (this.state.controllTime === '') {
      return;
    }

    let time = this.state.controllTime.split(':');

    let setTime = new Date();
    setTime.setHours(time[0]);
    setTime.setMinutes(time[1]);

    this.setState(prevState => {
      return {
        controllTime: '',
        setAlarms: [...prevState.setAlarms, setTime],
      };
    });
  }

  compareAlarm() {
    const { time, setAlarms } = this.state;

    if (time === null || setAlarms.length < 1) {
      return;
    }

    let splitTime = time.split(':');

    for (let alarms of setAlarms) {
      if (+splitTime[0] === alarms.getHours() && +splitTime[1] === alarms.getMinutes()) {
        this.audio.play();

        this.setState({
          visibleButtonPauseAudio: true,
        });

        setTimeout(() => {
          let deleteAlarm = this.state.setAlarms.filter(alarm => alarms !== alarm);

          this.setState({
            setAlarms: deleteAlarm,
            visibleButtonPauseAudio: false,
          });
        }, 60000);
      } else {
        this.audio.pause();

        this.setState({
          visibleButtonPauseAudio: false,
        });
      }
    }
  }

  stopAlarm() {
    this.audio.pause();

    this.setState({
      visibleButtonPauseAudio: false,
    });
  }

  deleteAlarm(alarm) {
    let deleteAlarm = this.state.setAlarms.filter(alarms => alarms !== alarm);

    this.setState({
      setAlarms: deleteAlarm,
    });
  }

  handleEnterPress = event => {
    if (event.key === 'Enter') {
      this.alarmСlock();
    }
  };

  render() {
    const { controllTime, time, setAlarms, visibleButtonPauseAudio } = this.state;

    return (
      <div className="page">
        <Title>Будильник</Title>
        <Clock time={time} />
        <SetTime
          value={controllTime}
          change={this.onChange}
          setTime={this.alarmСlock}
          stopAlarm={this.stopAlarm}
          setAlarms={setAlarms}
          deleteAlarm={this.deleteAlarm}
          visibleButtonPauseAudio={visibleButtonPauseAudio}
          handleEnterPress={this.handleEnterPress}
        />
      </div>
    );
  }
}

export default App;
