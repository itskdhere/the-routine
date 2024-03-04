import { useEffect, useState, createContext } from "react";
import Header from "./components/Header";
import Selector from "./components/Selector";
import ClassDetails from "./components/ClassDetails";
import Table from "./components/Table";
import "./App.css";

export const RoutineContext = createContext<any>(null);

function App() {
  const [selectedSection, setSelectedSection] = useState(localStorage.getItem('previousSection') ?? '5');
  const [isRoutineAvailable, setIsRoutineAvailable] = useState(false);
  const [isRoutineLoading, setIsRoutineLoading] = useState(true);
  const [isRoutineError, setIsRoutineError] = useState(false);
  const [routine, setRoutine] = useState([]);

  useEffect(() => {
    console.log(`%c
  ________            ____              __  _          \r\n \/_  __\/ \/_  ___     \/ __ \\____  __  __\/ \/_(_)___  ___ \r\n  \/ \/ \/ __ \\\/ _ \\   \/ \/_\/ \/ __ \\\/ \/ \/ \/ __\/ \/ __ \\\/ _ \\\r\n \/ \/ \/ \/ \/ \/  __\/  \/ _, _\/ \/_\/ \/ \/_\/ \/ \/_\/ \/ \/ \/ \/  __\/\r\n\/_\/ \/_\/ \/_\/\\___\/  \/_\/ |_|\\____\/\\__,_\/\\__\/_\/_\/ \/_\/\\___\/ 
  
  
%c🔥 Developed by KD - @itskdhere 🔥
  `, `color: #b6f880`, `color: #fff565`);
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
      <main>
        <RoutineContext.Provider value={{ selectedSection, setSelectedSection, isRoutineAvailable, isRoutineLoading, isRoutineError, routine }}>
          <Selector />
          <ClassDetails />
          <Table />
        </RoutineContext.Provider>
      </main>
      <footer>
        <p>
          Developed by KD -&nbsp;
          <a href="https://itskdhere.eu.org" target="_blank" rel="noopener noreferrer">
            @itskdhere
          </a>
        </p>
      </footer>
    </>
  );
}

export default App;
