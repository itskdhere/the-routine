import { useEffect, useRef, useContext } from 'react';
import { RoutineContext } from '../../App';
import './ClassDetails.modules.css';

interface IRoutine {
  id: number,
  day_name: string,
  start_time: string,
  end_time: string,
  subject_name: string,
  teacher_name: string,
  room_number: string
}

const ClassDetails = () => {
  const { selectedSection, isRoutineAvailable, isRoutineLoading, isRoutineError, routine, days } = useContext(RoutineContext);
  const classDays = useRef<string[]>([]);
  const startingClassRef = useRef<IRoutine[]>([]);
  const isEndingClassRef = useRef<boolean>(false);

  useEffect(() => {
    const startingClass: IRoutine[] = [];
    classDays.current = [];
    startingClassRef.current = [];
    routine.map((result: IRoutine) => {
      if (!classDays.current.includes(result.day_name) && result.subject_name !== '---') {
        classDays.current.push(result.day_name);
        startingClass.push(result);
      }
    });
    startingClassRef.current = startingClass;
  }, [routine]);

  const date = new Date();
  const currentDay = days[date.getDay()];
  const currentTime = date.toLocaleTimeString();

  if (isRoutineLoading) return (
    <section className='class-details-container'>
      <p>Loading...</p>
    </section>
  )

  if (isRoutineError) return (
    <section className='class-details-container'>
      <p>Error Fetching Routine</p>
    </section>
  )

  if (!isRoutineAvailable) return (
    <section className='class-details-container'>
      <p>No Class Details Available For Section {selectedSection}</p>
    </section>
  )

  return (
    <section className='class-details-container'>
      {
        routine.map((result: IRoutine) => {
          const nextClass = routine[routine.indexOf(result) + 1];
          if (result.day_name == currentDay && ((new Date('2024-01-01 ' + result.start_time)).getTime()) <= ((new Date('2024-01-01 ' + currentTime)).getTime()) && ((new Date('2024-01-01 ' + result.end_time)).getTime()) >= ((new Date('2024-01-01 ' + currentTime)).getTime())) {
            if (result.day_name === nextClass.day_name && nextClass.subject_name === '---') {
              isEndingClassRef.current = true;
            } else {
              isEndingClassRef.current = false;
            }
            return (
              <>
                {
                  (result.subject_name !== '---') &&
                  <div key={result.subject_name}>
                    <h4>Current Class</h4>
                    <p>{result.subject_name}</p>
                    <p>By {result.teacher_name}</p>
                    <p>At {result.room_number}</p>
                    <p>From {result.start_time}</p>
                    <p>To {result.end_time}</p>
                  </div>
                }
                {
                  (result.day_name === nextClass.day_name && nextClass.subject_name !== '---') &&
                  <div key={result.teacher_name}>
                    <h4>Next Class</h4>
                    <p>{nextClass.subject_name}</p>
                    <p>By {nextClass.teacher_name}</p>
                    <p>At {nextClass.room_number}</p>
                    <p>From {nextClass.start_time}</p>
                    <p>To {nextClass.end_time}</p>
                  </div>
                }
              </>
            )
          }
        })
      }
      {
        (isEndingClassRef.current) &&
        <div key='fun'>
          <h4>No More Classes Today</h4>
        </div>
      }
      {
        days.map((day: string) => {
          if (!classDays.current.includes(day) && day === currentDay) {
            return (
              <div key={day}>
                <h4>No Classes Today</h4>
              </div>
            )
          }
        })
      }
      {
        days.map((day: string) => {
          if (day === currentDay && (new Date('2024-01-01 8:00:00')).getTime() >= (new Date('2024-01-01 ' + currentTime)).getTime()) {
            return startingClassRef.current.map((result) => {
              if (result.day_name == currentDay)
                return (
                  <div key={result.room_number}>
                    <h4>Upcoming Class</h4>
                    <p>{result.subject_name}</p>
                    <p>By {result.teacher_name}</p>
                    <p>At {result.room_number}</p>
                    <p>From {result.start_time}</p>
                    <p>To {result.end_time}</p>
                  </div>
                )
            })
          }
          if (day === currentDay && (new Date('2024-01-01 16:40:00')).getTime() <= (new Date('2024-01-01 ' + currentTime)).getTime()) {
            return startingClassRef.current.map((result) => {
              if (result.day_name == days[days.indexOf(currentDay) + 1])
                return (
                  <div key={result.room_number}>
                    <h4>Upcoming Class</h4>
                    <p>{result.subject_name}</p>
                    <p>By {result.teacher_name}</p>
                    <p>At {result.room_number}</p>
                    <p>From {result.start_time}</p>
                    <p>To {result.end_time}</p>
                    <p>On {result.day_name}</p>
                  </div>
                )
            })
          }
        })
      }
    </section >
  );
}

export default ClassDetails;