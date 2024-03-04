import { useRef, useContext } from 'react';
import { RoutineContext } from '../../App';
import './Table.modules.css';

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

const Table = () => {
  const { selectedSection, isRoutineAvailable, isRoutineLoading, isRoutineError, routine } = useContext(RoutineContext);
  const dayRef = useRef('');
  const noRoutineStyles = {
    margin: '10px 0px 350px 0px'
  }

  if (isRoutineLoading) return (
    <section className='table-container' style={noRoutineStyles}>
      <p>Loading...</p>
    </section>
  )

  if (isRoutineError) return (
    <section className='table-container' style={noRoutineStyles}>
      <p>Error Fetching Routine</p>
    </section>
  )

  if (!isRoutineAvailable) return (
    <section className='table-container' style={noRoutineStyles}>
      <p>No Time Table Available For Section {selectedSection}</p>
    </section>
  )

  return (
    <section className='table-container' style={{margin: '10px 0px 10px 0px'}}>
      <table className='routine-table'>
        <thead>
          <tr>
            <th>Y-1-Sec-{selectedSection}</th>
            {
              times.map((time) => {
                return (
                  <th key={time}>{time}</th>
                )
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            routine.map((result1: any) => {
              if (dayRef.current !== result1.day_name) {
                dayRef.current = result1.day_name;
                return (
                  <tr key={result1.id}>
                    <td>{result1.day_name}</td>
                    {
                      routine.map((result2: any) => {
                        if (result1.day_name === result2.day_name) {
                          return (
                            <td key={result2.id}>
                              <p>{result2.subject_name}</p>
                              <p>{result2.teacher_name}</p>
                              <p>{result2.room_number}</p>
                            </td>
                          );
                        }
                      })
                    }
                  </tr>
                )
              }
            })
          }
        </tbody>
      </table>
    </section>
  );
}

export default Table;