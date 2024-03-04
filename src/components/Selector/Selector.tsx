import { useContext } from 'react';
import { RoutineContext } from '../../App';
import './Selector.modules.css';

const Selector = () => {
    const { setSelectedSection } = useContext(RoutineContext);

    const handleSection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSection(e.target.value);
    }

    return (
        <section className='selector-container'>
            <div>
                <label htmlFor="year-selector" className="year-selector-label">Year: </label>
                <select name="year-selector" id="year-selector" className="year-selector">
                    <option value="1">1</option>
                </select>
            </div>
            <div>
                <label htmlFor="section-selector" className="section-selector-label">Section: </label>
                <select onChange={handleSection} defaultValue={localStorage.getItem('previousSection') ?? '5'} name="section-selector" id="section-selector" className="section-selector">
                    {
                        [...Array(9)].map((_, index) => {
                            return (
                                <option key={index} value={index + 1}>{index + 1}</option>
                            )
                        })
                    }
                </select>
            </div>
        </section>
    );
}

export default Selector;