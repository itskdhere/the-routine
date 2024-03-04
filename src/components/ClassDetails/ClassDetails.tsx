import { useRef, useContext } from 'react';
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

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const ClassDetails = () => {
  const { selectedSection, isRoutineAvailable, isRoutineLoading, isRoutineError, routine } = useContext(RoutineContext);
  const classDays = useRef<string[]>([]);

  const date = new Date();
  const currentDay = days[date.getDay()];
  const currentTime = `${date.getHours()}:${date.getMinutes()}`;

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
          if (!classDays.current.includes(result.day_name)) {
            classDays.current.push(result.day_name);
          }
          const nextClass = routine[routine.indexOf(result) + 1];
          if (result.day_name === currentDay && result.start_time <= currentTime && result.end_time >= currentTime) {
            return (
              <>
                <div>
                  <h4>Current Class</h4>
                  <p>{result.subject_name}</p>
                  <p>By {result.teacher_name}</p>
                  <p>At {result.room_number}</p>
                  <p>From {result.start_time}</p>
                  <p>To {result.end_time}</p>
                </div>
                <div>
                  <h4>Next Class</h4>
                  <p>{nextClass.subject_name}</p>
                  <p>By {nextClass.teacher_name}</p>
                  <p>At {nextClass.room_number}</p>
                  <p>From {nextClass.start_time}</p>
                  <p>To {nextClass.end_time}</p>
                </div>
              </>
            )
          }
        })
      }
      {
        days.map((day) => {
          if (!classDays.current.includes(day) && day === currentDay)
            return (
              <div key={day}>
                <h4>No Classes Today</h4>
              </div>
            )
        })
      }
    </section>
  );
}

export default ClassDetails;