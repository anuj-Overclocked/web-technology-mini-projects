import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(new Date());
  const [selectedZone, setSelectedZone] = useState("Asia/Kolkata");
  const [darkMode, setDarkMode] = useState(true);
  const [is24Hour, setIs24Hour] = useState(false);

  const [alarmTime, setAlarmTime] = useState("");
  const [alarmEnabled, setAlarmEnabled] = useState(false);
  const [alarmMessage, setAlarmMessage] = useState("");

  const timeZones = [
    {
      name: "India",
      city: "Mumbai",
      zone: "Asia/Kolkata",
      flag: "🇮🇳",
    },
    {
      name: "USA",
      city: "New York",
      zone: "America/New_York",
      flag: "🇺🇸",
    },
    {
      name: "UK",
      city: "London",
      zone: "Europe/London",
      flag: "🇬🇧",
    },
    {
      name: "Japan",
      city: "Tokyo",
      zone: "Asia/Tokyo",
      flag: "🇯🇵",
    },
    {
      name: "UAE",
      city: "Dubai",
      zone: "Asia/Dubai",
      flag: "🇦🇪",
    },
    {
      name: "Australia",
      city: "Sydney",
      zone: "Australia/Sydney",
      flag: "🇦🇺",
    },
  ];

  /* LIVE CLOCK */

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /* ALARM CHECK */

  useEffect(() => {
    if (!alarmEnabled || !alarmTime) return;

    const currentTime = time.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (currentTime === alarmTime) {
      setAlarmMessage("🔔 Alarm is ringing!");
      setAlarmEnabled(false);
    }
  }, [time, alarmEnabled, alarmTime]);

  /* FORMAT TIME */

  const formatTime = (date, zone) => {
    return date.toLocaleTimeString("en-US", {
      timeZone: zone,
      hour12: !is24Hour,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  /* FORMAT DATE */

  const getDate = (zone) => {
    return time.toLocaleDateString("en-US", {
      timeZone: zone,
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  /* ANALOG CLOCK */

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondAngle = seconds * 6;
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const hourAngle = (hours % 12) * 30 + minutes * 0.5;

  return (
    <div className={darkMode ? "app dark" : "app"}>

      {/* TOP NAVIGATION */}

      <header className="topbar">

        <div className="page-title">
          <h2>World Clock</h2>
          <span>Live Global Time Dashboard</span>
        </div>

        <div className="top-controls">

          <button
            className="control-btn"
            onClick={() => setIs24Hour(!is24Hour)}
          >
            {is24Hour ? "12 H" : "24 H"}
          </button>

          <button
            className="control-btn"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀" : "☾"}
          </button>

        </div>

      </header>

      {/* MAIN HERO */}

      <section className="hero">

        <div className="hero-content">

          <div className="live-badge">
            <span></span>
            LIVE SYSTEM
          </div>

          <h1>
            Global Time
            <br />
            <strong>At a Glance.</strong>
          </h1>

          <p className="hero-description">
            Monitor time across the world with real-time
            updates, interactive time zones and smart controls.
          </p>

          <div className="hero-time">
            {formatTime(time, selectedZone)}
          </div>

          <div className="hero-date">
            {getDate(selectedZone)}
          </div>

        </div>

        {/* ANALOG CLOCK */}

        <div className="analog-wrapper">

          <div className="analog-clock">

            <div className="clock-glow"></div>

            <div className="clock-ring ring-one"></div>
            <div className="clock-ring ring-two"></div>

            <div
              className="hand hour-hand"
              style={{
                transform: `rotate(${hourAngle}deg)`,
              }}
            ></div>

            <div
              className="hand minute-hand"
              style={{
                transform: `rotate(${minuteAngle}deg)`,
              }}
            ></div>

            <div
              className="hand second-hand"
              style={{
                transform: `rotate(${secondAngle}deg)`,
              }}
            ></div>

            <div className="clock-center"></div>

            <span className="number n12">12</span>
            <span className="number n3">3</span>
            <span className="number n6">6</span>
            <span className="number n9">9</span>

          </div>

        </div>

      </section>

      {/* TIMEZONE SELECTOR */}

      <section className="selector-section">

        <div className="section-title">

          <span>TIME ZONE</span>

          <h2>Select Location</h2>

        </div>

        <select
          value={selectedZone}
          onChange={(e) => setSelectedZone(e.target.value)}
        >

          {timeZones.map((zone) => (
            <option
              key={zone.zone}
              value={zone.zone}
            >
              {zone.flag} {zone.city}
            </option>
          ))}

        </select>

      </section>

      {/* WORLD CLOCKS */}

      <section className="world-section">

        <div className="section-heading">

          <div>
            <span>GLOBAL MONITOR</span>
            <h2>World Clocks</h2>
          </div>

          <div className="system-status">
            <i></i>
            SYSTEM ONLINE
          </div>

        </div>

        <div className="clock-grid">

          {timeZones.map((zone) => (

            <div
              className={
                selectedZone === zone.zone
                  ? "world-card active-card"
                  : "world-card"
              }
              key={zone.zone}
              onClick={() => setSelectedZone(zone.zone)}
            >

              <div className="card-top">

                <span className="flag">
                  {zone.flag}
                </span>

                {selectedZone === zone.zone && (
                  <span className="selected-tag">
                    ACTIVE
                  </span>
                )}

              </div>

              <h3>{zone.city}</h3>

              <div className="card-time">
                {formatTime(time, zone.zone)}
              </div>

              <p>
                {getDate(zone.zone)}
              </p>

              <div className="timezone-name">
                {zone.zone}
              </div>

            </div>

          ))}

        </div>

      </section>

      {/* ALARM */}

      <section className="alarm-panel">

        <div className="alarm-header">

          <div className="alarm-icon">
            ⏰
          </div>

          <div>

            <span>SMART SCHEDULER</span>

            <h2>Alarm System</h2>

          </div>

        </div>

        <div className="alarm-controls">

          <div className="time-input-wrapper">

            <label htmlFor="alarm">
              Alarm Time
            </label>

            <input
              id="alarm"
              type="time"
              value={alarmTime}
              onChange={(e) => setAlarmTime(e.target.value)}
            />

          </div>

          <button
            className="primary-btn"
            onClick={() => {

              if (alarmTime) {

                setAlarmEnabled(true);

                setAlarmMessage(
                  "Alarm scheduled successfully."
                );

              }

            }}
          >
            SET ALARM
          </button>

          <button
            className="secondary-btn"
            onClick={() => {

              setAlarmEnabled(false);

              setAlarmMessage(
                "Alarm cancelled."
              );

            }}
          >
            CANCEL
          </button>

        </div>

        <div className="alarm-status">

          <span
            className={
              alarmEnabled
                ? "status-dot active"
                : "status-dot"
            }
          ></span>

          {alarmEnabled
            ? `Alarm scheduled for ${alarmTime}`
            : "No active alarm"}

        </div>

        {alarmMessage && (
          <div className="alarm-message">
            {alarmMessage}
          </div>
        )}

      </section>

      {/* FOOTER */}

      <footer>

        <span>
          World Clock Dashboard
        </span>

        <span>
          SYSTEM STATUS:
          <b> ONLINE</b>
        </span>

      </footer>

    </div>
  );
}

export default App;