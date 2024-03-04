import { useEffect, useState, createContext } from "react";
import Header from "./components/Header";
import Selector from "./components/Selector";
import ClassDetails from "./components/ClassDetails";
import Table from "./components/Table";
import "./App.css";

export const RoutineContext = createContext<any>(null);

function App() {
  const [selectedSection, setSelectedSection] = useState('5');
  const [isRoutineAvailable, setIsRoutineAvailable] = useState(false);
  const [isRoutineLoading, setIsRoutineLoading] = useState(true);
  const [isRoutineError, setIsRoutineError] = useState(false);
  const [routine, setRoutine] = useState([]);

  useEffect(() => {
    (async function getRoutine() {
      const response = await fetch(`/api/section/${selectedSection}`);
      if (response.status === 200) {
        const data = await response.json();
        setIsRoutineAvailable(true);
        setIsRoutineLoading(false);
        setRoutine(data.results);
      } else if (response.status === 404) {
        setIsRoutineAvailable(false);
        setIsRoutineLoading(false);
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
          Developed by KD (
          <a href="https://itskdhere.eu.org" target="_blank" rel="noopener noreferrer">
            @itskdhere
          </a>
          )
        </p>
      </footer>
    </>
  );
}

export default App;
