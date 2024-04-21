import { useState, useEffect, createContext } from "react";
import Header from "./components/Header";
import Selector from "./components/Selector";
import ClassDetails from "./components/ClassDetails";
import Table from "./components/Table";
import "./App.css";
import githubLogoForDarkMode from './assets/github-mark-white.svg';
import githubLogoForLightMode from './assets/github-mark.svg';
import decor from "./utils/decor";

export const RoutineContext = createContext<any>(null);

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const times = [
  '8:00-8:50',
  '8:50-9:40',
  '9:40-10:30',
  '10:30-11:00',
  '11:00-11:50',
  '11:50-12:40',
  '12:40-1:30',
  '1:30-2:20',
  '2:20-3:00',
  '3:00-3:50',
  '3:50-4:40'
];

function App() {
  const [selectedSection, setSelectedSection] = useState(localStorage.getItem('previousSection') ?? '5');
  const [isRoutineAvailable, setIsRoutineAvailable] = useState(false);
  const [isRoutineLoading, setIsRoutineLoading] = useState(true);
  const [isRoutineError, setIsRoutineError] = useState(false);
  const [routine, setRoutine] = useState([]);
  const [currentTime, setCurrentTime] = useState('⌛');
  const [prefersDarkMode, setPrefersDarkMode] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);

  useEffect(() => {
    decor();

    setInterval(() => {
      const date = new Date();
      setCurrentTime(`${days[date.getDay()]} ${date.toLocaleTimeString()}`);
    }, 1000);

    if (!window.matchMedia) return;
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const prefersDarkMode = query.matches;
    setPrefersDarkMode(prefersDarkMode);
    query.addEventListener('change', (event) => setPrefersDarkMode(event.matches));
  }, []);

  useEffect(() => {
    setSelectedSection(selectedSection);
    localStorage.setItem('previousSection', selectedSection);
    (async function getRoutine() {
      const response = await fetch(`/api/section/${selectedSection}`);
      if (response.status === 200) {
        const data = await response.json();
        setIsRoutineAvailable(true);
        setIsRoutineLoading(false);
        setIsRoutineError(false);
        setRoutine(data.results);
      } else if (response.status === 404) {
        setIsRoutineAvailable(false);
        setIsRoutineLoading(false);
        setIsRoutineError(false);
      } else {
        setIsRoutineAvailable(false);
        setIsRoutineLoading(false);
        setIsRoutineError(true);
      }
    })();
  }, [selectedSection]);

  return (
    <>
      <Header />
      <div id="display-time">
        <span id="time-icon"></span>
        <span>{currentTime}</span>
      </div>
      <main>
        <RoutineContext.Provider value={{ selectedSection, setSelectedSection, isRoutineAvailable, isRoutineLoading, isRoutineError, routine, days, times }}>
          <Selector />
          <ClassDetails />
          <Table />
        </RoutineContext.Provider>
      </main>
      <footer>
        <p>
          Developed & Maintained by KD&nbsp;&#40;
          <a href="https://itskdhere.eu.org" target="_blank" rel="noopener noreferrer">
            @itskdhere
          </a>
          &#41;
        </p>
        <a id="github-repo-link" href="https://github.com/itskdhere/the-routine" target="_blank">
          <img src={prefersDarkMode ? githubLogoForDarkMode : githubLogoForLightMode} alt="github-logo" />
          <p>itskdhere/the-routine</p>
        </a>
      </footer>
    </>
  );
}

export default App;
